export default function Dashboard({ user }) {
  const stats = {
    productos: 124,
    ventasHoy: 7,
    clientesActivos: 15,
    alertas: ["Stock bajo: paracetamol", "Pedido pendiente de cobro"],
  };

  const cards = [
    { label: "Productos registrados", value: stats.productos },
    { label: "Ventas del día", value: stats.ventasHoy },
    { label: "Clientes activos", value: stats.clientesActivos }
  ];

  const ventasSemana = [4, 7, 5, 9, 6, 10, 3];

  return (
    <section
      className="
        w-full h-full
        px-6 md:px-10 py-10
        text-white/90
      "
    >
      {/* TITLE */}
      <h1 className="text-3xl font-semibold tracking-tight mb-8">
        Bienvenido, {user?.nombre || "usuario"}
      </h1>

      {/* TOP STATS */}
      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          gap-6 mb-10
        "
      >
        {/* CARD 1 */}
        <div
          className="
            backdrop-blur-xl bg-white/5
            border border-white/10
            rounded-2xl p-6
            shadow-lg transition hover:shadow-xl
          "
        >
          <p className="text-sm text-white/70">Productos en inventario</p>
          <h2 className="text-4xl mt-2 font-semibold">{stats.productos}</h2>
        </div>

        {/* CARD 2 */}
        <div
          className="
            backdrop-blur-xl bg-white/5
            border border-white/10
            rounded-2xl p-6
            shadow-lg transition hover:shadow-xl
          "
        >
          <p className="text-sm text-white/70">Ventas hoy</p>
          <h2 className="text-4xl mt-2 font-semibold">{stats.ventasHoy}</h2>
        </div>

        {/* CARD 3 */}
        <div
          className="
            backdrop-blur-xl bg-white/5
            border border-white/10
            rounded-2xl p-6
            shadow-lg transition hover:shadow-xl
          "
        >
          <p className="text-sm text-white/70">Clientes activos</p>
          <h2 className="text-4xl mt-2 font-semibold">{stats.clientesActivos}</h2>
        </div>
      </div>

      {/* ALERTAS */}
      <div
        className="
          backdrop-blur-xl bg-white/5
          border border-white/10
          rounded-2xl p-6
          shadow-lg mb-6
        "
      >
        <h2 className="text-xl font-medium mb-4 tracking-tight">Alertas recientes</h2>

        <ul className="space-y-2">
          {stats.alertas.length === 0 && (
            <li className="text-white/60">No hay alertas actuales.</li>
          )}

          {stats.alertas.map((alerta, idx) => (
            <li
              key={idx}
              className="
                p-3 rounded-xl 
                bg-white/5 border border-white/10
                hover:bg-white/[0.08]
                transition
              "
            >
              {alerta}
            </li>
          ))}
        </ul>
      </div>

      {/* OPTIONAL: Mini gráfico de ventas de la semana */}
      <div className="flex items-end gap-2 h-24 mb-6">
        {ventasSemana.map((v, idx) => (
          <div
            key={idx}
            className="bg-white/20 rounded-sm w-3"
            style={{ height: `${v * 8}px` }}
            title={`Día ${idx + 1}: ${v}`}
          />
        ))}
      </div>
    </section>
  );
}
