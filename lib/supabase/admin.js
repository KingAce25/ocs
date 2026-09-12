import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Uses the service role key — NEVER import this into a Client Component
// or expose it to the browser. Server-only (server actions, route handlers).
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
