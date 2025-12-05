import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");

  return (
    <div
      className="
        min-h-screen w-full 
        flex items-center justify-center 
        bg-[var(--bg)]
        px-4 py-10
      "
    >
      <div
        className="
          flex w-full max-w-5xl
          backdrop-blur-xl bg-white/10
          border border-white/20
          shadow-xl rounded-3xl
          overflow-hidden
          transition-all duration-500
        "
      >
        {/* LEFT PANEL */}
        <div
          className="
            hidden md:flex flex-col justify-between
            w-2/5 p-12
            bg-black/10 backdrop-blur-2xl
            border-r border-white/10
          "
        >
          {/* Logo + Title */}
          <div className="space-y-6">

            <div className="flex items-center gap-3">
              {/* SVG ICON (replaces Heroicon) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-white/80"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>

              <h1 className="text-2xl font-semibold text-white/90 tracking-tight">
                FarmaciaApp
              </h1>
            </div>

            <p className="text-white/70 leading-relaxed text-sm">
              Solución profesional para gestión farmacéutica.
              Control de inventario, usuarios y ventas con precisión.
            </p>
          </div>

          {/* SWITCH MODE */}
          <div className="pt-10">
            {mode === "login" ? (
              <p className="text-white/60 text-sm">
                ¿No tienes cuenta?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-white/85 underline hover:text-white transition"
                >
                  Crear cuenta
                </button>
              </p>
            ) : (
              <p className="text-white/60 text-sm">
                ¿Ya tienes cuenta?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-white/85 underline hover:text-white transition"
                >
                  Iniciar sesión
                </button>
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div
          className="
            w-full md:w-3/5 
            p-8 md:p-14 
            flex items-center justify-center
          "
        >
          <div
            className="
              w-full max-w-md 
              bg-white/5 backdrop-blur-xl
              border border-white/10
              p-8 rounded-2xl
              shadow-lg animate-fadeSlide
            "
          >
            {mode === "login" ? (
              <Login
                onLogin={(u) => onLoginSuccess(u)}
                onShowRegister={() => setMode("register")}
              />
            ) : (
              <Register
                onRegister={() => setMode("login")}
                onCancel={() => setMode("login")}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
