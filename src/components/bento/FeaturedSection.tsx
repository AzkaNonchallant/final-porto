import Image from "next/image";
import type { ReactNode } from "react";
import BentoCard from "@/components/ui/BentoCard";

type Item = {
  label: string; // judul pojok kanan atas
  heading: string; // judul besar di bawah
  sub: string;
  card: string; // bg + warna teks utama
  circle: string;
  button: string;
  deco: ReactNode; // hiasan pojok kiri atas
  lineDeco: ReactNode; // hiasan di ujung garis bawah
  image?: string;
};

const items: Item[] = [
  {
    label: "Development",
    heading: "Software",
    sub: "Development",
    card: "bg-[#e9e4f7] text-neutral-900",
    circle: "bg-[#4b4bff]",
    button: "bg-[#7c5cff] shadow-[0.8cqw_0.8cqw_0_0_#000]",
    deco: (
      <>
        <span className="absolute left-0 top-0 size-[12cqw] rounded-full bg-[#7c5cff]" />
        <span className="absolute left-[5cqw] top-[11cqw] size-[7.5cqw] rounded-full bg-[#9b82ff]" />
      </>
    ),
    lineDeco: <span className="size-[3.5cqw] rounded-full bg-[#7c5cff]" />,
  },
  {
    label: "Illustration",
    heading: "Graphic",
    sub: "Design",
    card: "bg-[#45a5ff] text-[#ffd84a]",
    circle: "bg-[#ffd84a]",
    button: "bg-[#ffd84a] shadow-[0.8cqw_0.8cqw_0_0_#000]",
    deco: (
      <svg viewBox="0 0 64 32" className="w-[15cqw]" fill="#ffd84a" stroke="#d9a800" strokeWidth="1.5">
        <polygon points="2,28 14,6 30,22" />
        <polygon points="34,4 60,4 46,22" />
      </svg>
    ),
    lineDeco: null,
  },
  {
    label: "Achievement",
    heading: "Achievement",
    sub: "Proud",
    card: "bg-[#262626] text-[#4f4bff]",
    circle: "bg-[#4f4bff]",
    button: "bg-[#4f4bff] shadow-[0.8cqw_0.8cqw_0_0_#000]",
    deco: (
      <svg viewBox="0 0 40 40" className="w-[9cqw]" fill="none" stroke="#4f4bff" strokeWidth="2">
        <polygon points="20,3 25,15 38,15 28,24 32,37 20,29 8,37 12,24 2,15 15,15" />
      </svg>
    ),
    lineDeco: (
      <svg viewBox="0 0 40 40" className="w-[4cqw]" fill="#4f4bff">
        <polygon points="20,3 25,15 38,15 28,24 32,37 20,29 8,37 12,24 2,15 15,15" />
      </svg>
    ),
  },
];

export default function FeaturedSection() {
  return (
    <section className="mx-auto grid max-w-sm grid-cols-1 gap-[max(0.75rem,1.3cqw)] md:max-w-none md:grid-cols-3">
      {items.map((item) => (
        <BentoCard
          key={item.label}
          className={`@container aspect-[383/663] rounded-[max(0.75rem,1.2cqw)] p-0 ${item.card}`}
        >
          <div className="absolute inset-0">
            {/* hiasan kiri atas */}
            <div className="absolute left-[5cqw] top-[5cqw]">{item.deco}</div>

            {/* judul kanan atas */}
            <p className="absolute right-[3cqw] top-[3cqw] text-[7.5cqw] leading-none">
              {item.label}
            </p>

            {/* lingkaran tengah (+ gambar opsional) */}
            <div
              className={`absolute left-1/2 top-[53%] aspect-square w-[66cqw] -translate-x-1/2 -translate-y-1/2 rounded-full ${item.circle}`}
            />
            {item.image && (
              <div className="absolute left-1/2 top-[53%] aspect-square w-[85cqw] -translate-x-1/2 -translate-y-1/2">
                <Image
                  src={item.image}
                  alt={item.heading}
                  fill
                  sizes="(min-width: 768px) 30vw, 90vw"
                  className="object-contain"
                />
              </div>
            )}

            {/* bagian bawah */}
            <div className="absolute inset-x-[5cqw] bottom-[4.5cqw] flex items-end justify-between">
              <div>
                <div className="mb-[1cqw] flex items-center gap-[1cqw]">
                  {item.lineDeco}
                  <span className="h-px w-[28cqw] bg-current opacity-80" />
                </div>
                <p className="text-[8.5cqw] font-bold leading-tight">
                  {item.heading}
                </p>
                <p className="text-[4cqw] opacity-70">{item.sub}</p>
              </div>

              <button
                aria-label={`Lihat ${item.heading}`}
                className={`h-[10.5cqw] w-[25cqw] rounded-[2cqw] transition hover:-translate-y-0.5 ${item.button}`}
              />
            </div>
          </div>
        </BentoCard>
      ))}
    </section>
  );
}