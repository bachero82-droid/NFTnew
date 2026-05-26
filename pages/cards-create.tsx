import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCreateCard } from "@workspace/api-client-react";
import { CardItem } from "@/components/ui/card-item";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, LoaderIcon, SparklesIcon, ShuffleIcon } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

export default function CardsCreate() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const createMutation = useCreateCard();

  const [theme, setTheme] = useState("cyber");
  const [previewSeed, setPreviewSeed] = useState(() => Math.random().toString(36).slice(2, 10));

  const previewCard = {
    id: 0,
    ownerId: 0,
    ownerUsername: "YOU",
    cardNumber: "4242 4242 4242 4242",
    cvv: "000",
    rarity: "common" as any,
    nftId: previewSeed,
    mediaUrl: null,
    mediaType: null,
    cardTheme: theme,
    isPrimary: false,
    createdAt: new Date().toISOString(),
  };

  const handleCreate = () => {
    createMutation.mutate(
      { data: { cardTheme: theme } },
      {
        onSuccess: () => {
          toast({ title: "Успех", description: "Карта создана и добавлена в коллекцию" });
          setLocation("/cards");
        },
        onError: (err: any) => {
          toast({ variant: "destructive", title: "Ошибка", description: err.message });
        },
      }
    );
  };

  const themes = [
    { id: "cyber",  color: "bg-cyan-300",              label: "CYBER"  },
    { id: "void",   color: "bg-gray-800 text-white",   label: "VOID"   },
    { id: "neon",   color: "bg-fuchsia-300",            label: "NEON"   },
    { id: "matrix", color: "bg-emerald-300",            label: "MATRIX" },
    { id: "blood",  color: "bg-red-400",                label: "BLOOD"  },
    { id: "gold",   color: "bg-yellow-400",             label: "GOLD"   },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end gap-6 border-b-4 border-black pb-6">
        <Link href="/cards">
          <button className="w-14 h-14 bg-white border-4 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform active:translate-y-0 active:shadow-none">
            <ArrowLeftIcon size={28} />
          </button>
        </Link>
        <div>
          <h1 className="text-5xl md:text-6xl font-black font-display tracking-tighter text-black uppercase drop-shadow-[2px_2px_0px_rgba(255,210,0,0.5)]">
            СОЗДАТЬ КАРТУ
          </h1>
          <p className="text-xl font-bold uppercase mt-2 bg-emerald-300 inline-block px-3 py-1 border-2 border-black rotate-[-1deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black">
            УНИКАЛЬНЫЙ ПРОЦЕДУРНЫЙ УЗОР
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Controls */}
        <div className="space-y-8">
          <div className="hype-panel p-8 bg-white space-y-10">
            <div>
              <h3 className="hype-badge bg-blue-300 text-black inline-block mb-6 rotate-2">ВЫБЕРИ ТЕМУ</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`
                      py-4 px-2 rounded-xl text-sm font-black tracking-widest uppercase transition-all border-4 border-black
                      ${theme === t.id
                        ? `${t.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-y-1 scale-105`
                        : "bg-white text-black hover:bg-gray-100"
                      }
                    `}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-yellow-100 border-4 border-black rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-3">
                <SparklesIcon size={28} className="text-yellow-600 shrink-0" />
                <div>
                  <p className="font-black uppercase text-sm text-black">ПРОЦЕДУРНЫЙ ВИЗУАЛ</p>
                  <p className="text-xs font-bold text-black/60 mt-1">
                    Узор генерируется из NFT ID — каждая карта уникальна. Чем выше редкость — тем сочнее паттерн.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPreviewSeed(Math.random().toString(36).slice(2, 10))}
                className="w-full py-3 bg-white border-2 border-black rounded-xl font-black uppercase text-sm flex items-center justify-center gap-2 hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all"
              >
                <ShuffleIcon size={16} /> РОЛЛ ПРЕВЬЮ
              </button>
            </div>
          </div>

          <button
            className="hype-button w-full h-20 text-2xl flex items-center justify-center gap-4 bg-primary"
            onClick={handleCreate}
            disabled={createMutation.isPending}
          >
            {createMutation.isPending
              ? <LoaderIcon size={32} />
              : <><SparklesIcon size={32} /> СГЕНЕРИРОВАТЬ NFT</>}
          </button>
        </div>

        {/* Live preview */}
        <div className="flex flex-col">
          <div className="flex items-center justify-center mb-6">
            <h3 className="hype-badge bg-yellow-300 text-black rotate-[-3deg] text-xl px-6 py-2">LIVE ПРЕВЬЮ</h3>
          </div>
          <div className="flex-1 hype-panel bg-gradient-to-br from-gray-100 to-gray-300 rounded-3xl p-10 flex flex-col items-center justify-center border-4 border-black">
            <div className="w-full max-w-sm transform transition-all duration-500 hover:scale-105">
              <CardItem card={previewCard} />
            </div>
            <div className="mt-8 bg-white border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-w-md w-full">
              <p className="text-center text-sm font-bold uppercase tracking-wider text-black">
                🎲 РЕДКОСТЬ И УЗОР ОПРЕДЕЛЯЮТСЯ СЛУЧАЙНО ПРИ МИНТЕ
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
