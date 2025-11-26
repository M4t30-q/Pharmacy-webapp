export default function Dashboard({ user }) {
  const stats = {
    productos: 111,
    ventasHoy: 9,
    clientesActivos: 8,
    alertas: [
      "Stock bajo: Paracetamol",
      "Pedido pendiente de cobro",
      "Producto cercano a vencer"
    ]
  };

  const cards = [
    { label: "Productos registrados", value: stats.productos },
    { label: "Ventas del día", value: stats.ventasHoy },
    { label: "Clientes activos", value: stats.clientesActivos }
  ];

  const ventasSemana = [4, 7, 5, 9, 6, 10, 3];

  return (
    <section className="dashboard">

      <header className="dash-header">
        <h1>Panel de Control</h1>
        <p className="dash-subtitle">Resumen general del sistema</p>
      </header>

      {/* Tarjetas */}
      <div className="cards-container">
        {cards.map((c, i) => (
          <div className="metric-card" key={i}>
            <div className="metric-bar"></div>
            <div className="metric-content">
              <span className="metric-label">{c.label}</span>
              <span className="metric-value">{c.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Mini Gráfico */}
      <div className="sparkline">
        {ventasSemana.map((v, idx) => (
          <div
            key={idx}
            className="spark-bar"
            style={{ height: v * 10 }}
          ></div>
        ))}
      </div>

      {/* Alertas */}
      <div className="alert-box">
        <h2 className="alert-title">Alertas del sistema</h2>
        {stats.alertas.map((a, idx) => (
          <div className="alert-item" key={idx}>
            <span className="alert-dot"></span>
            {a}
          </div>
        ))}
      </div>

    </section>
  );
}
