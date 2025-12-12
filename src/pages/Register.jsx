import React, { useState, useMemo } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Register({ onRegister, onCancel }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const emailValid = v => /\S+@\S+\.\S+/.test(v);

  const strength = useMemo(() => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[\W_]/.test(pass)) score++;
    return score;
  }, [pass]);

  const strengthLabel = ["Muy débil","Débil","Okay","Fuerte","Muy fuerte"][strength];

  async function handleRegister() {
    setError("");

    if (!email || !username || !pass || !pass2) {
      return setError("Completa todos los campos.");
    }
    if (!emailValid(email)) {
      return setError("Email no válido.");
    }
    if (pass !== pass2) {
      return setError("Las contraseñas no coinciden.");
    }
    if (pass.length < 6) {
      return setError("La contraseña debe tener al menos 6 caracteres.");
    }

    setLoading(true);

    // 1) Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: pass,
    });

    if (authError) {
      setLoading(false);
      return setError(authError.message);
    }

    // 2) Insert profile
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        email,
        username,
        role: "admin",
      });

    setLoading(false);

    if (profileError) {
      console.error(profileError);
      return setError("Error creando el perfil.");
    }

    onRegister(authData.user);
  }

  return (
    <div className="auth-card-form register">
      <h2>Crear cuenta administradora</h2>

      <div className="form-grid-single">

        {/* USERNAME */}
        <div className="input-group">
          <input
            placeholder=" "
            value={username}
            onChange={e => setUsername(e.target.value)}
            id="reg-username"
            required
          />
          <label htmlFor="reg-username">Nombre de usuario</label>
        </div>

        {/* EMAIL */}
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

        {/* PASSWORD */}
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
           >
            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>

          <div className="password-strength">
            <div className={`bar s-${strength}`} />
            <small>{strengthLabel}</small>
          </div>
        </div>

        {/* PASSWORD 2 */}
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
        <button className="primary" disabled={loading} onClick={handleRegister}>
          {loading ? "Registrando..." : "Registrar"}
        </button>

        <button className="outline" onClick={onCancel}>Cancelar</button>
      </div>

      {error && <div className="register-error">{error}</div>}
    </div>
  );
}
