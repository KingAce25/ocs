import { redirect } from "next/navigation";
import { createClient } from "@@/lib/supabase/server";
import SettingsForm from "@/components/admin/SettingsForm";

export const metadata = { title: "Settings — OCS Admin" };

export default async function AdminSettings() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "super_admin") {
    redirect("/admin");
  }

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .single();

  return <SettingsForm initialData={settings} />;
}
