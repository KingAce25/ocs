"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@@/lib/supabase/client";

export default function ForgotPassword() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [error, setError] = useState("");

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    setError("");
    setStatus("submitting");

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin/reset-password`,
      },
    );

    if (resetError) {
      setStatus("error");
      setError(resetError.message);
      return;
    }

    setStatus("sent");
  }

  const inputBase =
    "w-full bg-white/[0.05] border border-white/15 text-white/85 font-['Barlow'] text-sm placeholder-white/20 px-4 py-3 outline-none transition-all duration-200 focus:bg-white/[0.08] focus:border-[#c9a84c]/60 rounded-none";

  return (
    <div className="min-h-screen bg-[#060a14] font-['Barlow',sans-serif] flex items-center justify-center px-4 relative overflow-hidden">
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
        <div className="text-center mb-10">
          <h1 className="font-['Cormorant_Garamond'] text-white text-4xl font-700 mb-2">
            Reset Password
          </h1>
          <p className="text-white/35 text-sm font-300">
            We&apos;ll email you a link to set a new password.
          </p>
        </div>

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

          {status === "sent" ? (
            <div className="text-center py-4">
              <p className="text-[#5DCAA5] text-sm font-['Barlow'] mb-2">
                ✓ Check your email
              </p>
              <p className="text-white/40 text-xs font-['Barlow'] leading-relaxed">
                If an account exists for {email}, a reset link is on its way.
              </p>
            </div>
          ) : (
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
                  className={inputBase}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
                {error && (
                  <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                    {error}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 flex items-center justify-center gap-3 w-full bg-[#c9a84c] hover:bg-[#b8972e] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0f1e] py-3.5 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300"
              >
                {status === "submitting" ? "Sending…" : "Send Reset Link"}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-white/25 text-xs font-['Barlow'] mt-6">
          <Link
            href="/admin/login"
            className="text-[#c9a84c]/60 hover:text-[#c9a84c] transition-colors"
          >
            ← Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
