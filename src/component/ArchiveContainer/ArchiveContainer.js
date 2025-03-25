import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api";
import { useOutletContext } from "react-router-dom"; 
import "../NoteContainer/NoteContainer.scss";

const ArchiveContainer = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const { searchQuery } = useOutletContext(); // Get searchQuery from context

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setArchivedNotes(allNotes.filter((note) => note.isArchived)); // Only archived notes
      })
      .catch(() => setArchivedNotes([]));
  }, []);

  const handleNotesList = ({ action, data }) => {
    if (action === "unarchive" || action === "delete") {
      setArchivedNotes(archivedNotes.filter((note) => note.id !== data.id));
    } else if (action === "update" || action === "color") {
      setArchivedNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? { ...note, ...data } : note))
      );
    }
  };

  
  const filteredNotes = archivedNotes.filter(
    (note) =>
      (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="note-container">
      <div className="notes-list">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />)
        ) : (
          <p>No matching archived notes found.</p>
        )}
      </div>
    </div>
  );
};

export default ArchiveContainer;
