import React, { useEffect, useState } from "react";
import { fetchNotes } from "../../Service/Notes/NotesService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";

function NotesListComponent() {
  const [notes, setNotes] = useState([]);
  const location = useLocation();
  const [showNotification, setShowNotification] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notesData = await fetchNotes();
        setNotes(notesData);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const message = location.state?.message;

    if (message && showNotification) {
      toast.success(message, {
        position: "top-right",
        autoClose: 10000,
        onClose: () => setShowNotification(false),
      });

      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate, showNotification]);

  return (
    <div>
      <ToastContainer />
      <h1>Notes</h1>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>{note.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default NotesListComponent;
