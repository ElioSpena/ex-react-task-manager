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

  const addTask = () => {};
  const removeTask = () => {};
  const updateTask = () => {};

  return { tasks, addTask, removeTask, updateTask };
}
