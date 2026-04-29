import { memo } from "react";
import { useNavigate } from "react-router-dom";
import formatDate from "../utilities/formatDate";

function TaskRow({ task, checked, onToggle }) {
  const status = task.status.toLowerCase();
  const navigate = useNavigate();
  let color;

  if (status === "to do") {
    color = "red";
  } else if (status === "doing") {
    color = "orange";
  } else if (status === "done") {
    color = "green";
  }

  return (
    <tr
      onClick={() => navigate(`/task/${task.id}`)}
      style={{ cursor: "pointer" }}
      className="text-center"
    >
      <td className="d-flex gap-3">
        <input
          checked={checked}
          onChange={() => onToggle(task.id)}
          onClick={(e) => e.stopPropagation()}
          type="checkbox"
        />
        {task.title}
      </td>

      <td style={{ color }}>{task.status}</td>
      <td>{formatDate(task.createdAt)}</td>
    </tr>
  );
}

export default memo(TaskRow);
