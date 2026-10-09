"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Maximize2, X } from "lucide-react";
import type { Certificate } from "@/lib/certificates";

function Lightbox({
  certs,
  index,
  onClose,
  onIndex,
}: {
  certs: Certificate[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const cert = certs[index];

  const go = useCallback(
    (dir: 1 | -1) => onIndex((index + dir + certs.length) % certs.length),
    [index, certs.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "ArrowRight" || e.key === "ArrowLeft") {
        // hentikan window supaya Escape gak ikut nutup window induk
        e.stopPropagation();
        e.preventDefault();
      }
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [go, onClose]);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex flex-col bg-neutral-950/92 backdrop-blur-sm"
      >
        {/* header */}
        <header className="flex shrink-0 items-center gap-3 border-b-4 border-neutral-950 bg-[#6f84ff] px-3 py-2.5 text-neutral-900 sm:px-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] opacity-70 sm:text-xs">
            Sertifikat
          </span>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate font-mono text-xs font-bold uppercase tracking-[0.08em] sm:text-sm">
              {cert.title}
            </p>
            <p className="truncate font-mono text-[10px] opacity-70">
              {cert.issuer} · {index + 1}/{certs.length}
            </p>
          </div>

          <a
            href={cert.src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buka sertifikat ukuran penuh"
            className="grid size-8 shrink-0 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-white"
          >
            <ExternalLink className="size-4" strokeWidth={3} />
          </a>

          <button
            type="button"
            aria-label="Tutup sertifikat"
            onClick={onClose}
            className="grid size-8 shrink-0 place-items-center rounded-md border-2 border-neutral-900 bg-white/80 transition hover:bg-[#ff5f57]"
          >
            <X className="size-4" strokeWidth={3} />
          </button>
        </header>

        {/* gambar + navigasi */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center p-3 sm:p-6">
          <button
            type="button"
            aria-label="Sertifikat sebelumnya"
            onClick={() => go(-1)}
            className="absolute left-2 z-10 grid size-10 place-items-center rounded-full border-4 border-neutral-950 bg-[#6f84ff] text-neutral-900 transition hover:scale-105 active:scale-95 sm:left-4 sm:size-12"
          >
            <ChevronLeft className="size-6" strokeWidth={3} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={cert.src}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative h-full w-full max-w-5xl"
            >
              <Image
                src={cert.src}
                alt={`Sertifikat ${cert.title} — ${cert.issuer}`}
                fill
                priority
                sizes="95vw"
                className="object-contain drop-shadow-[0_1rem_1.5rem_rgba(0,0,0,0.6)]"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            aria-label="Sertifikat berikutnya"
            onClick={() => go(1)}
            className="absolute right-2 z-10 grid size-10 place-items-center rounded-full border-4 border-neutral-950 bg-[#6f84ff] text-neutral-900 transition hover:scale-105 active:scale-95 sm:right-4 sm:size-12"
          >
            <ChevronRight className="size-6" strokeWidth={3} />
          </button>
        </div>

        {/* strip thumbnail */}
        <div className="shrink-0 overflow-x-auto border-t-4 border-neutral-950 bg-neutral-900 px-3 py-2.5">
          <div className="mx-auto flex w-max gap-2">
            {certs.map((c, i) => (
              <button
                key={c.src}
                type="button"
                onClick={() => onIndex(i)}
                aria-label={`Lihat ${c.title}`}
                aria-current={i === index}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition ${
                  i === index
                    ? "border-[#6f84ff] opacity-100"
                    : "border-neutral-700 opacity-55 hover:opacity-100"
                }`}
              >
                <Image src={c.src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export default function CertificateGallery({ certs }: { certs: Certificate[] }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col gap-3">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
          {certs.length} sertifikat — klik buat lihat ukuran penuh
        </p>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {certs.map((cert, i) => (
            <li key={cert.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border-2 border-neutral-900 bg-white text-left transition hover:-translate-y-0.5 hover:bg-[#f4f2ff]"
              >
                <span className="relative block aspect-[4/3] w-full overflow-hidden border-b-2 border-neutral-900 bg-neutral-100">
                  <Image
                    src={cert.src}
                    alt={`Sertifikat ${cert.title}`}
                    fill
                    sizes="(min-width: 640px) 45vw, 90vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span
                    className="absolute right-1.5 top-1.5 rounded-md border-2 border-neutral-900 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-white opacity-0 transition group-hover:opacity-100"
                    style={{ backgroundColor: cert.accent }}
                  >
                    <Maximize2 className="size-3" strokeWidth={3} />
                  </span>
                </span>

                <span className="flex flex-1 flex-col gap-1.5 p-3">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate font-mono text-xs font-bold uppercase tracking-[0.04em] text-neutral-900">
                      {cert.title}
                    </span>
                    <span className="shrink-0 font-mono text-[10px] font-bold text-neutral-400">
                      {cert.year}
                    </span>
                  </span>

                  <span className="line-clamp-2 text-[11px] leading-snug text-neutral-600">
                    {cert.issuer}
                  </span>

                  <span
                    className="mt-auto w-fit rounded-md px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-white"
                    style={{ backgroundColor: cert.accent }}
                  >
                    {cert.tag}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active !== null && (
        <Lightbox
          certs={certs}
          index={active}
          onClose={() => setActive(null)}
          onIndex={setActive}
        />
      )}
    </>
  );
}