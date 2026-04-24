import { useGlobal } from "../context/GlobalContext";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasksData } = useGlobal();

  console.log(tasksData);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Stato</th>
            <th>Data di Creazione</th>
          </tr>
        </thead>

        <tbody>
          {tasksData.tasks.map((task) => (
            <TaskRow key={task.id} task={task} />
            
          ))}
        </tbody>
      </table>
    </section>
  );
}
