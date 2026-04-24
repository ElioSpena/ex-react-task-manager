import { useState, useRef } from "react";
import useTasks from "../hooks/useTasks";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const description = useRef(null);
  const status = useRef(null);
  const { tasks, addTask } = useTasks();

  const [errorMessage, setErrorMessage] = useState("");

  //SUBMIT FORM

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

  //HANDLE CHANGE

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
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Nome</label>
          <input value={title} onChange={handleChange} type="text" id="title" />
          {errorMessage && <span>{errorMessage}</span>}
        </div>
        <div>
          <label htmlFor="description">Descrizione</label>
          <textarea ref={description} id="description" />
        </div>
        <div>
          <label htmlFor="status">Status</label>
          <select ref={status} id="status" defaultValue="to-do">
            <option value="To do">To do</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <button type="submit">Invia</button>
      </form>
    </section>
  );
}
