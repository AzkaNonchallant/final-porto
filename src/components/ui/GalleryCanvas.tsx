"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minus, Plus, X } from "lucide-react";

type Tile = {
  src: string;
  alt: string;
  span: string;
  pos?: string; // crop berbeda biar foto yang sama nggak kelihatan kembar
  filter?: string;
};

const tiles: Tile[] = [
  {
    src: "/chinatsu.jpg",
    alt: "Ilustrasi 1",
    span: "col-span-2 row-span-2",
    pos: "center",
  },
  {
    src: "/oc.jpg",
    alt: "Ilustrasi 2",
    span: "col-span-2 row-span-1",
    pos: "top",
  },
  {
    src: "/texture.jpg",
    alt: "Ilustrasi 3",
    span: "col-span-1 row-span-1",
    pos: "center",
  },
  {
    src: "/vid.png",
    alt: "Ilustrasi 4",
    span: "col-span-2 row-span-2",
    pos: "center",
  },
  {
    src: "/azkayow.png",
    alt: "Ilustrasi 5",
    span: "col-span-2 row-span-1",
    pos: "bottom",
  },
  {
    src: "/chinatsu.jpg",
    alt: "Ilustrasi 6",
    span: "col-span-1 row-span-1",
    pos: "left",
    filter: "saturate-50",
  },
  {
    src: "/oc.jpg",
    alt: "Ilustrasi 7",
    span: "col-span-2 row-span-2",
    pos: "bottom",
  },
  {
    src: "/texture.jpg",
    alt: "Ilustrasi 8",
    span: "col-span-1 row-span-1",
    pos: "right",
    filter: "hue-rotate-15",
  },
  {
    src: "/vid.png",
    alt: "Ilustrasi 9",
    span: "col-span-2 row-span-1",
    pos: "top",
  },
  {
    src: "/azkayow.png",
    alt: "Ilustrasi 10",
    span: "col-span-2 row-span-2",
    pos: "top",
    filter: "contrast-110",
  },
  {
    src: "/chinatsu.jpg",
    alt: "Ilustrasi 11",
    span: "col-span-1 row-span-1",
    pos: "bottom",
    filter: "grayscale",
  },
  {
    src: "/oc.jpg",
    alt: "Ilustrasi 12",
    span: "col-span-2 row-span-1",
    pos: "center",
    filter: "brightness-110",
  },
];

export default function GalleryCanvas({ onClose }: { onClose: () => void }) {
  const viewport = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [lightbox, setLightbox] = useState<Tile | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightbox) setLightbox(null);
        else onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, lightbox]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex flex-col bg-neutral-900"
    >
      {/* toolbar */}
      <header className="flex shrink-0 items-center gap-3 border-b-4 border-neutral-950 bg-[#6f84ff] px-3 py-2.5 text-neutral-900 sm:px-4">
        <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] sm:text-sm">
          Gallery — drag ke mana aja
        </span>

        <div className="flex-1" />

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Perkecil"
            onClick={() =>
              setZoom((z) => Math.max(0.5, Number((z - 0.25).toFixed(2))))
            }
            className="grid size-8 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-white"
          >
            <Minus className="size-4" strokeWidth={3} />
          </button>
          <span className="w-12 text-center font-mono text-xs font-bold tabular-nums">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Perbesar"
            onClick={() =>
              setZoom((z) => Math.min(2, Number((z + 0.25).toFixed(2))))
            }
            className="grid size-8 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-white"
          >
            <Plus className="size-4" strokeWidth={3} />
          </button>
        </div>

        <button
          type="button"
          aria-label="Tutup galeri"
          onClick={onClose}
          className="grid size-8 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-[#ff5f57]"
        >
          <X className="size-4" strokeWidth={3} />
        </button>
      </header>

      {/* canvas yang bisa di-drag ke 4 arah */}
      <div ref={viewport} className="relative flex-1 overflow-hidden">
        <motion.div
          drag
          dragConstraints={viewport}
          dragElastic={0.12}
          dragMomentum
          className="absolute left-0 top-0 grid w-[1600px] auto-rows-[180px] grid-cols-4 gap-4 p-6 will-change-transform sm:auto-rows-[220px] sm:grid-cols-6"
          style={{ scale: zoom }}
        >
          {tiles.map((tile, i) => (
            <motion.button
              key={`${tile.src}-${i}`}
              type="button"
              onClick={() => setLightbox(tile)}
              whileHover={{ y: -6 }}
              className={`group relative overflow-hidden rounded-xl border-4 border-neutral-950 shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] ${tile.span}`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(min-width: 640px) 30vw, 80vw"
                style={{ objectPosition: tile.pos ?? "center" }}
                className={`object-cover transition-transform duration-300 group-hover:scale-105 ${tile.filter ?? ""}`}
              />
              <span className="absolute right-2 top-2 grid size-7 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 opacity-0 transition group-hover:opacity-100">
                <Maximize2 className="size-3.5" strokeWidth={3} />
              </span>
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            className="absolute inset-0 z-[90] grid place-items-center bg-neutral-950/80 p-6 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.94 }}
              className="relative h-full w-full max-w-4xl overflow-hidden rounded-2xl border-4 border-neutral-950"
            >
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
