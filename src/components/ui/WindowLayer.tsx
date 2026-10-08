"use client";

import type { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import DraggableWindow, { MinimizedWindow } from "@/components/ui/DraggableWindow";

export type LayerWindow = {
  id: string;
  title: string;
  content: ReactNode;
  minimized: boolean;
};

type WindowLayerProps = {
  windows: LayerWindow[];
  zOrder: Record<string, number>;
  onFocus: (id: string) => void;
  onMinimize: (id: string) => void;
  onRestore: (id: string) => void;
  onClose: (id: string) => void;
  onCloseAll: () => void;
};

export default function WindowLayer({
  windows,
  zOrder,
  onFocus,
  onMinimize,
  onRestore,
  onClose,
  onCloseAll,
}: WindowLayerProps) {
  if (windows.length === 0) return null;

  const visible = windows.filter((w) => !w.minimized);
  const indexOf = (id: string) => windows.findIndex((w) => w.id === id);

  return (
    <>
      {/* overlay tunggal di bawah semua window */}
      <button
        type="button"
        aria-label="Tutup semua window"
        onClick={onCloseAll}
        className="fixed inset-0 z-40 cursor-default bg-neutral-900/60 backdrop-blur-[2px]"
      />

      <AnimatePresence>
        {visible.map((w) => (
          <DraggableWindow
            key={w.id}
            title={w.title}
            zIndex={50 + (zOrder[w.id] ?? 0)}
            offset={{ x: (indexOf(w.id) % 3) * 28, y: (indexOf(w.id) % 3) * 24 }}
            onActivate={() => onFocus(w.id)}
            onClose={() => onClose(w.id)}
            onMinimize={() => onMinimize(w.id)}
          >
            {w.content}
          </DraggableWindow>
        ))}
      </AnimatePresence>

      {/* taskbar: window yang diminimize */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex justify-center px-4 pb-4">
        <div className="pointer-events-auto flex max-w-full flex-wrap items-center justify-center gap-2">
          <AnimatePresence>
            {windows
              .filter((w) => w.minimized)
              .map((w) => (
                <MinimizedWindow
                  key={w.id}
                  title={w.title}
                  onRestore={() => onRestore(w.id)}
                  onClose={() => onClose(w.id)}
                />
              ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
