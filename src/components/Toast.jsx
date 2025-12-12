import { useEffect } from "react";

export default function Toast({ text, onClose }) {
  useEffect(() => {
    const t = setTimeout(() => onClose?.(), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="
        fixed bottom-4 right-4 
        bg-white/20 backdrop-blur-xl
        text-white px-4 py-3
        rounded-xl shadow-xl
        border border-white/10
        animate-fadeSlide
        z-[1000]
      "
    >
      {text}
    </div>
  );
}
