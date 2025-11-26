import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

// Tema oscuro por defecto, salvo elección explícita del usuario
const USER_THEME_KEY = "theme";
const DEFAULT_THEME = "dark";

// Aplica el tema seleccionado o el predeterminado
function initializeTheme() {
  const stored = localStorage.getItem(USER_THEME_KEY);
  const theme = stored || DEFAULT_THEME;
  localStorage.setItem(USER_THEME_KEY, theme);
  document.documentElement.setAttribute("data-theme", theme);
}

// Permite futuras ampliaciones para pantallas grandes, accesibilidad, etc.
function prepareBase() {
  initializeTheme();
  // Ejemplo: detectar dispositivo y optimizar UI
  // const isMobile = window.innerWidth < 768;
  // document.documentElement.setAttribute("data-device", isMobile ? "mobile" : "desktop");

  // Ejemplo: preparativos para modo accesible
  // if (localStorage.getItem("accessible") === "true") {
  //   document.documentElement.classList.add("accessible");
  // }
}

prepareBase();

// Render principal de la aplicación
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
