// src/pages/Auth.jsx
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-root">
      {mode === "login" ? (
        <Login
          onLogin={(u) => {
            // Login component should call this after successful sign-in
            if (onLoginSuccess) onLoginSuccess(u);
            else window.location.reload();
          }}
          onShowRegister={() => setMode("register")}
        />
      ) : (
        <Register
          onRegister={(u) => {
            // registration succeeded — go to login
            setMode("login");
            if (onLoginSuccess) onLoginSuccess(u);
            else window.location.reload();
          }}
          onCancel={() => setMode("login")}
        />
      )}
    </div>
  );
}
