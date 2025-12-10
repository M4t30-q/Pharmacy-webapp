import { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import Auth from "./pages/Auth";
import Register from "./pages/Register"; // ✔️ Te faltaba esto

export default function App() {
  // Estado del usuario logueado
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // ✔️ ESTO NO EXISTÍA — lo creamos correctamente
  const [hasUsers, setHasUsers] = useState(false);

  // Mostrar o no Registrar
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setHasUsers(users.length > 0); // ✔️ ahora sí existe

    // Inicializa el tema
    const theme = localStorage.getItem("theme") || "light";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  // Si no hay usuarios registrados → mostrar registro
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

  // Guardar usuario en localStorage cuando cambie
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // Si NO hay sesión → mostrar Auth (login)
  if (!user) {
    return (
      <Auth
        onLoginSuccess={(u) => {
          setUser(u);
        }}
      />
    );
  }

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
