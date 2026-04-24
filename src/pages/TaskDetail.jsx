import { useParams, useNavigate } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

export default function TaskDetail() {
  const { tasksData } = useGlobal();
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasksData.tasks.find((t) => t.id === Number(id));

  async function handleClick() {
    try {
      const resp = await tasksData.removeTask(Number(id));
      alert("Task eliminata!");
      navigate("/task-list");
    } catch (err) {
      alert(err.message);
    }
  }

  if (!task) return <h2>Task non trovata!</h2>;
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
            {task.createdAt}
          </span>

          <button onClick={handleClick} className="btn btn-danger">
            Cancella
          </button>
        </div>
      </article>
    </section>
  );
}
