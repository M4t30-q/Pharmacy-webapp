import { useState, useEffect } from "react";
import Layout from "./layout/Layout";
import Auth from "./pages/Auth";
import Register from "./pages/Register";

export default function App() {
  // 1️⃣ TODOS LOS HOOKS VAN ARRIBA, SIEMPRE
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [hasUsers, setHasUsers] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // 2️⃣ SE PONEN LOS useEffect SIN NINGÚN RETURN ANTES
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    setHasUsers(users.length > 0);

    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  // 3️⃣ NUNCA RETORNES ANTES DE TODOS LOS HOOKS.
  // El render CONDICIONAL solo después de definir hooks.

  // 🔥 no hay usuarios → mostrar registro inicial
  if (!hasUsers || showRegister) {
    return (
      <Register
        onRegister={(newUser) => {
          localStorage.setItem("user", JSON.stringify(newUser));
          setUser(newUser);
          setHasUsers(true);
          setShowRegister(false);
        }}
        onCancel={() => setShowRegister(false)}
      />
    );
  }

  // 🔥 hay usuarios pero no sesión → mostrar login (Auth)
  if (!user) {
    return (
      <Auth
        onLoginSuccess={(loggedUser) => {
          localStorage.setItem("user", JSON.stringify(loggedUser));
          setUser(loggedUser);
        }}
      />
    );
  }

  // 🔥 usuario logeado → layout principal
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
