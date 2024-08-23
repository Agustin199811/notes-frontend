import React, { useState } from "react";
import ReactQuill from "react-quill";

function NoteCreateComponent() {
  const [content, setContent] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  return (
    <div>
      <h2>
        Create New Note <i className="fa fa-edit"></i>
      </h2>
      <ReactQuill
        value={content}
        onChange={handleContentChange}
        modules={NoteCreateComponent.modules}
        formats={NoteCreateComponent.formats}
        placeholder="Write something amazing..."
      />
      <button className="btn btn-danger mt-3">Create Note</button>
    </div>
  );
}

NoteCreateComponent.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

NoteCreateComponent.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
export default NoteCreateComponent;
