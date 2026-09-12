"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/new.png";
import { NAV_LINKS, getNavLinks } from "../lib/navigation";
import { SITE_SETTINGS, getSiteSettings } from "../lib/siteSettings";

/**
 * BACKEND INTEGRATION POINT
 * ─────────────────────────
 * Site-wide settings (brand blurb, scripture verse, copyright line) are
 * static for now. When the backend is ready, replace this with a real
 * fetch, e.g.:
 *
 *   async function getSiteSettings() {
 *     const res = await fetch("/api/site-settings", { next: { revalidate: 300 } });
 *     if (!res.ok) throw new Error(`Site settings fetch failed: ${res.status}`);
 *     return res.json();
 *   }
 */

export default function Footer() {
  const [navLinks, setNavLinks] = useState(NAV_LINKS);
  const [settings, setSettings] = useState(SITE_SETTINGS);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [links, siteSettings] = await Promise.all([
          getNavLinks(),
          getSiteSettings(),
        ]);
        if (!cancelled) {
          if (Array.isArray(links) && links.length > 0) setNavLinks(links);
          if (siteSettings) setSettings(siteSettings);
        }
      } catch (err) {
        // Falls back to static defaults above — footer stays usable either way
        console.error("Failed to load footer content:", err);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <footer className="bg-[#060a14] border-t border-white/10 text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border-0.5 flex items-center justify-center overflow-hidden">
                <Image src={Logo} alt="Onward Christian Soldiers logo" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-serif text-sm">
                  Onward Christian Soldiers
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              {settings.brandBlurb}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-semibold mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Scripture */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-semibold mb-5">
              Our Verse
            </h4>
            <blockquote className="border-l-2 border-[#c9a84c]/40 pl-4">
              <p className="text-sm leading-relaxed text-white/60 italic mb-2">
                &quot;{settings.verse.text}&quot;
              </p>
              <cite className="text-xs text-[#c9a84c]/70 not-italic tracking-wider">
                {settings.verse.citation}
              </cite>
            </blockquote>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 tracking-wider">
            © {new Date().getFullYear()} Onward Christian Soldiers. All rights
            reserved.
          </p>
          <p className="text-xs text-white/20 tracking-wider">
            {settings.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
