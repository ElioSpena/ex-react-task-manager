import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/add-task">Add task</NavLink>
        <NavLink to="/task-list">Task list</NavLink>
      </nav>
    </header>
  );
}
