import React from "react";

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const base = (strokeWidth = 2.5) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/* ── Brand ── */
export function VexLogo({ size = 48, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* bolt */}
      <polygon points="26,4 16,26 22,26 18,44 32,22 26,22 30,4" fill="currentColor" />
    </svg>
  );
}

export function VexWordmark({ height = 40, className = "" }: { height?: number; className?: string }) {
  const ratio = 3.2;
  return (
    <svg height={height} width={height * ratio} viewBox="0 0 128 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Lightning bolt */}
      <polygon points="20,2 12,20 17,20 13,38 24,18 19,18 22,2" fill="currentColor" />
      {/* V */}
      <polyline points="32,4 40,30 48,4" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Ξ (three lines) */}
      <line x1="56" y1="8"  x2="70" y2="8"  stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="54" y1="19" x2="72" y2="19" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="56" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      {/* X */}
      <line x1="80" y1="4"  x2="96" y2="30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="96" y1="4"  x2="80" y2="30" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Navigation ── */
export function HomeIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

export function CardIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
      <line x1="6" y1="15" x2="9" y2="15" />
      <line x1="12" y1="15" x2="16" y2="15" />
    </svg>
  );
}

export function CartIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function GameIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <rect x="2" y="6" width="20" height="12" rx="5" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="12" y1="9" x2="12" y2="15" />
      <circle cx="17" cy="11" r="1" fill="currentColor" stroke="none" />
      <circle cx="17" cy="13" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HistoryIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function UserIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function LogOutIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function MenuIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}

export function CloseIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function LightningIcon({ size = 24, className = "", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <polygon points="13,2 6,14 11,14 10,22 18,10 13,10 15,2" />
    </svg>
  );
}

/* ── Actions ── */
export function ArrowLeftIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function SparklesIcon({ size = 24, className = "", strokeWidth = 2 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="currentColor">
      <polygon points="12,2 13.5,8 20,9.5 13.5,11 12,17 10.5,11 4,9.5 10.5,8" />
      <polygon points="19,14 19.8,17 23,17.8 19.8,18.6 19,22 18.2,18.6 15,17.8 18.2,17" />
      <polygon points="5,3 5.6,5.4 8,6 5.6,6.6 5,9 4.4,6.6 2,6 4.4,5.4" />
    </svg>
  );
}

export function ShuffleIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <polyline points="16 3 21 3 21 8" />
      <line x1="4" y1="20" x2="21" y2="3" />
      <polyline points="21 16 21 21 16 21" />
      <line x1="15" y1="15" x2="21" y2="21" />
      <line x1="4" y1="4" x2="9" y2="9" />
    </svg>
  );
}

export function ShieldIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

export function ActivityIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}

export function TargetIcon({ size = 24, className = "", strokeWidth = 2.5 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} {...base(strokeWidth)}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function LoaderIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className={`animate-spin ${className}`}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export function ZapFillIcon({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <polygon points="13,2 6,14 11,14 10,22 18,10 13,10 15,2" />
    </svg>
  );
}
