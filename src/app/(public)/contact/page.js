"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

const REASONS = [
  "General enquiry",
  "Enlistment / joining OCS",
  "Event registration",
  "Media submission",
  "Chapter information",
  "Other",
];

const chapters = [
  {
    name: "National HQ",
    city: "Atlanta, GA",
    email: "hq@ocs.org",
    phone: "+1 (404) 000-0000",
  },
  {
    name: "Atlanta Chapter",
    city: "Atlanta, GA",
    email: "atlanta@ocs.org",
    phone: "+1 (404) 000-0001",
  },
  {
    name: "Houston Chapter",
    city: "Houston, TX",
    email: "houston@ocs.org",
    phone: "+1 (713) 000-0000",
  },
  {
    name: "New York Chapter",
    city: "New York, NY",
    email: "newyork@ocs.org",
    phone: "+1 (212) 000-0000",
  },
  {
    name: "Chicago Chapter",
    city: "Chicago, IL",
    email: "chicago@ocs.org",
    phone: "+1 (312) 000-0000",
  },
  {
    name: "Lagos Chapter",
    city: "Lagos, Nigeria",
    email: "lagos@ocs.org",
    phone: "+234 000-0000",
  },
];

const INITIAL = { name: "", email: "", chapter: "", reason: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [heroRef, heroInView] = useInView(0.1);
  const [formRef, formInView] = useInView(0.05);
  const [chaptersRef, chaptersInView] = useInView(0.1);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Your name is required.";
    if (!form.email.trim()) e.email = "Your email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address.";
    if (!form.reason) e.reason = "Please select a reason for contact.";
    if (!form.message.trim()) e.message = "Please include a message.";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters.";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("submitting");

    try {
      // TODO: Replace with your API route or Supabase insert
      // await fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
      await new Promise((r) => setTimeout(r, 1200)); // simulate network
      setStatus("success");
      setForm(INITIAL);
    } catch {
      setStatus("error");
    }
  }

  function field(key) {
    return {
      value: form[key],
      onChange: (e) => {
        setForm((f) => ({ ...f, [key]: e.target.value }));
        if (errors[key])
          setErrors((er) => {
            const n = { ...er };
            delete n[key];
            return n;
          });
      },
    };
  }

  const inputBase =
    "w-full bg-white/[0.04] border text-white/80 font-['Barlow'] text-sm placeholder-white/20 px-4 py-3 outline-none transition-all duration-200 focus:bg-white/[0.07]";
  const inputOk = "border-white/15 focus:border-[#c9a84c]/60";
  const inputErr = "border-red-500/50 focus:border-red-500/70";

  return (
    <>
      <div className="bg-[#0a0f1e] min-h-screen font-['Barlow',sans-serif]">
        {/* ── HERO ── */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg,#c9a84c 0,#c9a84c 1px,transparent 0,transparent 50%)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(201,168,76,0.07),transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0a0f1e] to-transparent" />

          <div ref={heroRef} className="relative max-w-4xl mx-auto text-center">
            <p
              className={`text-[#c9a84c] text-xs tracking-[0.35em] uppercase font-['Barlow_Condensed'] mb-6 transition-all duration-700 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Reach Out
            </p>
            <h1
              className={`font-['Cormorant_Garamond'] text-white text-[clamp(3rem,8vw,6rem)] font-700 leading-none tracking-tight mb-8 transition-all duration-700 delay-100 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Contact Us
            </h1>
            <div
              className={`flex items-center justify-center gap-4 mb-8 transition-all duration-700 delay-200 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div className="h-px w-12 bg-[#c9a84c]/40" />
              <span className="text-[#c9a84c]/60 text-sm font-['Cormorant_Garamond'] italic">
                We Stand Ready
              </span>
              <div className="h-px w-12 bg-[#c9a84c]/40" />
            </div>
            <p
              className={`text-white/55 text-lg font-300 leading-relaxed max-w-2xl mx-auto transition-all duration-700 delay-300 ${heroInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Whether you are considering enlistment, have a question about an
              event, or want to connect with your nearest chapter — we want to
              hear from you.
            </p>
          </div>
        </section>

        {/* ── FORM + SIDEBAR ── */}
        <section ref={formRef} className="px-6 pb-24">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
            {/* ── CONTACT FORM ── */}
            <div
              className={`flex-1 min-w-0 transition-all duration-700 ${formInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
            >
              {status === "success" ? (
                <div className="border border-[#1D9E75]/30 bg-[#1D9E75]/[0.05] p-12 text-center relative">
                  {[
                    "top-0 left-0 border-t-2 border-l-2",
                    "top-0 right-0 border-t-2 border-r-2",
                    "bottom-0 left-0 border-b-2 border-l-2",
                    "bottom-0 right-0 border-b-2 border-r-2",
                  ].map((cls, i) => (
                    <div
                      key={i}
                      className={`absolute w-5 h-5 border-[#1D9E75]/40 ${cls}`}
                    />
                  ))}
                  <div className="w-14 h-14 rounded-full border-2 border-[#1D9E75]/50 bg-[#1D9E75]/10 flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#5DCAA5] text-2xl">✓</span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-white text-3xl font-600 mb-4">
                    Message Received
                  </h3>
                  <p className="text-white/55 font-300 leading-relaxed mb-8">
                    Thank you for reaching out. A member of our leadership team
                    will respond within 2–3 business days. God bless you.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-[#c9a84c] font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase hover:text-white transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-6"
                >
                  <div>
                    <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-6">
                      Send a Message
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                        Full Name <span className="text-[#c9a84c]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        className={`${inputBase} ${errors.name ? inputErr : inputOk}`}
                        {...field("name")}
                      />
                      {errors.name && (
                        <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/40 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                        Email Address <span className="text-[#c9a84c]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className={`${inputBase} ${errors.email ? inputErr : inputOk}`}
                        {...field("email")}
                      />
                      {errors.email && (
                        <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Reason + Chapter */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/40 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                        Reason for Contact{" "}
                        <span className="text-[#c9a84c]">*</span>
                      </label>
                      <select
                        className={`${inputBase} ${errors.reason ? inputErr : inputOk} cursor-pointer`}
                        {...field("reason")}
                      >
                        <option value="" disabled className="bg-[#0a0f1e]">
                          Select a reason…
                        </option>
                        {REASONS.map((r) => (
                          <option key={r} value={r} className="bg-[#0a0f1e]">
                            {r}
                          </option>
                        ))}
                      </select>
                      {errors.reason && (
                        <p className="mt-1.5 text-red-400 text-xs font-['Barlow']">
                          {errors.reason}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-white/40 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                        Nearest Chapter{" "}
                        <span className="text-white/20">(optional)</span>
                      </label>
                      <select
                        className={`${inputBase} ${inputOk} cursor-pointer`}
                        {...field("chapter")}
                      >
                        <option value="" className="bg-[#0a0f1e]">
                          Select a chapter…
                        </option>
                        {chapters.map((c) => (
                          <option
                            key={c.name}
                            value={c.name}
                            className="bg-[#0a0f1e]"
                          >
                            {c.name} — {c.city}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-white/40 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-2">
                      Message <span className="text-[#c9a84c]">*</span>
                    </label>
                    <textarea
                      rows={6}
                      placeholder="Write your message here…"
                      className={`${inputBase} resize-none ${errors.message ? inputErr : inputOk}`}
                      {...field("message")}
                    />
                    <div className="flex items-center justify-between mt-1.5">
                      {errors.message ? (
                        <p className="text-red-400 text-xs font-['Barlow']">
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <p className="text-white/20 text-xs font-['Barlow'] ml-auto">
                        {form.message.length} chars
                      </p>
                    </div>
                  </div>

                  {/* Enlistment note */}
                  {form.reason === "Enlistment / joining OCS" && (
                    <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.04] px-5 py-4">
                      <p className="text-[#c9a84c]/80 text-sm font-['Barlow'] leading-relaxed">
                        <span className="font-500">
                          Considering enlistment?
                        </span>{" "}
                        Please include your age, location, church affiliation,
                        and a brief description of why you want to join OCS.
                        This will help us respond more effectively.
                      </p>
                    </div>
                  )}

                  {status === "error" && (
                    <div className="border border-red-500/30 bg-red-500/[0.05] px-5 py-4">
                      <p className="text-red-400 text-sm font-['Barlow']">
                        Something went wrong. Please try again or email us
                        directly at hq@ocs.org.
                      </p>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-3 bg-[#c9a84c] hover:bg-[#b8972e] disabled:opacity-60 disabled:cursor-not-allowed text-[#0a0f1e] px-10 py-4 font-['Barlow_Condensed'] text-sm tracking-[0.2em] uppercase font-700 transition-all duration-300 group"
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="w-3 h-3 border-2 border-[#0a0f1e]/40 border-t-[#0a0f1e] rounded-full animate-spin" />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            →
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── SIDEBAR ── */}
            <aside
              className={`lg:w-72 shrink-0 transition-all duration-700 delay-200 ${formInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
            >
              <div className="lg:sticky lg:top-28 flex flex-col gap-6">
                {/* Response time */}
                <div className="border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-5">
                    What to Expect
                  </p>
                  <ul className="flex flex-col gap-4">
                    {[
                      { label: "Response time", value: "2–3 business days" },
                      {
                        label: "Enlistment process",
                        value: "Application → Interview → 90-day probation",
                      },
                      {
                        label: "Urgent matters",
                        value: "Contact your nearest chapter directly",
                      },
                    ].map(({ label, value }) => (
                      <li key={label}>
                        <p className="text-white/25 text-xs font-['Barlow_Condensed'] tracking-wider uppercase mb-1">
                          {label}
                        </p>
                        <p className="text-white/60 text-sm font-['Barlow'] font-300 leading-relaxed">
                          {value}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* HQ contact */}
                <div className="border border-[#c9a84c]/20 bg-[#c9a84c]/[0.03] p-6 relative">
                  {[
                    "top-0 left-0 border-t-2 border-l-2",
                    "top-0 right-0 border-t-2 border-r-2",
                    "bottom-0 left-0 border-b-2 border-l-2",
                    "bottom-0 right-0 border-b-2 border-r-2",
                  ].map((cls, i) => (
                    <div
                      key={i}
                      className={`absolute w-4 h-4 border-[#c9a84c]/40 ${cls}`}
                    />
                  ))}
                  <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4">
                    National HQ
                  </p>
                  <p className="font-['Cormorant_Garamond'] text-white text-lg font-600 mb-1">
                    Atlanta, Georgia
                  </p>
                  <p className="text-white/40 text-sm font-['Barlow'] mb-4">
                    United States
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href="mailto:hq@ocs.org"
                      className="text-[#c9a84c]/70 hover:text-[#c9a84c] text-sm font-['Barlow'] transition-colors"
                    >
                      hq@ocs.org
                    </a>
                    <a
                      href="tel:+14040000000"
                      className="text-white/40 hover:text-white/70 text-sm font-['Barlow'] transition-colors"
                    >
                      +1 (404) 000-0000
                    </a>
                  </div>
                </div>

                {/* Quick links */}
                <div className="border border-white/10 bg-white/[0.02] p-6">
                  <p className="text-white/30 text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-4">
                    Quick Links
                  </p>
                  <ul className="flex flex-col gap-3">
                    {[
                      ["About OCS", "/about"],
                      ["Ranks & Structure", "/ranks"],
                      ["Rules & Regulations", "/rules"],
                      ["Upcoming Events", "/events"],
                    ].map(([label, href]) => (
                      <li key={href}>
                        <Link
                          href={href}
                          className="text-white/45 hover:text-[#c9a84c] text-sm font-['Barlow'] transition-colors flex items-center gap-2"
                        >
                          <span className="text-[#c9a84c]/30 text-xs">→</span>{" "}
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ── CHAPTER DIRECTORY ── */}
        <section
          ref={chaptersRef}
          className="px-6 pb-28 border-t border-white/10 pt-16"
        >
          <div className="max-w-6xl mx-auto">
            <div
              className={`text-center mb-12 transition-all duration-700 ${chaptersInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] mb-4">
                Find Your Chapter
              </p>
              <h2 className="font-['Cormorant_Garamond'] text-white text-4xl font-600">
                Chapter Directory
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((ch, i) => (
                <div
                  key={ch.name}
                  className={`border border-white/10 bg-white/[0.02] hover:border-white/20 p-6 transition-all duration-500 ${
                    chaptersInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <p className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-['Barlow_Condensed'] mb-1">
                    {ch.name}
                  </p>
                  <p className="font-['Cormorant_Garamond'] text-white text-xl font-600 mb-4">
                    {ch.city}
                  </p>
                  <div className="flex flex-col gap-2">
                    <a
                      href={`mailto:${ch.email}`}
                      className="text-white/45 hover:text-[#c9a84c] text-sm font-['Barlow'] transition-colors"
                    >
                      {ch.email}
                    </a>
                    <a
                      href={`tel:${ch.phone.replace(/\s/g, "")}`}
                      className="text-white/30 hover:text-white/60 text-sm font-['Barlow'] transition-colors"
                    >
                      {ch.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SCRIPTURE CLOSE ── */}
        <section className="py-20 px-6 relative overflow-hidden border-t border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_100%_at_50%_50%,rgba(201,168,76,0.04),transparent)]" />
          <div className="relative max-w-2xl mx-auto text-center">
            <blockquote className="font-['Cormorant_Garamond'] text-white/75 text-2xl md:text-3xl italic leading-snug mb-6">
              &quot;Ask and it will be given to you; seek and you will find;
              knock and the door will be opened to you.&quot;
            </blockquote>
            <cite className="text-[#c9a84c]/60 text-xs tracking-[0.3em] uppercase font-['Barlow_Condensed'] not-italic">
              Matthew 7:7
            </cite>
          </div>
        </section>
      </div>
    </>
  );
}
