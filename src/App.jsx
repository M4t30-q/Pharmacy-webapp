import { useEffect, useState } from "react";
import Layout from "./layout/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  const [hasUsers, setHasUsers] = useState(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    return users.length > 0;
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setHasUsers(users.length > 0);
    // Inicializa el tema si es necesario
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", localStorage.getItem("theme"));
    }
  }, []);

  // Debe mostrar primero register si no hay usuarios
  if (!hasUsers || showRegister) {
    return (
      <Register
        onRegister={() => {
          setHasUsers(true);
          setShowRegister(false);
        }}
      />
    );
  }

  if (!user) {
    return (
      <Login
        onLogin={u => {
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
        }}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  // Dashboard y Layout siempre reciben la prop user correcta
  return (
    <Layout
      user={user}
      onLogout={() => {
        setUser(null);
        localStorage.removeItem("user");
      }}
    />
  );
}
