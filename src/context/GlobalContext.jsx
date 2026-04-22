import { createContext, useContext, useEffect, useState } from "react";
import useTasks from "../hooks/useTasks";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const tasksData = useTasks();

  return (
    <GlobalContext.Provider value={{ tasksData }}>
      {children}
    </GlobalContext.Provider>
  );
}

function useGlobal() {
  return useContext(GlobalContext);
}

export { GlobalProvider, useGlobal };
