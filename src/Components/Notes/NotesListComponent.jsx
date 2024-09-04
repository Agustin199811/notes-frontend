import React, { useEffect, useState } from "react";
import { deleteNote, fetchNotes } from "../../Service/Notes/NotesService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation, useNavigate } from "react-router-dom";
import CardComponent from "../Card/CardComponent";

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

  const handleUpdate = (id) => {
    navigate(`/update-note/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Failed to delete note.");
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {notes.map((note) => (
          <div className="col d-flex justify-content-center" key={note.id}>
            <CardComponent
              note={note}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesListComponent;
