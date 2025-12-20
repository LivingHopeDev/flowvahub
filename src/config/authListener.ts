import { supabase } from "@/config/client";
import { useAuthStore } from "@/store/auth.store";

export function initAuthListener() {
  // Initial session
  supabase.auth.getSession().then(({ data }) => {
    useAuthStore.getState().setSession(data.session);
  });

  // Listen for changes
  supabase.auth.onAuthStateChange((_event, session) => {
    useAuthStore.getState().setSession(session);
  });
}
