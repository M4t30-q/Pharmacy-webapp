import { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import Auth from "./pages/Auth";

export default function App() {
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


  useEffect(() => {
    // si el usuario cambia, lo guardamos
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Si NO hay sesión → mostrar Auth (que maneja login/register)
  if (!user) {
    return (
      <Auth
        onLoginSuccess={(u) => {
          setUser(u);
        }}
      />
    );
  }

  // Dashboard y Layout siempre reciben la prop user correcta
  // Si hay sesión → mostrar Dashboard/Layout
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
