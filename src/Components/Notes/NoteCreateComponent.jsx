import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { createNote } from "../../Service/Notes/NotesService";
import "../../resources/css/reactquill.css";
import TurndownService from "turndown";

const NoteCreateComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const quillRef = useRef();
  const turndownService = new TurndownService();

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
        await createNote({ title, content: markdownContent });
        navigate("/notes", {
          state: { message: "Note successfully created!" },
        });
        sessionStorage.removeItem("notificationShown");
      } catch (error) {
        console.error("Error creating note:", error);
        setError("Failed to create note. Please try again.");
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
              <h5 className="card-title">Create Note</h5>
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
                          ["link", "image"],
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
                    className=" btn btn-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save Note"}
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

export default NoteCreateComponent;
