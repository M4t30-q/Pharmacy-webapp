export default function Ventas() {
  const ventas = [
    { id: 1, producto: "Paracetamol", cantidad: 2, total: 120 },
    { id: 2, producto: "Amoxicilina", cantidad: 1, total: 90 },
  ];

  return (
    <section className="w-full px-6 md:px-10 py-10 text-white/90">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Ventas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <p className="text-white/70 text-sm">Ventas del día</p>
          <h2 className="text-4xl mt-2 font-semibold">9</h2>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <p className="text-white/70 text-sm">Total generado</p>
          <h2 className="text-4xl mt-2 font-semibold">$730</h2>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-white/70 text-sm border-b border-white/10">
              <th className="py-3">Producto</th>
              <th className="py-3">Cantidad</th>
              <th className="py-3">Total</th>
            </tr>
          </thead>

          <tbody>
            {ventas.map(v => (
              <tr key={v.id}
                className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-3">{v.producto}</td>
                <td className="py-3">{v.cantidad}</td>
                <td className="py-3">${v.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
