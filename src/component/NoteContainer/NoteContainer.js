import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api";
import AddNote from "../AddNote/AddNote";
import "./NoteContainer.scss";
import { useOutletContext } from "react-router-dom";
import { Typography } from "@mui/material";

const NotesContainer = () => {
  const [notesList, setNotesList] = useState([]);
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setNotesList(allNotes.filter((note) => !note.isArchived && !note.isDeleted));
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        setNotesList([]);
      });
  }, []);

  const handleNotesList = ({ action, data }) => {
    if (action === "add") {
      setNotesList([data, ...notesList]);
    } else if (action === "archive" || action === "delete") {
      setNotesList(notesList.filter((note) => note.id !== data.id));
    } else if (action === "unarchive") {
      setNotesList([data, ...notesList]);
    } else if (action === "update") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? { ...note, ...data } : note))
      );
    } else if (action === "color") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? { ...note, color: data.color } : note))
      );
    }

  };

  const filteredNotes = notesList.filter(
    (note) =>
      (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const breakpointCols = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="note-container">
      <AddNote updateList={handleNotesList} />
      {filteredNotes.length > 0 ? (
        <Masonry
          breakpointCols={breakpointCols}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {filteredNotes.map((note) => (
            <div key={note.id}>
              <NoteCard noteDetails={note} updateList={handleNotesList} />
            </div>
          ))}
        </Masonry>
      ) : (
        <Typography variant="body1" align="center">
          No matching notes found.
        </Typography>
      )}
    </div>
  );
};

export default NotesContainer;
