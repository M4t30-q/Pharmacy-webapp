import { useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

export default function Productos() {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Ibuprofeno", categoria: "Antiinflamatorio" },
    { id: 2, nombre: "Omeprazol", categoria: "Gastrointestinal" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
  });

  const openForm = (producto = null) => {
    if (producto) {
      setEditing(producto);
      setForm({
        nombre: producto.nombre,
        categoria: producto.categoria,
      });
    } else {
      setEditing(null);
      setForm({ nombre: "", categoria: "" });
    }
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.nombre || !form.categoria) return;

    if (editing) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...form } : p
        )
      );
    } else {
      setProductos((prev) => [
        ...prev,
        { id: Date.now(), ...form },
      ]);
    }

    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="w-full px-6 md:px-10 py-10 text-white/90">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Productos</h1>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-white/10 hover:bg-white/20 border border-white/10 transition"
        >
          <Plus size={18} />
          Añadir producto
        </button>
      </div>

      {/* GRID OF PRODUCTS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map((p) => (
          <div
            key={p.id}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl
                       p-6 shadow-xl hover:bg-white/10 transition relative"
          >
            <h2 className="text-xl font-semibold">{p.nombre}</h2>
            <p className="text-white/70">{p.categoria}</p>

            {/* ACTION BUTTONS */}
            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={() => openForm(p)}
                className="text-blue-300 hover:text-blue-400"
              >
                <Pencil size={20} />
              </button>

              <button
                onClick={() => handleDelete(p.id)}
                className="text-red-300 hover:text-red-400"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FORM MODAL */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white/10 border border-white/15 p-8 rounded-2xl w-full max-w-md shadow-2xl relative">

            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 text-white/70 hover:text-white"
            >
              <X size={22} />
            </button>

            <h2 className="text-2xl font-semibold mb-6">
              {editing ? "Editar producto" : "Nuevo producto"}
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nombre"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/15 
                           text-white/90 focus:ring-2 focus:ring-white/20 outline-none"
              />

              <input
                type="text"
                placeholder="Categoría"
                value={form.categoria}
                onChange={(e) =>
                  setForm({ ...form, categoria: e.target.value })
                }
                className="px-4 py-3 rounded-xl bg-white/5 border border-white/15 
                           text-white/90 focus:ring-2 focus:ring-white/20 outline-none"
              />

              <button
                onClick={handleSave}
                className="mt-4 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20
                           border border-white/10 transition font-semibold"
              >
                {editing ? "Guardar cambios" : "Añadir producto"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
