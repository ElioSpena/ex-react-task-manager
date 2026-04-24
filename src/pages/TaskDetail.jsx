import { useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";

export default function TaskDetail() {
  const { tasksData } = useGlobal();
  const { id } = useParams();

  const task = tasksData.tasks.find((t) => t.id === Number(id));
  if (!task) return <h2>Task non trovata!</h2>;
  return (
    <section>
      <article>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <strong>{task.status}</strong>
        <span>{task.createdAt}</span>
      </article>
      <button onClick={() => console.log("Elimino Task")}>Cancella</button>
    </section>
  );
}
