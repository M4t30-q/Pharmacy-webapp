import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import Dashboard from "../pages/Dashboard";
import Inventario from "../pages/Inventario";
import { useState } from "react";

export default function Layout({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const pages = {
    dashboard: <Dashboard user={user} />,
    inventario: <Inventario user={user} />,
    login: <Login />,
    register: <Register />
  };

  return (
    <div className="app-layout">
      <Sidebar role={user.role} onNavigate={setPage} onLogout={onLogout} />
      <main className="main-content">
        <div className="topbar">
          <ThemeToggle />
          <span className="user-name">{user?.nombre}</span>
        </div>
        {pages[page] || <Dashboard user={user} />}
      </main>
    </div>
  );
}
