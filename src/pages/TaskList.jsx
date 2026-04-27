import { useGlobal } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks } = useGlobal();


  return (
    <section className="container py-4 d-flex justify-content-center">
      <div className="w-100">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-light text-center">
            <tr>
              <th>Nome</th>
              <th>Stato</th>
              <th>Data di Creazione</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, id) => (
              <TaskRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
