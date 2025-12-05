import { useState } from "react";

const inventarioInicial = [
  { id: 1, nombre: "Paracetamol", cantidad: 13, categoria: "Analgesico" },
  { id: 2, nombre: "Amoxicilina", cantidad: 6, categoria: "Antibiótico" },
  { id: 3, nombre: "Ibuprofeno", cantidad: 24, categoria: "Antiinflamatorio" },
];

export default function Inventario() {
  const [productos, setProductos] = useState(inventarioInicial);
  const [filtro, setFiltro] = useState("");

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <section className="w-full h-full px-6 md:px-10 py-10 text-white/90">
      {/* TITLE */}
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Inventario</h1>

      {/* SEARCH INPUT */}
      <div className="mb-8 w-full max-w-md">
        <label className="block text-sm text-white/60 mb-2">
          Buscar producto
        </label>
        <input
          type="text"
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          placeholder="Paracetamol, ibuprofeno..."
          className="
            w-full px-4 py-3 
            bg-white/5 backdrop-blur-xl
            border border-white/15
            rounded-xl 
            text-white/90 
            focus:outline-none 
            focus:ring-2 focus:ring-white/20
            transition
          "
        />
      </div>

      {/* TABLE WRAPPER (GLASS CARD) */}
      <div
        className="
          overflow-x-auto
          backdrop-blur-xl bg-white/5
          border border-white/15
          rounded-2xl shadow-xl
          p-6
        "
      >
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-white/70 text-sm border-b border-white/10">
              <th className="py-3">Nombre</th>
              <th className="py-3">Cantidad</th>
              <th className="py-3">Categoría</th>
            </tr>
          </thead>

          <tbody className="text-white/80">
            {productosFiltrados.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="py-6 text-center text-white/50 text-sm"
                >
                  No hay productos que coincidan.
                </td>
              </tr>
            )}

            {productosFiltrados.map(producto => (
              <tr
                key={producto.id}
                className="
                  border-b border-white/5 
                  hover:bg-white/5 transition
                "
              >
                <td className="py-3">{producto.nombre}</td>
                <td className="py-3">{producto.cantidad}</td>
                <td className="py-3">{producto.categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
