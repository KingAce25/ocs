"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "../../public/new.png";
import { NAV_LINKS, getNavLinks } from "../lib/navigation";

/**
 * BACKEND INTEGRATION POINT
 * ─────────────────────────
 * Right now this returns static data. When the backend is ready,
 * replace the body of this function with a real fetch, e.g.:
 *
 *   async function getNavLinks() {
 *     const res = await fetch("/api/navigation", { next: { revalidate: 300 } });
 *     if (!res.ok) throw new Error(`Navigation fetch failed: ${res.status}`);
 *     const data = await res.json();
 *     return data.links;
 *   }
 *
 * No other part of this component needs to change — `useNavLinks()`
 * already handles loading state, errors, and fallback data.
 */

function useNavLinks() {
  const [links, setLinks] = useState(NAV_LINKS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadLinks() {
      try {
        const data = await getNavLinks();
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setLinks(data);
        }
      } catch (err) {
        // Falls back to static NAV_LINKS — nav stays usable either way
        console.error("Failed to load navigation links:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadLinks();
    return () => {
      cancelled = true;
    };
  }, []);

  return { links, loading };
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const pathname = usePathname();
  const { links: navLinks } = useNavLinks();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), []);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <nav
      ref={menuRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0f1e]/95 backdrop-blur-md shadow-lg shadow-black/30 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full border-0.5 flex items-center justify-center overflow-hidden">
            <Image src={Logo} alt="Onward Christian Soldiers logo" priority />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-serif text-base tracking-wide">
              Onward Christian
            </span>
            <span className="text-[#c9a84c] font-serif text-base tracking-widest">
              Soldiers
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-[#c9a84c]"
                    : "text-white/70 hover:text-[#c9a84c]"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile menu toggle */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            className={`block w-6 h-0.5 bg-[#c9a84c] transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#c9a84c] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-6 h-0.5 bg-[#c9a84c] transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="bg-[#0a0f1e]/98 px-6 py-4 flex flex-col gap-4 border-t border-white/10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 block py-1 ${
                  isActive(link.href)
                    ? "text-[#c9a84c]"
                    : "text-white/70 hover:text-[#c9a84c]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
