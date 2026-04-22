import { useState, useRef } from "react";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const description = useRef(null);
  const status = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const newTask = {
      title,
      description: description.current.value,
      status: status.current.value,
    };

    if (!title.trim()) {
      setErrorMessage("Campo obbligatorio!");
      return;
    }
    console.log(newTask);

    setTitle("");
    description.current.value = "";
    status.current.value = "to-do";
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
            <option value="to-do">To do</option>
            <option value="doing">Doing</option>
            <option value="done">Done</option>
          </select>
        </div>
        <button type="submit">Invia</button>
      </form>
    </section>
  );
}
