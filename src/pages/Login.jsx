import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: pass,
    });

    if (authError) return setError("Credenciales incorrectas.");

    const userId = data.user.id;

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    onLogin(profile);
  }

  return (
    <div className="auth-card-form login">
      <h2>Iniciar sesión</h2>

      <div className="input-group">
        <input
          placeholder=" "
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
          required
        />
        <label>Email</label>
      </div>

      <div className="input-group password-wrapper">
        <input
          placeholder=" "
          type={showPass ? "text" : "password"}
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <label>Contraseña</label>

        <button
          type="button"
          className="toggle-pass"
          onClick={() => setShowPass(!showPass)}
        >
          {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      <button className="primary mt-4" onClick={handleLogin}>
        Entrar
      </button>

      {error && <div className="login-error">{error}</div>}

      <div className="or-divider"><span>o</span></div>

      <button className="outline" onClick={onShowRegister}>
        Crear cuenta
      </button>
    </div>
  );
}
