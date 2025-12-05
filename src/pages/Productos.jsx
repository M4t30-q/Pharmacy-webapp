export default function Productos() {
  const productos = [
    { id: 1, nombre: "Ibuprofeno", categoria: "Antiinflamatorio" },
    { id: 2, nombre: "Omeprazol", categoria: "Gastrointestinal" },
  ];

  return (
    <section className="w-full px-6 md:px-10 py-10 text-white/90">
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {productos.map(p => (
          <div key={p.id}
            className="
              backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl
              p-6 shadow-xl hover:bg-white/10 transition
            "
          >
            <h2 className="text-xl font-semibold">{p.nombre}</h2>
            <p className="text-white/70">{p.categoria}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
