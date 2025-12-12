import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabaseClient";

export function useAuth() {
  const [sessionUser, setSessionUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async (uid) => {
    if (!uid) { setProfile(null); return; }
    const { data } = await supabase.from("profiles").select("id, email, username, role").eq("id", uid).single();
    setProfile(data ?? null);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      const user = data?.session?.user ?? null;
      if (!mounted) return;
      setSessionUser(user);
      await loadProfile(user?.id);
      setLoading(false);
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      const user = session?.user ?? null;
      setSessionUser(user);
      loadProfile(user?.id);
    });

    return () => { mounted = false; listener?.subscription?.unsubscribe?.(); };
  }, [loadProfile]);

  return { user: sessionUser, profile, loading };
}
