import dayjs from "dayjs";

export default function formatDate(date) {
  return dayjs(date).format("DD/MM/YYYY HH:mm");
}
