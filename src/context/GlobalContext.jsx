import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const url = import.meta.env.VITE_API_URL;
  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(`${url}/tasks`);
        const obj = await resp.json();
        setTasks(obj);
      } catch (err) {
        console.log(err.message);
      }
    })();
  }, []);

  return (
    <GlobalContext.Provider value={{ tasks, setTasks }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };
