"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminLayout from "@/components/AdminLayout";

const mockuser = { name: "Col. Caleb Oladimeji", role: "super_admin" };

export default function AdminRootLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    //TODO: Replace with real  supabase session check
    //const {data: { session } = await supaase.auth.getSession}
    const isLoggedIn = localStorage.getItem("ocs_admin_auth");
    const isLoginPage = pathname === "/admin/login";

    if (!isLoggedIn && !isLoginPage) {
      router.replace("/admin/login");
    } else {
      setChecking(false);
    }
  }, [pathname]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-[#060a14] flex items-center justify-center">
        <p className="text-white/30 font-['Barlow_Condensed] text-sm tracking-widest uppercase">
          Checking access...
        </p>
      </div>
    );
  }

  return <AdminLayout user={mockuser}>{children}</AdminLayout>;
}
