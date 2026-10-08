"use client";

import { useRef, useState } from "react";

export type WindowState<T> = {
  id: string;
  data: T;
  minimized: boolean;
};

export function useWindows<T>() {
  const [windows, setWindows] = useState<WindowState<T>[]>([]);
  const [zOrder, setZOrder] = useState<Record<string, number>>({});
  const seq = useRef(0);

  const focus = (id: string) => {
    seq.current += 1;
    const next = seq.current;
    setZOrder((order) => ({ ...order, [id]: next }));
  };

  const open = (id: string, data: T) => {
    setWindows((ws) =>
      ws.some((w) => w.id === id)
        ? ws.map((w) => (w.id === id ? { ...w, minimized: false } : w))
        : [...ws, { id, data, minimized: false }],
    );
    focus(id);
  };

  const minimize = (id: string) =>
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
    );

  const restore = (id: string) => {
    setWindows((ws) =>
      ws.map((w) => (w.id === id ? { ...w, minimized: false } : w)),
    );
    focus(id);
  };

  const close = (id: string) =>
    setWindows((ws) => ws.filter((w) => w.id !== id));

  const closeAll = () => setWindows([]);

  return { windows, zOrder, open, focus, minimize, restore, close, closeAll };
}
