import { useState } from "react";

const PERMISOS = [
  { id: "dashboard", label: "Dashboard" },
  { id: "productos", label: "Productos" },
  { id: "inventario", label: "Inventario" },
  { id: "ventas", label: "Ventas" },
  { id: "usuarios", label: "Usuarios" },
  { id: "ayuda", label: "Ayuda" },
  { id: "configuracion", label: "Configuración" },
];

export default function UserForm({ onSubmit, onCancel }) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [permisos, setPermisos] = useState([]);

  function togglePermiso(id) {
    setPermisos(prev =>
      prev.includes(id)
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ nombre, correo, permisos });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      <div>
        <label className="text-white/60 text-sm">Nombre</label>
        <input
          className="
            w-full px-4 py-2 mt-1
            bg-white/5 border border-white/20
            rounded-xl focus:ring-2 focus:ring-white/20
            outline-none
          "
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-white/60 text-sm">Correo</label>
        <input
          type="email"
          className="
            w-full px-4 py-2 mt-1
            bg-white/5 border border-white/20
            rounded-xl focus:ring-2 focus:ring-white/20
            outline-none
          "
          value={correo}
          onChange={e => setCorreo(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="text-white/60 text-sm">Permisos</label>

        <div className="grid grid-cols-2 gap-3 mt-2">
          {PERMISOS.map(perm => (
            <label
              key={perm.id}
              className="
                flex items-center gap-2
                bg-white/5 border border-white/10
                rounded-xl p-3 cursor-pointer
                hover:bg-white/10 transition
              "
            >
              <input
                type="checkbox"
                checked={permisos.includes(perm.id)}
                onChange={() => togglePermiso(perm.id)}
              />
              <span>{perm.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="
            px-4 py-2 rounded-xl bg-white/5 border border-white/20
            hover:bg-white/10 transition
          "
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="
            px-5 py-2 rounded-xl
            bg-white/20 border border-white/30
            hover:bg-white/30 transition
            font-medium
          "
        >
          Guardar usuario
        </button>
      </div>
    </form>
  );
}
