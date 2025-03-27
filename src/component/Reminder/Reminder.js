import React, { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotes } from "../../utils/Api";
import { useOutletContext } from "react-router-dom";
import "./Reminder.scss"; 

export default function Reminder() {
  const [reminderNotes, setReminderNotes] = useState([]);
  const { searchQuery } = useOutletContext();

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

  const filteredReminderNotes = reminderNotes.filter(
    (note) =>
      (note.title && note.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (note.description && note.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="note-container">
      <div className="notes-list">
        {filteredReminderNotes.length > 0 ? (
          filteredReminderNotes.map((note) => (
            <NoteCard key={note.id} noteDetails={note} updateList={updateList} />
          ))
        ) : (
          <p>No matching reminders found.</p>
        )}
      </div>
    </div>
  );
}