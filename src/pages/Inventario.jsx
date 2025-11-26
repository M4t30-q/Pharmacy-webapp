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
    <section className="inventario">
      <h1>Inventario</h1>
      <div className="form-grid">
        <div className="input-group">
          <input
            type="text"
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            placeholder=" "
            id="filtro"
          />
          <label htmlFor="filtro">Buscar producto...</label>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.length === 0 &&
            <tr>
              <td colSpan={3}>No hay productos que coincidan.</td>
            </tr>
          }
          {productosFiltrados.map(producto => (
            <tr key={producto.id}>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>
              <td>{producto.categoria}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
