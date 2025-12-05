import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Cambiar modo"
      className="
        flex items-center justify-center 
        w-11 h-11 rounded-xl
        bg-white/5 backdrop-blur-xl
        border border-white/10
        hover:bg-white/10 transition
        text-white/80
      "
    >
      {theme === "light" ? (
        /* Moon icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21.75 14.5a9.25 9.25 0 01-11.97-11A9.25 9.25 0 1021.75 14.5z" />
        </svg>
      ) : (
        /* Sun icon */
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-16a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm9-9a1 1 0 01-1 1h-2a1 1 0 110-2h2a1 1 0 011 1zM7 12a1 1 0 01-1 1H4a1 1 0 110-2h2a1 1 0 011 1zm12.07-6.07a1 1 0 010 1.41l-1.41 1.41a1 1 0 11-1.41-1.41l1.41-1.41a1 1 0 011.41 0zM7.75 17.66a1 1 0 01-1.41 0L4.93 16.25a1 1 0 011.41-1.41l1.41 1.41a1 1 0 010 1.41zM16.66 17.66a1 1 0 01-1.41 0l-1.41-1.41a1 1 0 011.41-1.41l1.41 1.41a1 1 0 010 1.41zM7.75 6.34a1 1 0 010 1.41L6.34 9.16A1 1 0 014.93 7.75L6.34 6.34a1 1 0 011.41 0z" />
        </svg>
      )}
    </button>
  );
}
