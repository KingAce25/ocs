"use client";

import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../../public/new.png";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  function validate() {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    return e;
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");
    try {
      // TODO: Replace with Supabase auth
      // const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
      // if (error) throw error
      await new Promise((r) => setTimeout(r, 1000));

      localStorage.setItem("ocs_admin_auth", true);

      router.push("/admin");
    } catch {
      setStatus("error");
    }
  }

  const inputBase =
    "w-full bg-white/[0.05] border text-white/85 font-['Barlow'] text-sm placeholder-white/20 px-4 py-3 outline-none transition-all duration-200 focus:bg-white/[0.08] rounded-none";
  const inputOk = "border-white/15 focus:border-[#c9a84c]/60";
  const inputErr = "border-red-500/50 focus:border-red-400/70";

  return (
    <>
      <div className="min-h-screen bg-[#060a14] font-['Barlow',sans-serif] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg,#c9a84c 0,#c9a84c 1px,transparent 0,transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_40%,rgba(201,168,76,0.06),transparent)]" />

        <div className="relative w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-full border-0.5 flex items-center justify-center mx-auto mb-6 overflow-hidden">
              <Image src={Logo} alt="" />
            </div>
            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-700 mb-2">
              Admin Access
            </h1>
            <p className="text-white/35 text-sm font-300">
              Onward Christian Soldiers — Command Panel
            </p>
          </div>

          {/* Card */}
          <div className="border border-white/10 bg-white/[0.03] p-8 relative">
            {[
              "top-0 left-0 border-t-2 border-l-2",
              "top-0 right-0 border-t-2 border-r-2",
              "bottom-0 left-0 border-b-2 border-l-2",
              "bottom-0 right-0 border-b-2 border-r-2",
            ].map((cls, i) => (
              <div
                key={i}
                className={`absolute w-5 h-5 border-[#c9a84c]/30 ${cls}`}
              />
            ))}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-white/35 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="admin@ocs.org"
                  autoComplete="email"
                  className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                  value={form.email}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, email: e.target.value }));
                    if (errors.email)
                      setErrors((er) => {
                        const n = { ...er };
                        delete n.email;
                        return n;
                      });
                  }}
                />
                {errors.email && (
                  <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-white/35 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  autoComplete="current-password"
                  className={`${inputBase} ${errors.password ? inputErr : inputOk}`}
                  value={form.password}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, password: e.target.value }));
                    if (errors.password)
                      setErrors((er) => {
                        const n = { ...er };
                        delete n.password;
                        return n;
                      });
                  }}
                />
                {errors.password && (
                  <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                    {errors.password}
                  </p>
                )}
              </div>

              {status === "error" && (
                <div className="border border-red-500/30 bg-red-500/[0.05] px-4 py-3">
                  <p className="text-red-400 text-sm font-['Barlow']">
                    Invalid credentials. Please try again.
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 flex items-center justify-center gap-3 w-full bg-[#c9a84c] hover:bg-[#b8972e] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0f1e] py-3.5 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
              >
                {status === "submitting" ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-[#0a0f1e]/30 border-t-[#0a0f1e] rounded-full animate-spin" />
                    Signing In…
                  </>
                ) : (
                  <>
                    Sign In
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      →
                    </span>
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="text-center text-white/20 text-xs font-['Barlow'] mt-6">
            Access restricted to authorised OCS personnel only.
          </p>
        </div>
      </div>
    </>
  );
}
