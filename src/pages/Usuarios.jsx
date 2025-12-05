import { useState } from "react";
import Modal from "../components/Modal";
import UserForm from "../components/UserForm";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [abierto, setAbierto] = useState(false);

  function crearUsuario(data) {
    setUsuarios(prev => [
      ...prev,
      { id: Date.now(), ...data }
    ]);
    setAbierto(false);
  }

  return (
    <section className="w-full px-6 md:px-10 py-10 text-white/90">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Usuarios</h1>

      <button
        className="
          px-5 py-3 rounded-xl bg-white/10 border border-white/20
          hover:bg-white/20 transition text-white/90 mb-6
        "
        onClick={() => setAbierto(true)}
      >
        + Crear usuario
      </button>

      {/* Tabla */}
      <div className="
        backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl
        shadow-xl p-6 overflow-x-auto
      ">
        <table className="w-full">
          <thead>
            <tr className="text-white/70 text-sm border-b border-white/10">
              <th className="py-3">Nombre</th>
              <th className="py-3">Correo</th>
              <th className="py-3">Permisos</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.length === 0 && (
              <tr>
                <td colSpan={3} className="py-6 text-center text-white/50">
                  No hay usuarios aún.
                </td>
              </tr>
            )}

            {usuarios.map(u => (
              <tr key={u.id}
                className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-3">{u.nombre}</td>
                <td className="py-3">{u.correo}</td>
                <td className="py-3 text-white/70 text-sm">
                  {u.permisos.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <Modal
        open={abierto}
        onClose={() => setAbierto(false)}
        title="Crear nuevo usuario"
      >
        <UserForm
          onSubmit={crearUsuario}
          onCancel={() => setAbierto(false)}
        />
      </Modal>
    </section>
  );
}
