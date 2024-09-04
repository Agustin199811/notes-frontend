import React from "react";
import "../../resources/css/card.css";
import { FaPen } from "react-icons/fa";

function CardComponent({ note, onUpdate, onDelete }) {
  return (
    <div className="postit-card">
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        X
      </button>
      <h4 className="postit-title">{note.title}</h4>
      <p className="postit-content">{note.content}</p>
      <button className="update-button" onClick={() => onUpdate(note.id)}>
        <FaPen></FaPen>
      </button>
      <p className="postit-date">{note.time}</p> {/* View date*/}
    </div>
  );
}

export default CardComponent;
