"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  interval?: number;
  className?: string;
};

export default function ImageCarousel({
  images,
  alt,
  interval = 3200,
  className,
}: ImageCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      interval,
    );
    return () => clearInterval(id);
  }, [images.length, interval, paused]);

  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-xl bg-neutral-300",
        className,
      )}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={`${alt} ${i + 1}`}
          fill
          sizes="(min-width: 768px) 40vw, 90vw"
          className={cn(
            "object-cover transition-opacity duration-700 ease-out",
            i === index ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
    </div>
  );
}
