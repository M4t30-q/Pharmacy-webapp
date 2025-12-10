import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import Dashboard from "../pages/Dashboard";
import Inventario from "../pages/Inventario";
import { useState } from "react";
import Configuracion from "../pages/Configuracion";
import Productos from "../pages/Productos";
import Ventas from "../pages/Ventas";
import Usuarios from "../pages/Usuarios";


export default function Layout({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard user={user} />,
    inventario: <Inventario user={user} />,
    productos: <Productos />,
    ventas: <Ventas />,
    usuarios: <Usuarios />,
    configuracion: <Configuracion user={user} />,
  };

  return (
    <div className="app-layout">
      <Sidebar role={user.role} onNavigate={setPage} onLogout={onLogout} />
      
      <main className="main-content">
        <div className="topbar">
          <ThemeToggle />
          <span className="user-name">{user?.nombre || user?.email}</span>
        </div>

        {pages[page] || pages.dashboard}
      </main>
    </div>
  );
}
