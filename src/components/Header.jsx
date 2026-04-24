import { NavLink } from "react-router-dom";

export default function Header() {
  const links = [
    { path: "/", name: "Home" },
    { path: "/add-task", name: "Add task" },
    { path: "/task-list", name: "Task list" },
  ];

  return (
    <header className="border-bottom mb-3">
      <nav className="container d-flex gap-3 py-3 justify-content-center">
        {links.map((l, id) => (
          <NavLink key={id} className="text-decoration-none" to={l.path}>
            {l.name}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
