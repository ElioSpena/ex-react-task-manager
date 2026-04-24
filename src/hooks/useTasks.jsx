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
  const addTask = (task) => {
    (async () => {
      try {
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
        } else {
          setTasks((prev) => [...prev, createdTask]);
          console.log("Task creata");
        }
      } catch (err) {
        console.log(err.message);
      }
    })();
  };

  //DELETE TASK
  const removeTask = () => {};
  const updateTask = () => {};

  return { tasks, addTask, removeTask, updateTask };
}
