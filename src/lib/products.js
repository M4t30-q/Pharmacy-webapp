import { supabase } from "./supabaseClient";

export async function fetchProducts() {
  const { data, error } = await supabase.from("products").select("*").order("id", { ascending: false });
  return { data, error };
}

export async function uploadImage(file) {
  if (!file) return null;
  const ext = file.name.split(".").pop();
  const fileName = `${Date.now()}_${Math.random().toString(36,2)}.${ext}`;
  const { data, error } = await supabase.storage.from("product-images").upload(fileName, file, { cacheControl: "3600", upsert: false });
  if (error) throw error;
  return data.path;
}

export async function getSignedUrl(path, expires = 60 * 60) {
  if (!path) return null;
  const { data, error } = await supabase.storage.from("product-images").createSignedUrl(path, expires);
  if (error) return null;
  return data.signedUrl;
}

export async function createProduct(payload) {
  const { data, error } = await supabase.from("products").insert([payload]).select().single();
  return { data, error };
}

export async function updateProduct(id, changes) {
  const { data, error } = await supabase.from("products").update(changes).eq("id", id).select().single();
  return { data, error };
}

export async function deleteProduct(id) {
  const { data, error } = await supabase.from("products").delete().eq("id", id);
  return { data, error };
}
