import { useGlobal } from "../context/GlobalContext";

export default function TaskList() {
  const { tasks, setTasks } = useGlobal();
  console.log(tasks);

  return <div>tasklist</div>;
}
