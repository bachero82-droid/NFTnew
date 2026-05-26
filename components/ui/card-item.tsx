import React, { useRef, useState } from "react";
import { Card as CardType } from "@workspace/api-client-react";
import { CardPattern } from "@/lib/card-pattern";

interface CardItemProps {
  card: CardType;
  onClick?: () => void;
  className?: string;
  showDetails?: boolean;
}

const rarityColors = {
  common:    "text-gray-600 border-gray-400 bg-gray-100",
  rare:      "text-cyan-700 border-cyan-500 bg-cyan-100",
  epic:      "text-purple-700 border-purple-500 bg-purple-100",
  legendary: "text-amber-700 border-amber-500 bg-yellow-100",
  mythic:    "text-rose-700 border-rose-500 bg-rose-100",
};

const rarityLabel: Record<string, string> = {
  common:    "ОБЫЧНАЯ",
  rare:      "РЕДКАЯ",
  epic:      "ЭПИЧЕСКАЯ",
  legendary: "ЛЕГЕНДАРНАЯ",
  mythic:    "МИФИЧЕСКАЯ",
};

export function CardItem({ card, onClick, className = "", showDetails = true }: CardItemProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate]   = useState({ x: 0, y: 0 });
  const [glare,  setGlare]    = useState({ x: 50, y: 50, opacity: 0 });
  const [showCvv, setShowCvv] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -14;
    const rotateY = ((x - rect.width  / 2) / rect.width)  *  14;
    setRotate({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ ...glare, opacity: 0 });
  };

  const formatCardNumber = (num: string) =>
    num?.replace(/(\d{4})/g, "$1 ").trim() || "XXXX XXXX XXXX XXXX";

  const seed = card.nftId || card.cardNumber || String(card.id);
  const rarityKey = card.rarity as keyof typeof rarityColors;

  return (
    <div
      className={`relative group perspective-1000 ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          w-full aspect-[1.586/1] rounded-3xl overflow-hidden relative
          transition-transform duration-200 ease-out
          border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
          ${card.isPrimary ? "ring-4 ring-primary ring-offset-4 ring-offset-white" : ""}
        `}
        style={{ transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)` }}
      >
        {/* Generated pattern background */}
        <CardPattern seed={seed} rarity={card.rarity} />

        {/* Glare overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.7) 0%, transparent 55%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Card content */}
        <div className="absolute inset-0 z-10 p-5 flex flex-col justify-between">

          {/* Top row: logo + rarity badge */}
          <div className="flex justify-between items-start">
            <div className="font-display font-black text-2xl tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              VΞX
            </div>
            <div className={`text-[10px] px-2.5 py-0.5 rounded-full uppercase font-black tracking-wider border-2 border-black rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${rarityColors[rarityKey] ?? rarityColors.common}`}>
              {rarityLabel[card.rarity] ?? card.rarity}
            </div>
          </div>

          {/* Middle: chip + card number */}
          <div className="flex flex-col gap-2">
            {/* Chip icon */}
            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" className="drop-shadow-md">
              <rect width="36" height="28" rx="5" fill="#d4a843" opacity="0.95"/>
              <rect x="5" y="5" width="26" height="18" rx="3" fill="none" stroke="#b8860b" stroke-width="1"/>
              <line x1="18" y1="5" x2="18" y2="23" stroke="#b8860b" stroke-width="0.8"/>
              <line x1="5" y1="14" x2="31" y2="14" stroke="#b8860b" stroke-width="0.8"/>
              <line x1="5" y1="9" x2="31" y2="9" stroke="#b8860b" stroke-width="0.5" opacity="0.6"/>
              <line x1="5" y1="19" x2="31" y2="19" stroke="#b8860b" stroke-width="0.5" opacity="0.6"/>
            </svg>

            <div className="font-mono text-base font-bold tracking-[0.12em] text-white bg-black/45 inline-block px-3 py-1 rounded-lg border border-white/20 drop-shadow w-fit">
              {formatCardNumber(card.cardNumber)}
            </div>
          </div>

          {/* Bottom row: owner + CVV + NFT */}
          {showDetails ? (
            <div className="flex justify-between items-end gap-2 bg-black/35 px-3 py-2 rounded-xl border border-white/10 backdrop-blur-sm">
              {/* Owner */}
              <div className="min-w-0">
                <div className="text-[9px] text-white/55 font-bold tracking-wider uppercase">Владелец</div>
                <div className="font-black text-xs tracking-wider uppercase text-white truncate max-w-[100px]">
                  {card.ownerUsername}
                </div>
              </div>

              {/* CVV */}
              <div className="text-center">
                <div className="text-[9px] text-white/55 font-bold tracking-wider uppercase">CVV</div>
                <button
                  className="font-mono font-black text-sm text-white bg-black/50 px-2 py-0.5 rounded border border-white/25 hover:bg-white/20 transition-colors select-none"
                  onClick={e => { e.stopPropagation(); setShowCvv(v => !v); }}
                  title={showCvv ? "Скрыть CVV" : "Показать CVV"}
                >
                  {showCvv ? card.cvv : "•••"}
                </button>
              </div>

              {/* NFT ID */}
              <div className="text-right">
                <div className="text-[9px] text-white/55 font-bold tracking-wider uppercase">NFT ID</div>
                <div className="font-mono font-bold text-[10px] text-white bg-black/50 px-2 py-0.5 rounded border border-white/20">
                  #{card.nftId?.slice(0, 8)}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-end">
              <div className="text-center bg-black/40 px-2 py-1.5 rounded-xl border border-white/20">
                <div className="text-[9px] text-white/55 font-bold uppercase">CVV</div>
                <button
                  className="font-mono font-black text-sm text-white hover:text-yellow-300 transition-colors"
                  onClick={e => { e.stopPropagation(); setShowCvv(v => !v); }}
                >
                  {showCvv ? card.cvv : "•••"}
                </button>
              </div>
              <div className="text-right bg-black/40 p-2 rounded-xl border-2 border-white/20 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                <div className="text-[9px] text-white/55 font-bold tracking-wider">NFT ID</div>
                <div className="font-mono font-black text-xs text-white">#{card.nftId?.slice(0, 8)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
