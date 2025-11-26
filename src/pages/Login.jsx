import { useState } from "react";

export default function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handle = () => {
    setError("");
    if (!email || !pass) {
      setError("Completa todos los campos.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === pass);
    if (found) {
      onLogin(found);
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="centered-box-outer">
      <section className="centered-box login">
        <h2>Login</h2>
        <div className="form-grid">
          <div className="input-group">
            <input
              placeholder=" "
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="email"
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="input-group">
            <input
              placeholder=" "
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              id="pass"
              required
            />
            <label htmlFor="pass">Contraseña</label>
          </div>
        </div>
        <button onClick={handle}>Entrar</button>
        {error && <div className="login-error">{error}</div>}
          <button className="link-btn" onClick={onShowRegister}>
            ¿No tienes cuenta? Regístrate aquí
          </button>
      </section>
    </div>
  );
}
