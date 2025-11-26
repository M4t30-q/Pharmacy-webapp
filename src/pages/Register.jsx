import { useState } from "react";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handle = () => {
    setError("");
    setSuccess(false);
    if (!email || !pass) {
      setError("Completa todos los campos.");
      return;
    }
    const prevUsers = JSON.parse(localStorage.getItem("users") || "[]");
    if (prevUsers.some(u => u.email === email)) {
      setError("El email ya está registrado.");
      return;
    }
    const newUsers = [...prevUsers, { email, password: pass, role: "admin" }];
    localStorage.setItem("users", JSON.stringify(newUsers));

    let roles = JSON.parse(localStorage.getItem("roles") || "[]");
    if (roles.length === 0) {
      roles = [
        {
          name: "admin",
          permissions: [
            "dashboard:view",
            "inventory:read",
            "inventory:write",
            "roles:manage"
          ]
        }
      ];
      localStorage.setItem("roles", JSON.stringify(roles));
    }

    setSuccess(true);
    onRegister();
  };

  return (
    <div className="centered-box-outer">
      <section className="centered-box register">
        <h2>Registro administrador</h2>
        <div className="form-grid">
          <div className="input-group">
            <input
              placeholder=" "
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="reg-email"
              required
            />
            <label htmlFor="reg-email">Email</label>
          </div>
          <div className="input-group">
            <input
              placeholder=" "
              type="password"
              value={pass}
              onChange={e => setPass(e.target.value)}
              id="reg-pass"
              required
            />
            <label htmlFor="reg-pass">Contraseña</label>
          </div>
        </div>
        <button onClick={handle}>Registrar</button>
        {error && <div className="register-error">{error}</div>}
        {success && (
          <div className="register-success">
            Registro exitoso. Puedes iniciar sesión con tu cuenta.
          </div>
        )}
        <div className="register-info">
          <small>Esta cuenta tendrá permisos de administrador.</small>
        </div>
      </section>
    </div>
  );
}
