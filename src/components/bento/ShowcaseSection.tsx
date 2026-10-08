"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MoveRight } from "lucide-react";
import ImageCarousel from "@/components/ui/ImageCarousel";
import GalleryCanvas from "@/components/ui/GalleryCanvas";

const slides = ["/chinatsu.jpg", "/oc.jpg", "/texture.jpg"];

export default function ShowcaseSection() {
  const [gallery, setGallery] = useState(false);

  return (
    <section className="grid items-center gap-10 md:grid-cols-[1fr_0.9fr] md:gap-16">
      {/* Kiri: logo + tombol */}
      <div className="order-2 flex flex-col items-start gap-6 md:order-1">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.25em] text-neutral-400">
            Portfolio
          </span>
          <Image
            src="/test.svg"
            alt="Azka"
            width={260}
            height={120}
            className="h-auto w-[240px] max-w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setGallery(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#6f84ff] px-6 py-2 font-mono text-lg font-bold text-white shadow-[3px_3px_0_0_#ff5533] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#ff5533]"
          >
            More
            <MoveRight className="size-5" strokeWidth={2.5} />
          </button>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500">
            9 projects
          </span>
        </div>
      </div>

      {/* Kanan: bar vertikal + gambar kotak */}
      <div className="order-1 flex items-stretch gap-3 md:order-2">
        <div className="flex w-3 shrink-0 flex-col gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="flex-1 rounded-md bg-[#6f84ff] shadow-[0_2px_0_rgba(0,0,0,0.35)]"
            />
          ))}
        </div>

        <ImageCarousel
          images={slides}
          alt="Project"
          className="w-full rounded-xl"
        />
      </div>

      <AnimatePresence>
        {gallery && <GalleryCanvas onClose={() => setGallery(false)} />}
      </AnimatePresence>
    </section>
  );
}
