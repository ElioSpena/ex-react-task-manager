import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

export default function EditTaskModal({ show, onClose, task, onSave }) {
  const editFormRef = useRef();
  const [formField, setFormField] = useState({
    title: "",
    description: "",
    status: "To do",
  });

  useEffect(() => {
    if (task) {
      setFormField({
        title: task.title,
        description: task.description,
        status: task.status,
      });
    }
  }, [task]);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormField((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedTask = {
      ...task,
      ...formField,
    };

    onSave(updatedTask);
  }

  return (
    <Modal
      onClose={onClose}
      show={show}
      title="Modifica Task"
      content={
        <form
          ref={editFormRef}
          onSubmit={handleSubmit}
          className="w-100"
          style={{ maxWidth: "400px" }}
        >
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              name="title"
              value={formField.title}
              onChange={handleChange}
              className="form-control"
              type="text"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descrizione</label>
            <textarea
              name="description"
              value={formField.description}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select
              name="status"
              value={formField.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="To do">To do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </form>
      }
      confirmText="Salva"
      onConfirm={() => editFormRef.current.requestSubmit()}
    />
  );
}
