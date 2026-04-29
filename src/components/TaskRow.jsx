import { memo } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function TaskRow({ task }) {
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
    >
      <td>{task.title}</td>
      <td style={{ color }}>{task.status}</td>
      <td>{task.createdAt}</td>
    </tr>
  );
}

export default memo(TaskRow);
