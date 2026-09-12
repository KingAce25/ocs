"use client";
import { useEffect, useId, useState } from "react";

/* ────────────────────────────────────────────────────────────────
   OCS RANK INSIGNIA SYSTEM
   Building blocks: Chevron, Bar, Star, Eagle, Crossed Swords,
   Emblem (cross + book + figures + anchor), Wreath, "OCS" text.

   Every rank carries the "OCS" lockup. Pieces are laid out top →
   bottom to match real shoulder boards, but revealed in a
   narrative order: repeating pieces (chevrons/bars/stars) first,
   one at a time, then the primary symbol (eagle/star/emblem/
   wreath), then any secondary emblem, then the "OCS" text.
   All gold surfaces use a gradient + drop shadow for a raised,
   embroidered/embossed look rather than flat color.
   ──────────────────────────────────────────────────────────────── */

/* ---------- Shared 3D gold defs (gradient + bevel shadow) ---------- */

function GoldDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#fbe9b8" />
        <stop offset="35%" stopColor="#e2bd66" />
        <stop offset="65%" stopColor="#c9a84c" />
        <stop offset="100%" stopColor="#8a6a26" />
      </linearGradient>
      <filter id={`shadow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="1.4"
          stdDeviation="1.1"
          floodColor="#000000"
          floodOpacity="0.55"
        />
      </filter>
    </defs>
  );
}

function WhiteDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`grad-${id}`} x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="35%" stopColor="#e0e0e0" />
        <stop offset="65%" stopColor="#c0c0c0" />
        <stop offset="100%" stopColor="#a0a0a0" />
      </linearGradient>
      <filter id={`shadow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow
          dx="0"
          dy="1.4"
          stdDeviation="1.1"
          floodColor="#000000"
          floodOpacity="0.55"
        />
      </filter>
    </defs>
  );
}

function useGold() {
  const id = useId();
  return {
    id,
    fill: `url(#grad-${id})`,
    filter: `url(#shadow-${id})`,
    stroke: "#6e5420",
  };
}

function useWhite() {
  const id = useId();
  return {
    id,
    fill: `url(#grad-${id})`,
    filter: `url(#shadow-${id})`,
    stroke: "#6e6e6e",
  };
}

/* ---------- Individual symbol SVGs ---------- */

function Chevron({ size = 24 }) {
  const g = useWhite();
  return (
    <svg width={90} height={size * 1} viewBox="0 0 64 22" fill="none">
      <WhiteDefs id={g.id} />
      <path
        d="M3 19 L32 5 L61 19"
        stroke={g.fill}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={g.filter}
      />
      <path
        d="M3 19 L32 5 L61 19"
        stroke="#00000030"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(0,1.2)"
        fill="none"
      />
    </svg>
  );
}

function Bar({ size = 95 }) {
  const g = useWhite();
  return (
    <svg width={95} height={size * 0.82} viewBox="0 0 64 12" fill="none">
      <WhiteDefs id={g.id} />
      <rect
        x="1"
        y="1"
        width="80"
        height="25"
        rx="1.5"
        fill={g.fill}
        stroke={g.stroke}
        strokeWidth="0.5"
        filter={g.filter}
      />
      <rect x="2.5" y="2" width="59" height="2.5" rx="1" fill="#ffffff55" />
    </svg>
  );
}

function Star({ size = 25 }) {
  const g = useGold();
  return (
    <svg width={size} height={size * 1.0} viewBox="0 0 40 40" fill="none">
      <GoldDefs id={g.id} />
      <path
        d="M20 2 L24.7 14.6 L38 15.3 L27.5 23.6 L31.2 36.4 L20 28.8 L8.8 36.4 L12.5 23.6 L2 15.3 L15.3 14.6 Z"
        fill={g.fill}
        stroke={g.stroke}
        strokeWidth="0.6"
        filter={g.filter}
      />
      <path d="M20 5 L22.6 13.4 L20 20 L17.4 13.4 Z" fill="#ffffff40" />
    </svg>
  );
}

