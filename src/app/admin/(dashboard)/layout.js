import { redirect } from "next/navigation";
import { createClient } from "@@/lib/supabase/server";
import AdminLayout from "@/components/AdminLayout";

export default async function AdminDashboardLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in
  if (!user) {
    redirect("/admin/login");
  }

  // Get the user's profile and role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  // Debugging
  console.log("AUTH USER ID:", user.id);
  console.log("PROFILE:", profile);
  console.log("PROFILE ERROR:", profileError);
  console.log("PROFILE ROLE:", profile?.role);

  return (
    <AdminLayout
      user={{
        name: profile?.full_name ?? user.email,
        role: profile?.role ?? null,
      }}
    >
      {children}
    </AdminLayout>
  );
}
