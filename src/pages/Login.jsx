import React, { useState } from "react";

export default function Login({ onLogin, onShowRegister, onForgot }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const emailValid = (v) => /\S+@\S+\.\S+/.test(v);

  const handle = () => {
    setError("");
    if (!email || !pass) {
      setError("Completa todos los campos.");
      return;
    }
    if (!emailValid(email)) {
      setError("Ingresa un email válido.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const found = users.find(u => u.email === email && u.password === pass);
      if (found) {
        onLogin(found);
      } else {
        setError("Credenciales incorrectas.");
      }
      setLoading(false);
    }, 600);
  };

  const handleForgot = () => {
    const promptEmail = window.prompt("Introduce tu email para recuperar la contraseña:");
    if (promptEmail) {
      if (!emailValid(promptEmail)) {
        alert("Email inválido.");
        return;
      }
      if (onForgot) onForgot(promptEmail);
    }
  };

  return (
    <div className="centered-box-outer auth-inner">
      <section className="centered-box auth-card-form login">
        <h2>Iniciar sesión</h2>

        <div className="form-grid-single">
          <div className="input-group">
            <input
              placeholder=" "
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              aria-invalid={!emailValid(email) && email !== ""}
              required
            />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-group password-wrapper">
            <input
              placeholder=" "
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={e => setPass(e.target.value)}
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
              {showPass ? "🙈" : "👁️"}
            </button>
          </div>

          <div className="aux-row">
            <button className="link-btn small" type="button" onClick={handleForgot}>¿Olvidaste tu contraseña?</button>
          </div>
        </div>

        <button className="primary" disabled={loading} onClick={handle}>
          {loading ? "Cargando..." : "Entrar"}
        </button>

        {error && <div className="login-error">{error}</div>}
        <button className="link-btn" onClick={onShowRegister}>
          ¿No tienes cuenta? Regístrate aquí
        </button>

        <div className="or-divider"><span>o</span></div>

        <button className="outline" onClick={onShowRegister}>Crear cuenta</button>
      </section>
    </div>
  );
}