function Star2({ size = 25 }) {
  const g = useGold();
  return (
    <svg width={90} height={size * 2.0} viewBox="0 0 40 40" fill="none">
      <GoldDefs id={g.id} />
      <path
        d="M20 2 L24.7 14.6 L38 15.3 L27.5 23.6 L31.2 36.4 L20 28.8 L8.8 36.4 L12.5 23.6 L2 15.3 L15.3 14.6 Z"
        fill={g.fill}
        stroke={g.stroke}
        strokeWidth="0.6"
        filter={g.filter}
      />
      <path d="M20 5 L22.6 13.4 L20 20 L17.4 13.4 Z" fill="#ffffff40" />
    </svg>
  );
}

function Eagle({ size = 120 }) {
  const g = useGold();

  return (
    <svg
      width={95}
      height={size * 1.2}
      viewBox="0 0 240 165"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      overflow="visible"
    >
      <GoldDefs id={g.id} />

      <g filter={g.filter}>
        {/* =========================================================
            LEFT WING — LARGE PRIMARY FEATHERS
            ========================================================= */}

        <path
          d="
            M112 55
            C92 40 70 31 46 29
            L58 38
            C42 34 25 34 10 38
            L31 48
            C20 48 10 52 2 58
            L27 61
            C17 65 9 71 3 78
            L30 75
            C22 82 17 89 14 97
            L40 88
            C34 97 32 106 33 115
            L57 98
            C54 107 56 115 60 121
            L75 100
            C82 91 92 82 106 74
            L119 65
            Z
          "
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Left primary feather divisions */}

        <path
          d="M30 48 C51 50 75 56 105 65"
          stroke="#fff3c4"
          strokeOpacity="0.42"
          strokeWidth="2"
          fill="none"
        />

        <path
          d="M22 61 C47 61 75 64 103 68"
          stroke="#795a20"
          strokeOpacity="0.75"
          strokeWidth="2"
          fill="none"
        />

        <path
          d="M18 75 C44 71 72 69 101 69"
          stroke="#fff3c4"
          strokeOpacity="0.3"
          strokeWidth="1.8"
          fill="none"
        />

        <path
          d="M30 88 C52 78 76 72 99 69"
          stroke="#795a20"
          strokeOpacity="0.7"
          strokeWidth="2"
          fill="none"
        />

        <path
          d="M42 100 C59 86 78 76 98 69"
          stroke="#fff3c4"
          strokeOpacity="0.3"
          strokeWidth="1.7"
          fill="none"
        />

        <path
          d="M57 108 C68 91 83 78 98 68"
          stroke="#76571d"
          strokeOpacity="0.65"
          strokeWidth="1.8"
          fill="none"
        />

        {/* =========================================================
            RIGHT WING
            ========================================================= */}

        <path
          d="
            M128 55
            C148 40 170 31 194 29
            L182 38
            C198 34 215 34 230 38
            L209 48
            C220 48 230 52 238 58
            L213 61
            C223 65 231 71 237 78
            L210 75
            C218 82 223 89 226 97
            L200 88
            C206 97 208 106 207 115
            L183 98
            C186 107 184 115 180 121
            L165 100
            C158 91 148 82 134 74
            L121 65
            Z
          "
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Right primary feather divisions */}

        <path
          d="M210 48 C189 50 165 56 135 65"
          stroke="#fff3c4"
          strokeOpacity="0.42"
          strokeWidth="2"
          fill="none"
        />

        <path
          d="M218 61 C193 61 165 64 137 68"
          stroke="#795a20"
          strokeOpacity="0.75"
          strokeWidth="2"
          fill="none"
        />

        <path
          d="M222 75 C196 71 168 69 139 69"
          stroke="#fff3c4"
          strokeOpacity="0.3"
          strokeWidth="1.8"
          fill="none"
        />

        <path
          d="M210 88 C188 78 164 72 141 69"
          stroke="#795a20"
          strokeOpacity="0.7"
          strokeWidth="2"
          fill="none"
        />

        <path
          d="M198 100 C181 86 162 76 142 69"
          stroke="#fff3c4"
          strokeOpacity="0.3"
          strokeWidth="1.7"
          fill="none"
        />

        <path
          d="M183 108 C172 91 157 78 142 68"
          stroke="#76571d"
          strokeOpacity="0.65"
          strokeWidth="1.8"
          fill="none"
        />

        {/* =========================================================
            BODY
            ========================================================= */}

        <path
          d="
            M111 43
            C106 53 106 67 110 82
            C113 95 117 106 120 116
            L126 130
            L132 116
            C135 106 139 95 142 82
            C146 67 146 53 137 43
            C131 37 117 37 111 43
            Z
          "
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="1.2"
        />

        {/* Breast feather layers */}

        <path
          d="
            M112 59
            C120 65 129 65 138 59
          "
          stroke="#fff1b8"
          strokeOpacity="0.4"
          strokeWidth="1.8"
          fill="none"
        />

        <path
          d="
            M111 69
            C120 76 130 76 140 69
          "
          stroke="#806020"
          strokeOpacity="0.65"
          strokeWidth="1.8"
          fill="none"
        />

        <path
          d="
            M113 80
            C121 86 130 86 138 80
          "
          stroke="#fff1b8"
          strokeOpacity="0.32"
          strokeWidth="1.6"
          fill="none"
        />

        <path
          d="
            M116 91
            C122 97 129 97 135 91
          "
          stroke="#806020"
          strokeOpacity="0.65"
          strokeWidth="1.6"
          fill="none"
        />

        <path
          d="
            M119 102
            C123 107 128 107 132 102
          "
          stroke="#fff1b8"
          strokeOpacity="0.3"
          strokeWidth="1.5"
          fill="none"
        />

        {/* =========================================================
            HEAD
            ========================================================= */}

        <path
          d="
            M108 43
            C107 34 110 25 116 19
            C121 14 128 12 135 14
            C143 16 148 22 149 29
            C151 36 147 42 140 47
            L126 52
            L115 49
            Z
          "
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="1.2"
        />

        {/* Eagle crown feathers */}

        <path
          d="
            M113 27
            L108 18
            L118 23
            L119 13
            L126 21
            L132 11
            L134 21
            L143 16
            L139 27
          "
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="0.8"
          strokeLinejoin="round"
        />

        {/* =========================================================
            BEAK
            ========================================================= */}

        <path
          d="
            M146 27
            L168 33
            L146 41
            L138 36
            Z
          "
          fill={g.dark}
          stroke={g.stroke}
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Beak highlight */}

        <path
          d="
            M147 30
            L160 33
            L147 35
          "
          stroke="#fff4c9"
          strokeOpacity="0.6"
          strokeWidth="1.3"
          fill="none"
        />

        {/* Beak separation */}

        <path
          d="M145 36 L160 34"
          stroke="#5b4216"
          strokeWidth="1"
          opacity="0.8"
        />

        {/* =========================================================
            EYE
            ========================================================= */}

        <path
          d="
            M130 27
            C134 24 138 25 141 28
            C138 31 134 32 130 30
            Z
          "
          fill="#6d501a"
        />

        <circle cx="136" cy="28" r="2" fill="#17120a" />

        <circle cx="136.6" cy="27.4" r="0.7" fill="#fffbdc" />

        {/* =========================================================
            NECK / HEAD HIGHLIGHTS
            ========================================================= */}

        <path
          d="
            M118 22
            C113 29 114 39 122 45
          "
          stroke="#fff6cf"
          strokeOpacity="0.5"
          strokeWidth="2"
          fill="none"
        />

        <path
          d="
            M122 48
            C119 58 119 69 121 78
          "
          stroke="#fff5ca"
          strokeOpacity="0.25"
          strokeWidth="1.7"
          fill="none"
        />

        {/* =========================================================
            TAIL FEATHERS
            ========================================================= */}

        <path
          d="
            M111 106
            L119 115
            L110 143
            L122 132
            L126 151
            L131 132
            L143 143
            L134 115
            L141 106
            Z
          "
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="1"
          strokeLinejoin="round"
        />

        {/* Tail feather separation */}

        <path
          d="M119 116 L114 138"
          stroke="#fff3c5"
          strokeOpacity="0.45"
          strokeWidth="1.5"
        />

        <path
          d="M126 116 L126 145"
          stroke="#fff3c5"
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />

        <path
          d="M134 116 L138 138"
          stroke="#75551b"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />

        {/* =========================================================
            CENTER BODY HIGHLIGHT
            ========================================================= */}

        <path
          d="
            M119 50
            C122 58 123 72 123 88
            C123 101 124 111 126 119
          "
          stroke="#fff7d4"
          strokeOpacity="0.25"
          strokeWidth="1.5"
          fill="none"
        />
      </g>

      {/* ===========================================================
          WING TOP HIGHLIGHTS
          =========================================================== */}

      <path
        d="M14 38 C39 37 69 43 105 55"
        stroke="#fff8d9"
        strokeOpacity="0.32"
        strokeWidth="1.5"
        fill="none"
      />

      <path
        d="M226 38 C201 37 171 43 135 55"
        stroke="#fff8d9"
        strokeOpacity="0.32"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

