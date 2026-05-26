import React from "react";

import commonSvg   from "@/components/icons/patterns/common.svg";
import rareSvg     from "@/components/icons/patterns/rare.svg";
import epicSvg     from "@/components/icons/patterns/epic.svg";
import legendarySvg from "@/components/icons/patterns/legendary.svg";
import mythicSvg   from "@/components/icons/patterns/mythic.svg";

const RARITY_SVG: Record<string, string> = {
  common:    commonSvg,
  rare:      rareSvg,
  epic:      epicSvg,
  legendary: legendarySvg,
  mythic:    mythicSvg,
};

/* Seed → stable number 0-1 */
function seedVal(seed: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(h ^ seed.charCodeAt(i), 0x01000193)) >>> 0;
  }
  return h / 0xffffffff;
}

/* Hue-rotate range per rarity keeps the color family but adds variety */
const HUE_RANGE: Record<string, [number, number]> = {
  common:    [-35,  35],
  rare:      [-40,  40],
  epic:      [-30,  30],
  legendary: [-22,  22],
  mythic:    [-18,  18],
};

const SAT_RANGE: Record<string, [number, number]> = {
  common:    [0.85, 1.25],
  rare:      [0.9,  1.3],
  epic:      [0.9,  1.25],
  legendary: [0.9,  1.2],
  mythic:    [0.95, 1.2],
};

interface CardPatternProps {
  seed: string;
  rarity: string;
  className?: string;
}

export function CardPattern({ seed, rarity, className = "" }: CardPatternProps) {
  const safeRarity = rarity in RARITY_SVG ? rarity : "common";
  const svgUrl     = RARITY_SVG[safeRarity];
  const v          = seedVal(seed || "default");

  const [hMin, hMax] = HUE_RANGE[safeRarity];
  const [sMin, sMax] = SAT_RANGE[safeRarity];
  const hue = hMin + v * (hMax - hMin);
  const sat = sMin + v * (sMax - sMin);

  const brightness = 0.92 + v * 0.16; // 0.92 – 1.08

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={svgUrl}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          filter: `hue-rotate(${hue.toFixed(1)}deg) saturate(${sat.toFixed(2)}) brightness(${brightness.toFixed(2)})`,
        }}
        alt=""
        draggable={false}
      />
    </div>
  );
}

/* ─── Generated avatar (identicon) — unchanged ─── */
interface GeneratedAvatarProps {
  username: string;
  size?: number;
  className?: string;
}

function seedRng(seed: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(h ^ seed.charCodeAt(i), 16777619)) >>> 0;
  }
  let s = h || 1;
  return () => {
    s ^= s << 13; s ^= s >>> 17; s ^= s << 5; s >>>= 0;
    return s / 0x100000000;
  };
}

export function GeneratedAvatar({ username, size = 48, className = "" }: GeneratedAvatarProps) {
  const rnd = seedRng(username || "anon");
  const COLORS = ["#ff2d5a", "#00cc99", "#ffaa00", "#a855f7", "#22d3ee", "#fb923c"];
  const bg = COLORS[Math.floor(rnd() * COLORS.length)];
  const fg = COLORS[Math.floor(rnd() * COLORS.length)];

  const grid: boolean[] = [];
  for (let row = 0; row < 5; row++) {
    const c0 = rnd() > 0.45;
    const c1 = rnd() > 0.45;
    const c2 = rnd() > 0.45;
    grid.push(c0, c1, c2, c1, c0);
  }

  return (
    <svg width={size} height={size} viewBox="0 0 5 5" className={className} style={{ display: "block" }}>
      <rect width="5" height="5" fill={bg} />
      {grid.map((on, i) =>
        on ? <rect key={i} x={i % 5} y={Math.floor(i / 5)} width="1" height="1" fill={fg} /> : null
      )}
    </svg>
  );
}
