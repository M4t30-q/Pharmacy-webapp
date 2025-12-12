// src/pages/Inventario.jsx
import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Download, Upload } from "lucide-react";
import Toast from "../components/Toast";
import { supabase } from "../lib/supabaseClient";
import {
  fetchProducts,
  uploadImage,
  getSignedUrl,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../lib/products";


export default function Inventario({ user }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // form
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", quantity: 0, imagePath: null });
  const [file, setFile] = useState(null);

  const [filter, setFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const [toast, setToast] = useState("");

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const { data } = await fetchProducts();
    if (data) {
      // attach signed urls for images
      const withUrls = await Promise.all(
        data.map(async (p) => {
          const url = p.image_path ? await getSignedUrl(p.image_path) : null;
          return { ...p, imageUrl: url };
        })
      );
      setProducts(withUrls);
    } else {
      setProducts([]);
    }
    setLoading(false);
  }

  function resetForm() {
    setForm({ name: "", quantity: 0, imagePath: null });
    setFile(null);
    setEditing(null);
  }

  async function handleFile(file) {
    if (!file) return;
    setToast("Subiendo imagen...");
    try {
      const path = await uploadImage(file); // returns path in bucket
      setForm((f) => ({ ...f, imagePath: path }));
      setToast("Imagen subida. Guarda el producto para persistir.");
    } catch (err) {
      console.error(err);
      setToast("Error subiendo imagen");
    }
  }

  async function handleSave() {
    if (!form.name) {
      setToast("Nombre requerido");
      return;
    }
    if (editing) {
      await updateProduct(editing.id, {
        name: form.name,
        quantity: Number(form.quantity),
        image_path: form.imagePath,
      });
      setToast("Producto actualizado");
    } else {
      await createProduct({
        name: form.name,
        quantity: Number(form.quantity),
        image_path: form.imagePath,
        created_by: user?.id ?? null,
      });
      setToast("Producto creado");
    }
    resetForm();
    await load();
  }

  function startEdit(p) {
    setEditing(p);
    setForm({ name: p.name, quantity: p.quantity, imagePath: p.image_path });
    setFile(null);
  }

  async function handleDelete(id) {
    if (!confirm("Eliminar producto?")) return;
    await deleteProduct(id);
    setToast("Producto eliminado");
    await load();
  }

  function stockBadge(qty) {
    if (qty <= 5) return <span className="text-red-500 font-semibold">CRÍTICO</span>;
    if (qty <= 10) return <span className="text-amber-400 font-medium">BAJO</span>;
    return null;
  }

  // small export JSON
  function exportJSON() {
    const data = products.map((p) => ({
      name: p.name,
      quantity: p.quantity,
      image_path: p.image_path || null,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "inventario_export.json";
    a.click();
    setToast("Exportado");
  }

  // import JSON file (client side)
  function importJSON(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        for (const p of json) {
          await createProduct({
            name: p.name,
            quantity: Number(p.quantity || 0),
            image_path: p.image_path || null,
            created_by: user?.id ?? null,
          });
        }
        setToast("Importado");
        await load();
      } catch (err) {
        console.error(err);
        setToast("Archivo inválido");
      }
    };
    reader.readAsText(file);
  }

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <section className="w-full px-6 md:px-10 py-10 text-white/90">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">Inventario</h1>

        <div className="flex gap-3">
          <label className="px-3 py-2 rounded-xl bg-white/10 border border-white/10 cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />
            Subir imagen
          </label>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition"
          >
            <Plus size={16} />
            {editing ? "Guardar cambios" : "Añadir producto"}
          </button>

          <button
            onClick={exportJSON}
            className="px-3 py-2 rounded-xl bg-white/5 border border-white/10"
          >
            <Download size={16} />
          </button>

          <label className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 cursor-pointer">
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => importJSON(e.target.files[0])}
            />
            <Upload size={16} />
          </label>
        </div>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white/90"
        />
        <input
          placeholder="Cantidad"
          type="number"
          value={form.quantity}
          onChange={(e) => setForm((s) => ({ ...s, quantity: e.target.value }))}
          className="px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white/90"
        />
        <div className="flex items-center gap-3">
          {form.imagePath ? <span className="text-sm text-white/70">Imagen lista</span> : <span className="text-sm text-white/50">Sin imagen</span>}
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm text-white/60 mb-2">Buscar producto</label>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          placeholder="Paracetamol, ibuprofeno..."
          className="w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white/90"
        />
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && <div>Loading...</div>}
        {!loading && filtered.length === 0 && <div className="text-white/60">No hay productos</div>}

        {!loading &&
          filtered.map((p) => (
            <div key={p.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex gap-3">
                <div className="w-16 h-16 rounded-md bg-white/7 overflow-hidden">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="p-3 text-white/50">No img</div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{p.name}</h3>
                    <div className="ml-auto text-sm">{stockBadge(p.quantity)}</div>
                  </div>
                  <div className="text-white/70 text-sm">Cantidad: <strong>{p.quantity}</strong></div>
                </div>

                <div className="flex flex-col gap-2">
                  <button onClick={() => startEdit(p)} className="text-blue-300 hover:text-blue-400"><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-300 hover:text-red-400"><Trash2 size={18} /></button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {toast && <Toast text={toast} onClose={() => setToast("")} />}
    </section>
  );
}
