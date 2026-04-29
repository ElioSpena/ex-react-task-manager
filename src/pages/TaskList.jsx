import { useGlobal } from "../context/GlobalContext";
import { useCallback, useState, useMemo } from "react";
import TaskRow from "../components/TaskRow";

export default function TaskList() {
  const { tasks, removeMultipleTask } = useGlobal();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTaskIds, setSelectedTaskIds] = useState([]);

  /* DEBOUNCE */
  function debounce(callback, delay) {
    let timer;
    return (value) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(value);
      }, delay);
    };
  }

  const startSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 1000),
    [],
  );

  /*AL CLICK SULLA TABELLA*/
  function handleClick(value) {
    if (sortBy === value) {
      setSortOrder((prev) => (prev === 1 ? -1 : 1));
    } else {
      setSortBy(value);
      setSortOrder(1);
    }
  }

  /*LOGICA FILTRO */
  const sortedTasks = useMemo(() => {
    const query = searchQuery.toLowerCase();

    let filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(query),
    );

    const sorted = [...filtered];

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
  }, [tasks, sortBy, sortOrder, searchQuery]);

  /*TOGGLE*/
  function toggleSelection(taskId) {
    setSelectedTaskIds((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  }

  /*HANDLE DELETE*/

  async function handleDelete() {
    try {
      await removeMultipleTask(selectedTaskIds);
      alert("Eliminazione multipla avvenuta");
    } catch (err) {
      alert(err.message);
    } finally {
      setSelectedTaskIds([]);
    }
  }

  return (
    <section className="container py-4 d-flex justify-content-center">
      <div className="w-100">
        {/*RICERCA*/}
        <div className="mb-3">
          <label htmlFor="search" className="form-label fs-5">
            Ricerca per nome
          </label>
          <input
            onChange={(e) => {
              startSearch(e.target.value);
            }}
            type="text"
            id="search"
            className="form-control"
            style={{ width: "350px" }}
          />
        </div>

        {/*TABELLA*/}
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
              <TaskRow
                key={id}
                task={task}
                onToggle={toggleSelection}
                checked={selectedTaskIds.includes(task.id)}
              />
            ))}
          </tbody>
        </table>
        {selectedTaskIds.length !== 0 && (
          <button onClick={handleDelete} className="btn btn-danger">
            Elimina selezionati
          </button>
        )}
      </div>
    </section>
  );
}
