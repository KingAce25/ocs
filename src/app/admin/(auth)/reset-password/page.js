"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@@/lib/supabase/client";

export default function ResetPassword() {
  const router = useRouter();
  const supabase = createClient();

  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | done

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setHasSession(!!session);
      setCheckingSession(false);
    }
    checkSession();
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setStatus("submitting");

    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });

    if (updateError) {
      setStatus("idle");
      setError(updateError.message);
      return;
    }

    setStatus("done");
    setTimeout(() => router.push("/admin"), 1500);
  }

  const inputBase =
    "w-full bg-white/[0.05] border border-white/15 text-white/85 font-['Barlow'] text-sm placeholder-white/20 px-4 py-3 outline-none transition-all duration-200 focus:bg-white/[0.08] focus:border-[#c9a84c]/60 rounded-none";

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-[#060a14] flex items-center justify-center">
        <p className="text-white/30 font-['Barlow_Condensed'] text-sm tracking-widest uppercase">
          Verifying link…
        </p>
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen bg-[#060a14] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="text-red-400 text-sm font-['Barlow'] mb-4">
            This reset link is invalid or has expired.
          </p>
          <a
            href="/admin/forgot-password"
            className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed']"
          >
            Request a new one →
          </a>
        </div>
      </div>
    );
  }

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
            Set New Password
          </h1>
          <p className="text-white/35 text-sm font-300">
            Choose a new password for your admin account.
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

          {status === "done" ? (
            <p className="text-[#5DCAA5] text-sm font-['Barlow'] text-center py-4">
              ✓ Password updated. Redirecting…
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              <div>
                <label className="block text-white/35 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  autoComplete="new-password"
                  className={inputBase}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>

              <div>
                <label className="block text-white/35 text-[10px] tracking-[0.25em] uppercase font-['Barlow_Condensed'] mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••••"
                  autoComplete="new-password"
                  className={inputBase}
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    setError("");
                  }}
                />
              </div>

              {error && (
                <p className="text-red-400 text-xs font-['Barlow']">{error}</p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-2 flex items-center justify-center gap-3 w-full bg-[#c9a84c] hover:bg-[#b8972e] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0f1e] py-3.5 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300"
              >
                {status === "submitting" ? "Updating…" : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
