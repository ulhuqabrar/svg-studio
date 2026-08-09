import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.warn(
      "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Auth features are disabled."
    );
    // Return a no-op client so builds succeed without env vars
    return {
      auth: {
        signInWithPassword: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signInWithOAuth: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signUp: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        updateUser: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        exchangeCodeForSession: async () => ({ data: null, error: { message: "Supabase not configured" } }),
      },
      from: () => ({ select: () => ({ eq: () => ({ single: async () => ({ data: null, error: null }) }) }) }),
    } as any;
  }

  client = createBrowserClient(url, key);
  return client;
}
