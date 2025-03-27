import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api"; 
import { useOutletContext } from "react-router-dom"; 
import "./TrashContainer.scss";

const TrashContainer = () => {
  const [trashNotes, setTrashNotes] = useState([]);
  const { searchQuery } = useOutletContext(); 

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setTrashNotes(allNotes.filter((note) => note.isDeleted));
      })
      .catch(() => setTrashNotes([]));
  }, []);

  const handleTrashList = ({ action, data }) => {
    if (action === "restore") {
      setTrashNotes(trashNotes.filter((note) => note.id !== data.id)); 
    } else if (action === "delete") {
      setTrashNotes(trashNotes.filter((note) => note.id !== data.id)); 
    }
  };

  
  const filteredTrashNotes = trashNotes.filter(
    (note) =>
      (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  
return (
  <div className="trash-container">
    <div className="trash-notes-list">
      {filteredTrashNotes.length > 0 ? (
        filteredTrashNotes.map((note) => (
          <NoteCard 
            key={note.id} 
            noteDetails={note} 
            updateList={handleTrashList} 
            isTrash 
          />
        ))
      ) : (
        <p>No matching notes found in Trash.</p>
      )}
    </div>
  </div>
);
};

export default TrashContainer;
