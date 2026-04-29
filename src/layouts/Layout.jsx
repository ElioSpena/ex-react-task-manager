import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />

      <main className="mt-5">
        <Outlet />
      </main>
    </>
  );
}
