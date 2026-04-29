import { useState, useRef, useMemo } from "react";
import { useGlobal } from "../context/GlobalContext";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const description = useRef(null);
  const status = useRef(null);
  const { addTask } = useGlobal();

  const symbols = "!@#$%^&*()-_=+[]{}|;:'\",.<>?/`~";

  //CONTROLLO INPUT

  const taskTitleError = useMemo(() => {
    if (!title.trim()) return "Campo obbligatorio!";
    if ([...title].some((char) => symbols.includes(char)))
      return "Il titolo non può contenere caratteri speciali!";

    return "";
  }, [title]);

  //SUBMIT

  async function handleSubmit(e) {
    e.preventDefault();

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
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            id="title"
            className="form-control"
          />
          {taskTitleError && (
            <div className="form-text text-danger">{taskTitleError}</div>
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
            {["To do", "Doing", "Done"].map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}

            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <button
          disabled={taskTitleError}
          type="submit"
          className="btn btn-primary w-100"
        >
          Invia
        </button>
      </form>
    </section>
  );
}
