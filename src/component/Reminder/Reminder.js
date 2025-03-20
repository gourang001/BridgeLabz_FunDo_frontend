import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api";
import "./Reminder.scss"; // <- Import the SCSS file

export default function Reminder() {
  const [reminderNotes, setReminderNotes] = useState([]);

  useEffect(() => {
    getNotes()
      .then((data) => {
        const allNotes = data?.data?.data?.data || [];
        const filteredReminderNotes = allNotes.filter(
          (note) =>
            note.reminder &&
            !isNaN(new Date(note.reminder).getTime()) &&
            !note.isArchived &&
            !note.isDeleted
        );
        setReminderNotes(filteredReminderNotes);
      })
      .catch((err) => {
        console.error("Error fetching reminder notes:", err);
        setReminderNotes([]);
      });
  }, []);

  const updateList = ({ action, data }) => {
    getNotes().then((data) => {
      const allNotes = data?.data?.data?.data || [];
      const filteredReminderNotes = allNotes.filter(
        (note) =>
          note.reminder &&
          !isNaN(new Date(note.reminder).getTime()) &&
          !note.isArchived &&
          !note.isDeleted
      );
      setReminderNotes(filteredReminderNotes);
    });
  };

  return (
    <div className="reminder-container">
      {reminderNotes.length > 0 ? (
        reminderNotes.map((note) => (
          <NoteCard key={note.id} noteDetails={note} updateList={updateList} />
        ))
      ) : (
        <p>No reminders set.</p>
      )}
    </div>
  );
}

// import React, { useState, useEffect } from "react";
// import NoteCard from "../NoteCard/NoteCard";
// import { getNotes } from "../../utils/Api";
// import { Repeat } from "lucide-react";

// export default function Reminder() {
//   const [reminderNotes, setReminderNotes] = useState([]);

//   useEffect(() => {
//     getNotes()
//       .then((data) => {
//         const allNotes = data?.data?.data?.data || [];
//         const filteredReminderNotes = allNotes.filter(
//           (note) =>
//             note.reminder &&
//             !isNaN(new Date(note.reminder).getTime()) &&
//             !note.isArchived &&
//             !note.isDeleted
//         );
//         setReminderNotes(filteredReminderNotes);
//       })
//       .catch((err) => {
//         console.error("Error fetching reminder notes:", err);
//         setReminderNotes([]);
//       });
//   }, []);

//   const updateList = ({ action, data }) => {
//     // For now, just re-fetch notes on update
//     getNotes().then((data) => {
//       const allNotes = data?.data?.data?.data || [];
//       const filteredReminderNotes = allNotes.filter(
//         (note) =>
//           note.reminder &&
//           !isNaN(new Date(note.reminder).getTime()) &&
//           !note.isArchived &&
//           !note.isDeleted
//       );
//       setReminderNotes(filteredReminderNotes);
//     });
//   };

//   return (
//     <div style={{
//       marginTop:"-20em",
//       display: "grid",
//       gap: "10px",
//       width: "10%", // Adjusted from 10% to 100% for better grid layout
//       alignItems: "center",
//       justifyContent: "flex-start",
//       gridTemplateColumns: "repeat(4, 1fr)", // Fixed camelCase property name
//     }}>
//       {reminderNotes.length > 0 ? (
//         reminderNotes.map((note) => (
//           <NoteCard key={note.id} noteDetails={note} updateList={updateList} />
//         ))
//       ) : (
//         <p>No reminders set.</p>
//       )}
//     </div>
//   );
// }