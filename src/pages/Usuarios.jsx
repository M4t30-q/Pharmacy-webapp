// src/pages/Usuarios.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Toast from "../components/Toast";

export default function Usuarios({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // create form
  const [openCreate, setOpenCreate] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", username: "", password: "" });

  const [toast, setToast] = useState("");

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    load();
  }, [isAdmin]);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("profiles").select("id, email, username, role, created_at").order("created_at", { ascending: false });
    setUsers(data || []);
    setLoading(false);
  }

  async function changeRole(id, role) {
    const { error } = await supabase.from("profiles").update({ role }).eq("id", id);
    if (error) setToast("Error cambiando rol");
    else {
      setToast("Rol actualizado");
      load();
    }
  }

  async function removeProfile(id) {
    if (!confirm("Eliminar perfil? Esto no elimina el usuario auth (server-only).")) return;
    const { error } = await supabase.from("profiles").delete().eq("id", id);
    if (error) setToast("Error eliminando perfil");
    else {
      setToast("Perfil eliminado");
      load();
    }
  }

  async function createUser() {
    if (!newUser.email || !newUser.password || !newUser.username) {
      setToast("Completa los campos");
      return;
    }

    // create auth user (this triggers confirmation email if enabled)
    const { data, error } = await supabase.auth.signUp({
      email: newUser.email,
      password: newUser.password,
    });

    if (error) {
      setToast(error.message || "Error creando usuario");
      return;
    }

    // upsert profile row (use the returned user id when available)
    const userId = data.user?.id;
    if (userId) {
      const { error: pErr } = await supabase.from("profiles").upsert({
        id: userId,
        email: newUser.email,
        username: newUser.username,
        role: "user",
      });
      if (pErr) {
        setToast("Error creando perfil");
        return;
      }
    }

    setToast("Usuario creado (revisa email para confirmar si aplica)");
    setNewUser({ email: "", username: "", password: "" });
    setOpenCreate(false);
    load();
  }

  if (!isAdmin) return <div className="p-6">Acceso denegado — solo administradores.</div>;

  return (
    <section className="w-full px-6 md:px-10 py-10 text-white/90">
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Usuarios</h1>

      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => setOpenCreate(true)} className="px-4 py-2 bg-white/10 rounded">+ Crear usuario</button>
        <button onClick={load} className="px-3 py-2 bg-white/5 rounded">Refrescar</button>
      </div>

      {loading ? <div>Cargando...</div> : (
        <div className="space-y-3">
          {users.length === 0 && <div className="text-white/60">No hay usuarios</div>}
          {users.map(u => (
            <div key={u.id} className="p-4 bg-white/5 rounded flex items-center justify-between">
              <div>
                <div className="font-semibold">{u.username || "—"}</div>
                <div className="text-sm text-white/70">{u.email}</div>
              </div>

              <div className="flex items-center gap-3">
                <select defaultValue={u.role} onChange={(e) => changeRole(u.id, e.target.value)} className="px-2 py-1 bg-white/6 rounded">
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                  <option value="staff">staff</option>
                </select>

                <button onClick={() => removeProfile(u.id)} className="px-2 py-1 bg-red-600/40 rounded">Eliminar</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CREATE MODAL simple inline */}
      {openCreate && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white/6 p-6 rounded-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-3">Crear usuario</h3>

            <input placeholder="Email" value={newUser.email} onChange={(e)=> setNewUser(s => ({...s, email: e.target.value}))} className="w-full mb-2 px-3 py-2 rounded bg-white/5" />
            <input placeholder="Nombre de usuario" value={newUser.username} onChange={(e)=> setNewUser(s => ({...s, username: e.target.value}))} className="w-full mb-2 px-3 py-2 rounded bg-white/5" />
            <input placeholder="Contraseña" type="password" value={newUser.password} onChange={(e)=> setNewUser(s => ({...s, password: e.target.value}))} className="w-full mb-4 px-3 py-2 rounded bg-white/5" />

            <div className="flex gap-2">
              <button onClick={createUser} className="px-3 py-2 bg-white/10 rounded">Crear</button>
              <button onClick={() => setOpenCreate(false)} className="px-3 py-2 bg-white/5 rounded">Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {toast && <Toast text={toast} onClose={() => setToast("")} />}
    </section>
  );
}
