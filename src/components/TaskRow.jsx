import { memo } from "react";
import { Link } from "react-router-dom";

function TaskRow({ task }) {
  const status = task.status.toLowerCase();

  let color;

  if (status === "to do") {
    color = "red";
  } else if (status === "doing") {
    color = "yellow";
  } else if (status === "done") {
    color = "green";
  }

  return (
    <tr>
      <td>
        <Link to={`/task/${task.id}`}>{task.title}</Link>
      </td>
      <td style={{ color }}>{task.status}</td>
      <td>{task.createdAt}</td>
    </tr>
  );
}

export default memo(TaskRow);
