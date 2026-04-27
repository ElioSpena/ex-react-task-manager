import { useState, useRef } from "react";
import { useGlobal } from "../context/GlobalContext";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const description = useRef(null);
  const status = useRef(null);
  const { tasks, addTask } = useGlobal();

  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setErrorMessage("Campo obbligatorio!");
      return;
    }

    const newTask = {
      title,
      description: description.current.value,
      status: status.current.value,
    };

    try {
      await addTask(newTask);
      setTitle("");
      description.current.value = "";
      status.current.value = "To do";
      alert("Task creata con successo!");
    } catch (err) {
      alert(err.message);
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

    if ([...value].some((c) => symbols.includes(c))) {
      setErrorMessage("Il titolo non può contenere caratteri speciali!");
      return;
    }
    setErrorMessage("");
    setTitle(value);
  }

  return (
    <section className="container py-4 d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        className="w-100 "
        style={{ maxWidth: "400px" }}
      >
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Nome
          </label>
          <input
            value={title}
            onChange={handleChange}
            type="text"
            id="title"
            className="form-control"
          />
          {errorMessage && (
            <div className="form-text text-danger">{errorMessage}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descrizione
          </label>
          <textarea
            ref={description}
            id="description"
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            ref={status}
            id="status"
            defaultValue="To do"
            className="form-select"
          >
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Invia
        </button>
      </form>
    </section>
  );
}
