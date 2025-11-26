export default function Dashboard({ user }) {
  // Puedes agregar aquí llamadas a APIs o lógica real si tienes backend
  const stats = {
    productos: 124,
    ventasHoy: 7,
    clientesActivos: 15,
    alertas: [
      "Stock bajo: paracetamol",
      "Pedido pendiente de cobro"
    ]
  };

  return (
    <section className="dashboard">
      <h1>Bienvenido, {user?.nombre || "usuario"}</h1>
      <div className="dashboard-row">
        <div className="card">
          <div className="card-title">Productos en inventario</div>
          <div className="card-value">{stats.productos}</div>
        </div>
        <div className="card">
          <div className="card-title">Ventas hoy</div>
          <div className="card-value">{stats.ventasHoy}</div>
        </div>
        <div className="card">
          <div className="card-title">Clientes activos</div>
          <div className="card-value">{stats.clientesActivos}</div>
        </div>
      </div>
      <div className="card dashboard-alertas">
        <h2>Alertas recientes</h2>
        <ul>
          {stats.alertas.length === 0 && (
            <li>No hay alertas actuales.</li>
          )}
          {stats.alertas.map((alerta, idx) => (
            <li key={idx}>{alerta}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
