import { useState, useEffect } from "react";

export default function useTask() {
  const [tasks, setTasks] = useState([]);
  const url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${url}/tasks`);
        const data = await resp.json();
        setTasks(data);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  //CREATE TASK

  const addTask = async (task) => {
    if (tasks.some((t) => t.title === task.title)) {
      throw new Error("Task già esistente!");
    }
    const resp = await fetch(`${url}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const createdTask = await resp.json();

    if (!createdTask.success) {
      throw new Error(createdTask.message);
    }
    setTasks((prev) => [...prev, createdTask.task]);
    return createdTask.task;
  };

  //DELETE TASK
  const removeTask = async (taskId) => {
    const resp = await fetch(`${url}/tasks/${taskId}`, { method: "DELETE" });
    const data = await resp.json();
    if (!data.success) {
      throw new Error(data.message);
    }
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    return taskId;
  };

  const removeMultipleTask = async (arrayTaskId) => {
    const results = await Promise.allSettled(
      arrayTaskId.map((id) => removeTask(id)),
    );

    results.forEach((result) => {
      if (result.status === "fulfilled") {
        setTasks((prev) => prev.filter((t) => t.id !== result.value));
      } else {
        throw new Error(`Impossibile eliminare la task: ${result.value}`);
      }
    });
  };

  //UPDATE TASK
  const updateTask = async (updatedTask) => {
    if (
      tasks.some(
        (t) => t.title === updatedTask.title && t.id !== updatedTask.id,
      )
    ) {
      throw new Error("Task già esistente!");
    }
    
    const resp = await fetch(`${url}/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await resp.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? data.task : t)),
    );

    return data.task;
  };

  return {
    tasks,
    setTasks,
    addTask,
    removeTask,
    removeMultipleTask,
    updateTask,
  };
}
