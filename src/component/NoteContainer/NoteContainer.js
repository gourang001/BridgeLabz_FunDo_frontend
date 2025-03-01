import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api";
import AddNote from "../AddNote/AddNote";
import "./NoteContainer.scss";
import { useOutletContext } from "react-router-dom"; // Import Outlet Context

const NotesContainer = () => {
  const [notesList, setNotesList] = useState([]);
  const { searchQuery } = useOutletContext(); // Get search query from context

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        setNotesList(allNotes.filter((note) => !note.isArchived && !note.isDeleted));
      })
      .catch(() => setNotesList([]));
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

  // **Search Filtering**
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
          filteredNotes.map((note) => <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />)
        ) : (
          <p>No matching notes found.</p>
        )}
      </div>
    </div>
  );
};

export default NotesContainer;


// import React, { useState, useEffect } from "react";
// import NoteCard from "../NoteCard/NoteCard";
// import { getNotes } from "../../utils/Api"; 
// import AddNote from "../AddNote/AddNote"; 
// import "./NoteContainer.scss";

// const NotesContainer = () => {
//   const [notesList, setNotesList] = useState([]);

//   useEffect(() => {
//     getNotes()
//       .then((data) => {
//         const allNotes = data?.data?.data?.data || [];
//         console.log(data);
//         setNotesList(allNotes.filter((note) => !note.isArchived && !note.isDeleted)); // Filter out deleted/archive notes
//       })
//       .catch(() => setNotesList([]));
//   }, []);

//   const handleNotesList = ({ action, data }) => {
//     if (action === "add") {
//       setNotesList([data, ...notesList]);
//     } else if (action === "archive") {
//       setNotesList(notesList.filter((note) => note.id !== data.id)); // Remove archived note
//     } else if (action === "unarchive") {
//       setNotesList([data, ...notesList]); // Add unarchived note back to list
//     } else if (action === "delete") {
//       setNotesList(notesList.filter((note) => note.id !== data.id)); // Remove deleted note from list
//     } 
//     else if (action === "update") {
//       setNotesList((prevNotes) =>
//         prevNotes.map((note) =>
//           note.id === data.id ? { ...note, ...data } : note
//         )
//       )
//     }
//     else if (action === "color") { // Added color action
//       setNotesList((prevNotes) =>
//         prevNotes.map((note) =>
//           note.id === data.id ? { ...note, color: data.color } : note
//         )
//       );
//     }
//   };

//   return (
//     <div className="note-container">
//       <AddNote updateList={handleNotesList} />

//       <div className="notes-list">
//         {notesList.length > 0 ? (
//           notesList.map((note) => <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />)
//         ) : (
//           <p>No notes available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotesContainer;
