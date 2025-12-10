import { Mail, HelpCircle, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function Ayuda() {
  return (
    <section className="w-full px-6 md:px-10 py-10 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-semibold tracking-tight mb-10">Ayuda</h1>

      <div className="space-y-10">

        {/* SECTION — FAQ */}
        <FAQSection />

        {/* SECTION — CONTACT */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <Mail size={20} /> Contactar soporte
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
            ¿Tienes un problema o necesitas asistencia? Estamos aquí para ayudarte.
          </p>

          <a
            href="mailto:soporte@farmaciaapp.com"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-lg hover:opacity-80 transition font-medium"
          >
            <MessageSquare size={18} />
            Enviar mensaje
          </a>
        </div>

        {/* SECTION — INFO */}
        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl p-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <HelpCircle size={20} /> Más información
          </h2>

          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
            Documentación oficial, guías, ejemplos y recursos estarán disponibles aquí
            próximamente para ayudarte a sacar el máximo provecho de la aplicación.
          </p>
        </div>

      </div>
    </section>
  );
}

/* ---------------------------
      FAQ SECTION COMPONENT
---------------------------- */
function FAQSection() {
  const [open, setOpen] = useState(null);

  const faq = [
    {
      q: "¿Cómo puedo cambiar mi contraseña?",
      a: "Ve a Configuración → Contraseña. Ingresa tu contraseña actual y luego la nueva.",
    },
    {
      q: "¿Cómo recupero mi cuenta?",
      a: "En la pantalla de inicio de sesión, selecciona '¿Olvidaste tu contraseña?' y sigue las instrucciones.",
    },
    {
      q: "¿Mis datos están seguros?",
      a: "Sí. Los datos están almacenados localmente y solo tú tienes acceso directo a ellos.",
    },
    {
      q: "¿Habrá más funciones?",
      a: "Sí. Estamos trabajando en nuevas herramientas para inventarios, reportes y control avanzado.",
    },
  ];

  return (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Preguntas frecuentes</h2>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {faq.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full text-left py-4 flex items-center justify-between hover:text-black dark:hover:text-white transition"
            >
              <span className="font-medium">{item.q}</span>
              <span className="text-xl">{open === i ? "−" : "+"}</span>
            </button>

            {open === i && (
              <p className="text-gray-600 dark:text-gray-400 text-sm pb-4">
                {item.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
