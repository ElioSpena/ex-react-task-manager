import { useParams, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { useState } from "react";

import Modal from "../components/Modal";
import EditTaskModal from "../components/EditTaskModal";
import formatDate from "../utilities/formatDate.js";

export default function TaskDetail() {
  const { tasks, removeTask, updateTask } = useGlobal();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const task = tasks.find((t) => t.id === Number(id));

  /* DELETE */
  async function handleDelete() {
    try {
      const resp = await removeTask(Number(id));
      alert("Task eliminata!");
      navigate("/task-list");
    } catch (err) {
      alert(err.message);
    }
  }

  /*   UPDATE */

  async function handleUpdate(updatedTask) {
    try {
      await updateTask(updatedTask);
      alert("Task modificata con successo!");
      setShowEdit(false);
    } catch (err) {
      alert(err.message);
    }
  }

  if (!task) return <h2 className="text-center">Task non trovata!</h2>;
  return (
    <section className="container py-4 d-flex justify-content-center">
      <article className="card w-100" style={{ maxWidth: "600px" }}>
        <div className="card-body">
          <h2 className="card-title mb-3">{task.title}</h2>

          <p className="card-text">{task.description}</p>

          <div className="mb-2">
            <strong className="text-primary">{task.status}</strong>
          </div>

          <span className="text-muted small d-block mb-3">
            {formatDate(task.createdAt)}
          </span>

          <div className="d-flex justify-content-end gap-3">
            <button
              onClick={() => setShowDelete(true)}
              className="btn btn-danger"
            >
              Cancella
            </button>
            <button
              onClick={() => setShowEdit(true)}
              className="btn btn-warning"
            >
              Modifica
            </button>
          </div>
        </div>
      </article>

      <Modal
        show={showDelete}
        title={task.title}
        content={task.description}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />

      <EditTaskModal
        show={showEdit}
        task={task}
        onClose={() => setShowEdit(false)}
        onSave={handleUpdate}
      />
    </section>
  );
}
