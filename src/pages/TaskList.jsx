import { useGlobal } from "../context/GlobalContext";
import { useState } from "react";
import TaskRow from "../components/TaskRow";
import { useMemo } from "react";

export default function TaskList() {
  const { tasks } = useGlobal();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);

  function handleClick(value) {
    if (sortBy === value) {
      setSortOrder((prev) => (prev === 1 ? -1 : 1));
    } else {
      setSortBy(value);
      setSortOrder(1);
    }
  }

  const sortedTasks = useMemo(() => {
    const sorted = [...tasks];

    if (sortBy === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title) * sortOrder);
    }

    if (sortBy === "status") {
      const order = ["To do", "Doing", "Done"];
      sorted.sort(
        (a, b) =>
          (order.indexOf(a.status) - order.indexOf(b.status)) * sortOrder,
      );
    }

    if (sortBy === "createdAt") {
      sorted.sort(
        (a, b) =>
          (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
          sortOrder,
      );
    }

    return sorted;
  }, [tasks, sortBy, sortOrder]);

  return (
    <section className="container py-4 d-flex justify-content-center">
      <div className="w-100">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-light text-center">
            <tr>
              <th onClick={() => handleClick("title")}>Nome</th>
              <th onClick={() => handleClick("status")}>Stato</th>
              <th onClick={() => handleClick("createdAt")}>
                Data di Creazione
              </th>
            </tr>
          </thead>

          <tbody>
            {sortedTasks.map((task, id) => (
              <TaskRow key={id} task={task} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
