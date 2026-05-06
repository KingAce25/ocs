import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/new.png";

export default function Footer() {
  return (
    <footer className="bg-[#060a14] border-t border-white/10 text-white/60">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full border-0.5 flex items-center justify-center overflow-hidden">
                <Image src={Logo} alt="" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-serif text-sm">
                  Onward Christian Soldiers
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              Standing firm in faith, discipline, and service. A brotherhood
              built on Scripture and honour.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-semibold mb-5">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                ["About Us", "/about"],
                ["Ranks & Structure", "/ranks"],
                ["Rules & Regulations", "/rules"],
                ["Blog", "/blog"],
                ["Events", "/events"],
                ["Gallery", "/gallery"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors duration-200"
                  >
                    {label}
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
                &quot;Put on the full armor of God, so that you can take your
                stand against the devil&apos;s schemes.&quot;
              </p>
              <cite className="text-xs text-[#c9a84c]/70 not-italic tracking-wider">
                Ephesians 6:11
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
            Built with faith &amp; purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
