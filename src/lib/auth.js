/**
 * Admin auth helpers.
 *
 * BACKEND INTEGRATION POINT
 * ─────────────────────────
 * Currently a localStorage stub. When Supabase (or any auth provider)
 * is wired up, replace these two functions:
 *
 *   export async function signOut() {
 *     const supabase = createClient();
 *     await supabase.auth.signOut();
 *   }
 *
 *   export async function getSession() {
 *     const supabase = createClient();
 *     const { data: { session } } = await supabase.auth.getSession();
 *     return session;
 *   }
 *
 * Nothing in AdminLayout needs to change beyond these bodies.
 */

export async function signOut() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ocs_admin_auth");
  }
}

export async function getSession() {
  // Stub: no real session check yet.
  return null;
}
