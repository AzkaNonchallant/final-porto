"use client";

import { useEffect } from "react";
import { motion, useDragControls } from "framer-motion";
import { Minus, X } from "lucide-react";

type DraggableWindowProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onActivate?: () => void;
  zIndex?: number;
  offset?: { x: number; y: number };
  width?: string;
};

export default function DraggableWindow({
  title,
  children,
  onClose,
  onMinimize,
  onActivate,
  zIndex = 50,
  offset = { x: 0, y: 0 },
  width = "min(92vw, 720px)",
}: DraggableWindowProps) {
  const dragControls = useDragControls();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="pointer-events-none fixed -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `calc(50% + ${offset.x}px)`,
        top: `calc(50% + ${offset.y}px)`,
        zIndex,
      }}
      onPointerDownCapture={onActivate}
    >
      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="pointer-events-auto max-w-[calc(100vw-1.5rem)]"
        style={{ width }}
      >
        <div className="overflow-hidden rounded-[max(0.75rem,1.2cqw)] border-[0.35rem] border-neutral-900 bg-neutral-100 shadow-[1rem_1rem_0_0_rgba(0,0,0,0.45)]">
          {/* title bar (drag handle) */}
          <div
            onPointerDown={(e) => dragControls.start(e)}
            onDoubleClick={onMinimize}
            className="flex cursor-grab items-center gap-2 border-b-[0.35rem] border-neutral-900 bg-[#6f84ff] px-3 py-2.5 sm:gap-3 sm:px-4 sm:py-3 text-neutral-900 active:cursor-grabbing"
          >
            <span className="flex gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </span>

            <span className="flex-1 truncate text-center font-mono text-xs font-bold uppercase tracking-[0.1em] sm:text-sm sm:tracking-[0.12em]">
              {title}
            </span>

            <button
              type="button"
              aria-label="Perkecil"
              onClick={onMinimize}
              className="grid size-7 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-white"
            >
              <Minus className="size-4" strokeWidth={3} />
            </button>
            <button
              type="button"
              aria-label="Tutup"
              onClick={onClose}
              className="grid size-7 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-[#ff5f57]"
            >
              <X className="size-4" strokeWidth={3} />
            </button>
          </div>

          {/* isi window */}
          <div className="max-h-[min(62vh,32rem)] overflow-y-auto p-4 sm:p-5">
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function MinimizedWindow({
  title,
  onRestore,
  onClose,
}: {
  title: string;
  onRestore: () => void;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 340, damping: 26 }}
      className="relative"
    >
      <div className="flex items-center gap-3 rounded-xl border-[0.3rem] border-neutral-900 bg-[#6f84ff] px-4 py-2 shadow-[0.5rem_0.5rem_0_0_rgba(0,0,0,0.45)]">
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-neutral-900">
          {title}
        </span>
        <button
          type="button"
          onClick={onRestore}
          className="rounded-md border-2 border-neutral-900 bg-white/80 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-neutral-900 transition hover:bg-white"
        >
          Restore
        </button>
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="grid size-6 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-[#ff5f57]"
        >
          <X className="size-3.5" strokeWidth={3} />
        </button>
      </div>
    </motion.div>
  );
}
