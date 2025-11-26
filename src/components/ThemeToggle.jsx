import { useState, useEffect } from "react";
export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Cambiar modo"
    >
      {theme === "light"
        ? <span>🌙</span>
        : <span>☀️</span>}
    </button>
  );
}
