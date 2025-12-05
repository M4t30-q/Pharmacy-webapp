import React, { useState, useMemo } from "react";

export default function Register({ onRegister, onCancel }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const emailValid = (v) => /\S+@\S+\.\S+/.test(v);

  const strength = useMemo(() => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[\W_]/.test(pass)) score++;
    return score; // 0..4
  }, [pass]);

  const strengthLabel = ["Muy débil","Débil","Okay","Fuerte","Muy fuerte"][strength];

  const handle = () => {
    setError("");
    if (!email || !pass || !pass2) {
      setError("Completa todos los campos.");
      return;
    }
    if (!emailValid(email)) {
      setError("Ingresa un email válido.");
      return;
    }
    if (pass !== pass2) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const prevUsers = JSON.parse(localStorage.getItem("users") || "[]");
      if (prevUsers.some(u => u.email === email)) {
        setError("El email ya está registrado.");
        setLoading(false);
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

      setLoading(false);
      if (onRegister) onRegister();
    }, 700);
  };

  return (
    <div className="centered-box-outer auth-inner">
      <section className="centered-box auth-card-form register">
        <h2>Crear cuenta administradora</h2>

        <div className="form-grid-single">
          <div className="input-group">
            <input
              placeholder=" "
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              id="reg-email"
              aria-invalid={!emailValid(email) && email !== ""}
              required
            />
            <label htmlFor="reg-email">Email</label>
          </div>

          <div className="input-group password-wrapper">
            <input
              placeholder=" "
              type={showPass ? "text" : "password"}
              value={pass}
              onChange={e => setPass(e.target.value)}
              id="reg-pass"
              required
            />
            <label htmlFor="reg-pass">Contraseña</label>
            <button
              type="button"
              className="toggle-pass"
              onClick={() => setShowPass(!showPass)}
              aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {showPass ? "🙈" : "👁️"}
            </button>
            <div className="password-strength">
              <div className={`bar s-${strength}`} aria-hidden />
              <small>{strengthLabel}</small>
            </div>
          </div>

          <div className="input-group">
            <input
              placeholder=" "
              type={showPass ? "text" : "password"}
              value={pass2}
              onChange={e => setPass2(e.target.value)}
              id="reg-pass2"
              required
            />
            <label htmlFor="reg-pass2">Confirmar contraseña</label>
          </div>
        </div>

        <div className="actions-row">
          <button className="primary" disabled={loading} onClick={handle}>{loading ? "Registrando..." : "Registrar"}</button>
          <button className="outline" onClick={onCancel}>Cancelar</button>
        </div>

        {error && <div className="register-error">{error}</div>}
        <div className="register-info">
          <small>Esta cuenta tendrá permisos de administrador.</small>
        </div>
      </section>
    </div>
  );
}
