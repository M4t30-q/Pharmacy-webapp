import { supabase } from "./supabaseClient";

export async function signUp({ email, password, username }) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error };
  // upsert profile using auth user id
  const userId = data.user.id;
  const { error: profileErr } = await supabase.from("profiles").upsert({
    id: userId, email, username, role: 'admin'  // set admin for first user if you want
  });
  return { user: data.user, error: profileErr || null };
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  return supabase.auth.signOut();
}

export async function fetchProfile(userId) {
  const { data, error } = await supabase.from("profiles").select("id, email, username, role").eq("id", userId).single();
  return { data, error };
}
