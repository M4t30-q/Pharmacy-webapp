import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

const inventarioInicial = [
  { id: 1, nombre: "Paracetamol", cantidad: 13, categoria: "Analgesico" },
  { id: 2, nombre: "Amoxicilina", cantidad: 6, categoria: "Antibiótico" },
  { id: 3, nombre: "Ibuprofeno", cantidad: 24, categoria: "Antiinflamatorio" },
];

export default function Inventario() {
  const [productos, setProductos] = useState(inventarioInicial);
  const [filtro, setFiltro] = useState("");

  // Form state
  const [editing, setEditing] = useState(null); // product or null
  const [form, setForm] = useState({ nombre: "", cantidad: "", categoria: "" });

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  // Handle input changes
  const updateForm = (field, val) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  // Add or Save edit
  const guardarProducto = () => {
    if (!form.nombre || !form.cantidad || !form.categoria) return;

    if (editing) {
      // Editing existing product
      setProductos((prev) =>
        prev.map((p) =>
          p.id === editing.id ? { ...p, ...form } : p
        )
      );
    } else {
      // Adding new product
      const nuevo = {
        id: Date.now(),
        nombre: form.nombre,
        cantidad: Number(form.cantidad),
        categoria: form.categoria,
      };
      setProductos((prev) => [...prev, nuevo]);
    }

    limpiarForm();
  };

  const limpiarForm = () => {
    setForm({ nombre: "", cantidad: "", categoria: "" });
    setEditing(null);
  };

  const eliminarProducto = (id) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const comenzarEdicion = (producto) => {
    setEditing(producto);
    setForm({
      nombre: producto.nombre,
      cantidad: producto.cantidad,
      categoria: producto.categoria,
    });
  };

  return (
    <section className="w-full px-6 md:px-10 py-10 text-white/90">

      {/* TITLE */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Inventario</h1>

        <button
          onClick={guardarProducto}
          className="
            flex items-center gap-2 px-4 py-2 rounded-xl
            bg-white/10 hover:bg-white/20
            border border-white/10
            transition
          "
        >
          <Plus size={18} />
          {editing ? "Guardar cambios" : "Añadir producto"}
        </button>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => updateForm("nombre", e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/15
                     text-white/90 focus:ring-2 focus:ring-white/20 outline-none"
        />

        <input
          type="number"
          placeholder="Cantidad"
          value={form.cantidad}
          onChange={(e) => updateForm("cantidad", e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/15
                     text-white/90 focus:ring-2 focus:ring-white/20 outline-none"
        />

        <input
          type="text"
          placeholder="Categoría"
          value={form.categoria}
          onChange={(e) => updateForm("categoria", e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/15
                     text-white/90 focus:ring-2 focus:ring-white/20 outline-none"
        />
      </div>

      {/* SEARCH */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm text-white/60 mb-2">Buscar producto</label>
        <input
          type="text"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          placeholder="Paracetamol, ibuprofeno..."
          className="
            w-full px-4 py-3 
            bg-white/5 border border-white/15 rounded-xl 
            text-white/90 focus:ring-2 focus:ring-white/20 outline-none
          "
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto backdrop-blur-xl bg-white/5
                      border border-white/15 rounded-2xl shadow-xl p-6">

        <table className="w-full text-left">
          <thead className="text-white/70 text-sm border-b border-white/10">
            <tr>
              <th className="py-3">Nombre</th>
              <th className="py-3">Cantidad</th>
              <th className="py-3">Categoría</th>
              <th className="py-3">Acciones</th>
            </tr>
          </thead>

          <tbody className="text-white/80">
            {productosFiltrados.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-white/50 text-sm">
                  No hay productos que coincidan.
                </td>
              </tr>
            )}

            {productosFiltrados.map(producto => (
              <tr key={producto.id}
                  className="border-b border-white/5 hover:bg-white/5 transition">
                
                <td className="py-3">{producto.nombre}</td>
                <td className="py-3">{producto.cantidad}</td>
                <td className="py-3">{producto.categoria}</td>

                <td className="py-3 flex items-center gap-3">
                  <button
                    onClick={() => comenzarEdicion(producto)}
                    className="text-blue-300 hover:text-blue-400"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="text-red-300 hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
