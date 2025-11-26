export default function Dashboard({ user }) {
  console.log("Dashboard props:", user);
  // Datos básicos de prueba
  const stats = {
    productos: 111,
    ventasHoy: 9,
    clientesActivos: 8,
    alertas: [
      "Stock bajo: Paracetamol",
      "Pedido pendiente de cobro"
    ]
  };

  return (
    <section style={{ minHeight: 300, padding: 36, background: "#fff", color: "#111" }}>
      <h1>Bienvenido!</h1>
      <div style={{ display: "flex", gap: 12 }}>
        <div style={{
          background: "#ececec", padding: 18, borderRadius: 8, minWidth: 160
        }}>
          <strong>Productos:</strong> {stats.productos}
        </div>
        <div style={{
          background: "#ececec", padding: 18, borderRadius: 8, minWidth: 160
        }}>
          <strong>Ventas hoy:</strong> {stats.ventasHoy}
        </div>
        <div style={{
          background: "#ececec", padding: 18, borderRadius: 8, minWidth: 160
        }}>
          <strong>Clientes:</strong> {stats.clientesActivos}
        </div>
      </div>
      <div style={{
        marginTop: 24, background: "#ececec", padding: 14, borderRadius: 8
      }}>
        <h2>Alertas:</h2>
        <ul>
          {stats.alertas.map((a, idx) => <li key={idx}>{a}</li>)}
        </ul>
      </div>
    </section>
  );
}