function CrossedSwords({ size = 150 }) {
  const g = useGold();

  const Blade = () => (
    <g>
      <polygon
        points="30,2 34,2 37,44 27,44"
        fill={g.fill}
        stroke={g.stroke}
        strokeWidth="0.4"
      />

      <polygon points="30,2 32,2 32,44 27,44" fill="#ffffff40" opacity="0.5" />

      <rect
        x="22"
        y="44"
        width="16"
        height="6"
        rx="1"
        fill={g.fill}
        stroke={g.stroke}
        strokeWidth="0.4"
      />

      <rect
        x="27"
        y="49"
        width="6"
        height="14"
        rx="1.5"
        fill={g.fill}
        stroke={g.stroke}
        strokeWidth="0.4"
      />

      <polygon points="30,63 34,63 32,70" fill={g.fill} />
    </g>
  );

  return (
    <svg
      width={140}
      height={size}
      viewBox="0 0 60 70"
      fill="none"
      overflow="visible"
    >
      <GoldDefs id={g.id} />

      <g filter={g.filter}>
        <g transform="rotate(-40 30 35)">
          <Blade />
        </g>

        <g transform="rotate(40 30 35)">
          <Blade />
        </g>
      </g>
    </svg>
  );
}

/* Cross rising from an open book, flanked by two small robed
   winged figures, resting on an anchor with wrapped rope. */
