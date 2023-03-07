import { useState } from "react";
import axios from "axios";

function Form({ setFilesDisplay }) {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");

  const handleForm = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("file", files[0]);
    formData.append("name", name);

    axios
      .post("http://localhost:8000/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => setFilesDisplay([]));
  };

  return (
    <form onSubmit={handleForm} className="w-40">
      <div style={{ textAlign: "center" }}>
        {files.length && (
          <img
            style={{ height: "12rem" }}
            src={URL.createObjectURL(files[0])}
          />
        )}
      </div>
      <div className="form-group mb-2">
        <label htmlFor="inputName">Nom</label>
        <input
          onChange={(e) => setName(e.target.value)}
          className="form-control"
          name="inputName"
          type="text"
        />
      </div>
      <div className="form-group mb-4">
        <label htmlFor="inputFile">Image</label>
        <br />
        <input
          onChange={(e) => setFiles(e.target.files)}
          className="form-control-file"
          name="inputFile"
          type="file"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Envoyer
      </button>
    </form>
  );
}

export default Form;
