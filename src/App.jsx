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
  }, []);

  // Cuando NO hay usuarios o se elige registro manualmente, mostra Register
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

  // Si hay usuarios, pero no sesión activa, muestra Login con opción de registro
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

  // Usuario autenticado: muestra layout y dashboard
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
