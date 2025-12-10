import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Login({ onLogin, onShowRegister, onForgot }) {
  const [identifier, setIdentifier] = useState(""); // email OR username
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // checks email pattern
  const emailValid = (v) => /\S+@\S+\.\S+/.test(v);

  const handle = () => {
    setError("");

    if (!identifier || !pass) {
      setError("Completa todos los campos.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");

      // if identifier looks like email → match by email
      let found;

      if (emailValid(identifier)) {
        found = users.find(
          (u) => u.email === identifier && u.password === pass
        );
      } else {
        // if it’s not an email → match by username
        found = users.find(
          (u) => u.username === identifier && u.password === pass
        );
      }

      if (found) {
        onLogin(found);
      } else {
        setError("Credenciales incorrectas.");
      }

      setLoading(false);
    }, 600);
  };

  return (
    <div className="auth-card-form login">
      <h2>Iniciar sesión</h2>

      <div className="form-grid-single">
        
        {/* Username or Email */}
        <div className="input-group">
          <input
            placeholder=" "
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            id="login-id"
            required
          />
          <label htmlFor="login-id">Usuario o Email</label>
        </div>

        {/* Password */}
        <div className="input-group password-wrapper">
          <input
            placeholder=" "
            type={showPass ? "text" : "password"}
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            id="pass"
            required
          />
          <label htmlFor="pass">Contraseña</label>

          <button
            type="button"
            className="toggle-pass"
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

      </div>

      <button className="primary" disabled={loading} onClick={handle}>
        {loading ? "Cargando..." : "Entrar"}
      </button>

      {error && <div className="login-error">{error}</div>}

      <div className="or-divider"><span>o</span></div>

      <button className="outline" onClick={onShowRegister}>
        Crear cuenta
      </button>
    </div>
  );
}