function Emblem({ size = 54 }) {
  const g = useGold();
  return (
    <svg width={68} height={size * 1.7} viewBox="0 0 80 80" fill="none">
      <GoldDefs id={g.id} />
      <g filter={g.filter}>
        <rect x="37.5" y="28" width="5" height="34" fill={g.fill} />
        <circle
          cx="40"
          cy="22"
          r="6"
          stroke={g.fill}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M40 62 C 20 62, 12 52, 14 40 M40 62 C 60 62, 68 52, 66 40"
          stroke={g.fill}
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M32 34 C 40 30, 40 40, 48 36"
          stroke={g.fill}
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M18 40 C 27 35, 33 35, 40 39 C 47 35, 53 35, 62 40 L62 46 C 53 42, 47 42, 40 46 C 33 42, 27 42, 18 46 Z"
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="0.4"
        />
        <path
          d="M18 30 C 14 24, 16 18, 22 16 C 20 22, 20 27, 24 32 Z"
          fill={g.fill}
        />
        <path
          d="M62 30 C 66 24, 64 18, 58 16 C 60 22, 60 27, 56 32 Z"
          fill={g.fill}
        />
      </g>
      <rect x="37.5" y="10" width="5" height="30" fill="#d94b3a" rx="0.5" />
      <rect x="28" y="18" width="24" height="5" fill="#d94b3a" rx="0.5" />
      <rect x="38" y="10" width="1.6" height="30" fill="#ffffff50" />
    </svg>
  );
}

function Wreath({ size = 60 }) {
  const g = useGold();
  const leaves = (side) => {
    const items = [];
    for (let i = 0; i < 6; i++) {
      const t = i / 5;
      const angle = side === "l" ? 160 - t * 130 : 20 + t * 130;
      const r = 26;
      const rad = (angle * Math.PI) / 180;
      const cx = 30 + r * Math.cos(rad);
      const cy = 30 + r * Math.sin(rad) * -1 + 8;
      items.push(
        <ellipse
          key={side + i}
          cx={cx}
          cy={cy}
          rx="5"
          ry="2.6"
          fill={g.fill}
          stroke={g.stroke}
          strokeWidth="0.3"
          transform={`rotate(${side === "l" ? angle : -angle} ${cx} ${cy})`}
        />,
      );
    }
    return items;
  };
  return (
    <svg width={size} height={size * 0.7} viewBox="0 0 60 42" fill="none">
      <GoldDefs id={g.id} />
      <g filter={g.filter}>
        {leaves("l")}
        {leaves("r")}
      </g>
    </svg>
  );
}

