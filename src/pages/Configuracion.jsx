import React, { useEffect, useState } from "react";
import { User, AtSign, KeyRound } from "lucide-react";

export default function Configuracion() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Save to localStorage
  const saveUser = (obj) => {
    const updated = { ...currentUser, ...obj };
    localStorage.setItem("user", JSON.stringify(updated));
    setCurrentUser(updated);
  };

  if (loading || !currentUser) {
    return (
      <div className="w-full flex justify-center py-20 text-gray-400">
        Cargando...
      </div>
    );
  }

  return (
    <section className="w-full px-6 md:px-10 py-10 text-gray-900 dark:text-gray-100">

      <h1 className="text-3xl font-semibold tracking-tight mb-10">
        Configuración
      </h1>

      <div className="space-y-10">

        {/* USERNAME */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <User size={20} /> Nombre de usuario
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Este nombre aparecerá en la aplicación.
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              defaultValue={currentUser.username}
              onBlur={(e) => saveUser({ username: e.target.value })}
              className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-black/70 dark:focus:ring-white/40 transition"
            />
          </div>
        </div>

        {/* EMAIL */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <AtSign size={20} /> Email
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Dirección de correo asociada a tu cuenta.
          </p>

          <div className="flex gap-3">
            <input
              type="email"
              defaultValue={currentUser.email}
              onBlur={(e) => saveUser({ email: e.target.value })}
              className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 focus:ring-2 focus:ring-black/70 dark:focus:ring-white/40 transition"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <KeyRound size={20} /> Contraseña
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            Cambia tu contraseña de acceso.
          </p>

          <PasswordChanger currentUser={currentUser} saveUser={saveUser} />
        </div>
      </div>
    </section>
  );
}

// ----------------------
// PASSWORD CHANGE LOGIC
// ----------------------

function PasswordChanger({ currentUser, saveUser }) {
  const [pass, setPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = () => {
    setMsg("");

    if (pass !== currentUser.password) {
      setMsg("La contraseña actual es incorrecta.");
      return;
    }
    if (newPass.length < 6) {
      setMsg("La contraseña nueva debe tener al menos 6 caracteres.");
      return;
    }
    if (newPass !== confirm) {
      setMsg("Las nuevas contraseñas no coinciden.");
      return;
    }

    saveUser({ password: newPass });
    setMsg("Contraseña actualizada correctamente.");
    setPass("");
    setNewPass("");
    setConfirm("");
  };

  return (
    <div className="space-y-4">

      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="Contraseña actual"
        className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
      />

      <input
        type="password"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        placeholder="Nueva contraseña"
        className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
      />

      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirmar nueva contraseña"
        className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
      />

      <button
        onClick={handleChange}
        className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition font-medium"
      >
        Guardar cambios
      </button>

      {msg && (
        <p className="text-sm pt-1 text-black dark:text-white opacity-80">
          {msg}
        </p>
      )}
    </div>
  );
}
