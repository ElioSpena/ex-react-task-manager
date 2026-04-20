import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/task-list" element={<TaskList />} />
          </Route>
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}

export default App;