function OCSText({ size = "base" }) {
  return (
    <span
      className={`font-['Barlow_Condensed'] tracking-[0.32em] font-700 ${
        size === "sm" ? "text-[14px]" : "text-[18px]"
      }`}
      style={{
        backgroundImage:
          "linear-gradient(180deg, #fbe9b8 0%, #e2bd66 35%, #c9a84c 65%, #8a6a26 100%)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter:
          "drop-shadow(0 1px 0.5px rgba(0,0,0,0.6)) drop-shadow(0 -0.5px 0 rgba(255,255,255,0.15))",
      }}
    >
      OCS
    </span>
  );
}

const SYMBOL = {
  chevron: Chevron,
  bar: Bar,
  star: Star,
  star2: Star2,
  eagle: Eagle,
  wreath: Wreath,
};

/* ---------- Config: every rank → insignia recipe ---------- */

export const INSIGNIA_MAP = {
  Constable: { repeated: { symbol: "chevron", count: 1 } },
  Corporal: { repeated: { symbol: "chevron", count: 2 } },
  Sergeant: { repeated: { symbol: "chevron", count: 3 } },

  "Junior Inspector": { repeated: { symbol: "bar", count: 1 } },
  "Full Inspector": { repeated: { symbol: "bar", count: 2 } },
  "Senior Inspector": { repeated: { symbol: "bar", count: 3 } },

  "Second Lieutenant": { repeated: { symbol: "star2", count: 1 } },
  Lieutenant: { repeated: { symbol: "star2", count: 2 } },
  Captain: { repeated: { symbol: "star2", count: 3 } },

  Major: { top: "eagle" },
  "Lieutenant Colonel": { top: "eagle", starsRow2: 1 },
  Colonel: { top: "eagle", starsRow2: 2 },
  "Brigadier General": { top: "eagle", starsRow2: 3 },
  "Major General": { top: "eagle", emblem: true },
  "One Star General": { top: "eagle", starsRow2: 1, emblem: true },
  "Two Star General": { top: "eagle", starsRow2: 2, emblem: true },
  "Three Star General": { top: "eagle", starsRow: 3, emblem: true },

  "Assistant Commander General": {
    top: "star",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
  "Deputy Commander General": {
    top: "eagle",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
  "Commander General": {
    stackedTop: "emblem",
    top: "star",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
  "Grand Commander": {
    stackedTop: "wreath",
    top: "eagle",
    swords: true,
    flankingStars: 2,
    emblem: true,
  },
};

/* ---------- Renderer ---------- */

function Piece({ order, revealed, children, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center transition-all duration-500 ease-out ${className}`}
      style={{
        transitionDelay: revealed ? `${order * 130}ms` : "0ms",
        opacity: revealed ? 1 : 0,
        transform: revealed
          ? "translateY(0) scale(1)"
          : "translateY(10px) scale(0.85)",
      }}
    >
      {children}
    </div>
  );
}

export default function RankInsignia({ rank, size = "lg" }) {
  const cfg = INSIGNIA_MAP[rank];
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setRevealed(false);
    const raf = requestAnimationFrame(() =>
      setTimeout(() => setRevealed(true), 30),
    );
    return () => cancelAnimationFrame(raf);
  }, [rank]);

  if (!cfg) return null;

  const symScale = size === "lg" ? 1 : 0.62;
  const s = (n) => Math.round(n * symScale);
  const minWidth = size === "lg" ? 150 : 96;
  const frameHeight = size === "lg" ? 320 : 200;

  let order = 0;
  const repeatedOrders = [];
  const groupCount =
    cfg.repeated?.count ??
    cfg.starsRow ??
    (cfg.flankingStars ? cfg.flankingStars : 0);
  for (let i = 0; i < groupCount; i++) repeatedOrders.push(order++);
  const swordsOrder = cfg.swords ? order++ : null;
  const topOrder = cfg.top ? order++ : null;
  const stackedTopOrder = cfg.stackedTop ? order++ : null;
  const emblemOrder = cfg.emblem ? order++ : null;
  const textOrder = order++; // every rank carries the OCS lockup

  return (
    <div
      className="relative flex flex-col items-center justify-center gap-2 mx-auto py-6 px-5"
      style={{
        width: "fit-content",
        minWidth,
        height: frameHeight,
        background:
          "linear-gradient(155deg, rgba(255,255,255,0.05) 0%, rgba(201,168,76,0.04) 40%, rgba(0,0,0,0.15) 100%)",
        border: "2px solid transparent",
        borderImage: "linear-gradient(180deg, #f5dfa0, #c9a84c 45%, #6e5420) 1",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -6px 14px rgba(0,0,0,0.45), 0 8px 20px rgba(0,0,0,0.35)",
        clipPath: "polygon(50% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 60% at 50% 0%, rgba(255,255,255,0.10), transparent 60%)",
          clipPath: "polygon(50% 0%, 100% 15%, 100% 100%, 0% 100%, 0% 15%)",
        }}
      />

      {cfg.stackedTop && (
        <Piece order={stackedTopOrder} revealed={revealed}>
          {cfg.stackedTop === "emblem" ? (
            <Emblem size={s(46)} />
          ) : (
            <Wreath size={s(50)} />
          )}
        </Piece>
      )}

      {cfg.top && (
        <Piece order={topOrder} revealed={revealed}>
          {cfg.top === "star" ? <Star size={s(30)} /> : <Eagle size={s(60)} />}
        </Piece>
      )}

      {cfg.repeated && (
        <div className="flex flex-col items-center gap-1.5">
          {Array.from({ length: cfg.repeated.count }).map((_, i) => {
            const Sym = SYMBOL[cfg.repeated.symbol];
            const wide =
              cfg.repeated.symbol === "chevron" ||
              cfg.repeated.symbol === "bar";
            return (
              <Piece key={i} order={repeatedOrders[i]} revealed={revealed}>
                <Sym size={s(wide ? 54 : 32)} />
              </Piece>
            );
          })}
        </div>
      )}

      {cfg.starsRow > 0 && (
        <div className="flex flex-col items-center gap-1.5">
          {Array.from({ length: cfg.starsRow }).map((_, i) => (
            <Piece key={i} order={repeatedOrders[i]} revealed={revealed}>
              <Star size={s(24)} />
            </Piece>
          ))}
        </div>
      )}

      {cfg.starsRow2 > 0 && (
        <div className="flex flex-col items-center gap-1.5">
          {Array.from({ length: cfg.starsRow2 }).map((_, i) => (
            <Piece key={i} order={repeatedOrders[i]} revealed={revealed}>
              <Star2 size={s(24)} />
            </Piece>
          ))}
        </div>
      )}

      {cfg.swords && (
        <div className="relative w-full h-[100px] -my-2">
          {/* Left flanking star */}
          {cfg.flankingStars > 0 && (
            <Piece
              order={repeatedOrders[0]}
              revealed={revealed}
              className="absolute left-[-16px] top-1/2 -translate-y-1/2 z-40"
            >
              <Star size={s(38)} />
            </Piece>
          )}

          {/* Large crossed swords */}
          <Piece
            order={swordsOrder}
            revealed={revealed}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <CrossedSwords size={s(145)} />
          </Piece>

          {/* Right flanking star */}
          {cfg.flankingStars > 0 && (
            <Piece
              order={repeatedOrders[repeatedOrders.length - 1]}
              revealed={revealed}
              className="absolute right-[-16px] top-1/2 -translate-y-1/2 z-40"
            >
              <Star size={s(38)} />
            </Piece>
          )}
        </div>
      )}

      {cfg.emblem && (
        <Piece order={emblemOrder} revealed={revealed}>
          <Emblem size={s(44)} />
        </Piece>
      )}

      <Piece order={textOrder} revealed={revealed} className="mt-1">
        <OCSText size={size === "lg" ? "base" : "sm"} />
      </Piece>
    </div>
  );
}
