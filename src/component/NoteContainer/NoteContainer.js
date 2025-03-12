import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api";
import AddNote from "../AddNote/AddNote";
import Reminder from "../Reminder/Reminder";
import "./NoteContainer.scss";
import { useOutletContext } from "react-router-dom";
import { Typography } from "@mui/material";

const NotesContainer = () => {
  const [notesList, setNotesList] = useState([]);
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    getNotes()
      .then((data) => {
        console.log("API Response:", data);
        const allNotes = data?.data?.data?.data || [];
        console.log("Filtered Notes:", allNotes.filter((note) => !note.isArchived && !note.isDeleted));
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

  // Filter notes with reminders
  // const reminderNotes = notesList.filter(
  //   (note) => note.reminder && !isNaN(new Date(note.reminder).getTime())
  // );
  // console.log("Reminder Notes:", reminderNotes); // Debug log

  // Filter notes for the main list (include all non-archived, non-deleted notes)
  const filteredNotes = notesList.filter(
    (note) =>
      (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="note-container">
      <AddNote updateList={handleNotesList} />
      
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
          ))
        ) : (
          <p>No matching notes found.</p>
        )}
      </div>
    </div>
  );
};

export default NotesContainer;
