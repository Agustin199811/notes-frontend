import React, { useState, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import "../../resources/css/reactquill.css";
import TurndownService from "turndown";
import { getNoteById, updateNote } from "../../Service/Notes/NotesService";

const NoteEditComponent = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef();
  const turndownService = new TurndownService();

  useEffect(() => {
    const loadNote = async () => {
      try {
        const note = await getNoteById(id);
        setTitle(note.title);
        setContent(note.content);
      } catch (error) {
        console.error("Error loading note:", error);
        setError("Failed to load note. Please try again.");
      }
    };

    loadNote();
  }, [id]);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const convertToMarkdown = (htmlContent) => {
    return turndownService.turndown(htmlContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      setIsLoading(true);
      setError("");
      try {
        const markdownContent = convertToMarkdown(content);
        await updateNote(id, { title, content: markdownContent });
        navigate("/notes", {
          state: { message: "Note successfully updated!" },
        });
      } catch (error) {
        console.error("Error updating note:", error);
        setError("Failed to update note. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Edit Note</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="content" className="form-label">
                    Content:
                  </label>
                  <div className="quill-wrapper">
                    <ReactQuill
                      ref={quillRef}
                      value={content}
                      onChange={handleContentChange}
                      modules={{
                        toolbar: [
                          [{ header: [1, 2, false] }],
                          [
                            "bold",
                            "italic",
                            "underline",
                            "strike",
                            "blockquote",
                          ],
                          [{ list: "ordered" }, { list: "bullet" }],
                          ["link"],
                          ["clean"],
                        ],
                      }}
                    />
                  </div>
                </div>
                {error && <p className="text-danger">{error}</p>}
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteEditComponent;
