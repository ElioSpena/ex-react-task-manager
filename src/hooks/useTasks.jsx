import { useState, useEffect, useReducer } from "react";

export default function useTask() {
  const url = import.meta.env.VITE_API_URL;

  const [state, dispatch] = useReducer(tasksReducer, []);

  function tasksReducer(state, action) {
    switch (action.type) {
      case "SET_TASKS":
        return action.payload;
      case "ADD_TASK":
        return [...state, action.payload];
      case "REMOVE_TASK":
        return state.filter((t) => t.id !== action.payload);
      case "REMOVE_MULTIPLE":
        return state.filter((t) => !action.payload.includes(t.id));
      case "UPDATE_TASK":
        return state.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        );
      default:
        return state;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${url}/tasks`);
        const data = await resp.json();
        dispatch({ type: "SET_TASKS", payload: data });
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  //CREATE TASK

  const addTask = async (task) => {
    if (state.some((t) => t.title === task.title)) {
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
    dispatch({ type: "ADD_TASK", payload: createdTask.task });
    return createdTask.task;
  };

  //DELETE TASK
  const removeTask = async (taskId) => {
    const resp = await fetch(`${url}/tasks/${taskId}`, { method: "DELETE" });
    const data = await resp.json();
    if (!data.success) {
      throw new Error(data.message);
    }

    dispatch({ type: "REMOVE_TASK", payload: taskId });
  };

  //DELETE MULTIPLE TASKS

  const removeMultipleTask = async (arrayTaskId) => {
    const results = await Promise.allSettled(
      arrayTaskId.map((id) => removeTask(id)),
    );

    const successfulIds = [];
    const failedIds = [];

    results.forEach((res) => {
      if (res.status === "fulfilled") {
        successfulIds.push(res.value);
      } else {
        failedIds.push(res.reason);
      }
    });

    if (successfulIds.length > 0) {
      dispatch({
        type: "REMOVE_MULTIPLE",
        payload: successfulIds,
      });
    }

    if (failedIds.length > 0) {
      throw new Error(
        `Errore eliminazione task: ${failedIds.map((f) => f.message).join(", ")}`,
      );
    }
  };

  //UPDATE TASK
  const updateTask = async (updatedTask) => {
    if (
      state.some(
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

    dispatch({ type: "UPDATE_TASK", payload: data.task });

    return data.task;
  };

  return {
    tasks: state,
    addTask,
    removeTask,
    removeMultipleTask,
    updateTask,
  };
}
