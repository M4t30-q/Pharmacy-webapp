import Sidebar from "../components/Sidebar";
import ThemeToggle from "../components/ThemeToggle";
import Dashboard from "../pages/Dashboard";
import Inventario from "../pages/Inventario";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useEffect, useState } from "react";

const PAGE_TITLES = {
  dashboard: "Panel de Control",
  inventario: "Inventario",
  login: "Iniciar sesión",
  register: "Registro",
};

export default function Layout({ user, onLogout }) {
  // intenta recuperar última página abierta, si no usa dashboard
  const [page, setPage] = useState(() => {
    try {
      return sessionStorage.getItem("app.page") || "dashboard";
    } catch {
      return "dashboard";
    }
  });

  // persistir la página en sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("app.page", page);
    } catch {}
  }, [page]);

  // role seguro (evita errores si user es null o no tiene role)
  const role = user?.role || "user";

  const pages = {
    dashboard: <Dashboard user={user} />,
    inventario: <Inventario user={user} />,
    login: <Login />,
    register: <Register />,
  };

  // título dinámico para el header
  const title = PAGE_TITLES[page] || PAGE_TITLES["dashboard"];

  return (
    <div className="app-layout" role="application" aria-label="Panel principal">
      <Sidebar
        role={role}
        onNavigate={(p) => setPage(p)}
        onLogout={onLogout}
        currentPage={page}
      />

      <main className="main-content" tabIndex={-1}>
        <div className="topbar" aria-hidden="false">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: "1.1rem" }}>{title}</h2>
              <div style={{ color: "var(--muted)", fontSize: ".95rem" }}>
                {user?.email ? user.email : "Usuario invitado"}
              </div>
            </div>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
            <ThemeToggle />
            <button
              onClick={onLogout}
              className="link-btn"
              aria-label="Cerrar sesión"
              title="Cerrar sesión"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <section aria-live="polite">
          {/* Renderiza la página solicitada, o dashboard como respaldo */}
          {pages[page] ?? pages["dashboard"]}
        </section>
      </main>
    </div>
  );
}
