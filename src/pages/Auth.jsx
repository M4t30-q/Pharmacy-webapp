import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function Auth({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");

  return (
    <div className="auth-root">
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
  );
}
