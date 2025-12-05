export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 flex items-center justify-center
        bg-black/40 backdrop-blur-sm
        z-50
      "
      onClick={onClose}
    >
      <div
        className="
          bg-white/10 backdrop-blur-xl
          border border-white/20
          rounded-2xl shadow-2xl
          p-8 w-full max-w-lg
          text-white/90
          animate-fadeSlide
        "
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-6 tracking-tight">
          {title}
        </h2>

        {children}
      </div>
    </div>
  );
}
