import Image from "next/image";
import BentoCard from "@/components/ui/BentoCard";

const items = [
  { title: "Development", bg: "bg-violet-100 text-black", img: "/dev.png" },
  { title: "Illustration", bg: "bg-sky-500 text-yellow-200", img: "/illust.png" },
  { title: "Achievement", bg: "bg-neutral-800 text-indigo-400", img: "/ach.png" },
];

export default function FeaturedSection() {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map((item) => (
        <BentoCard key={item.title} className={`h-96 ${item.bg}`}>
          <p className="relative z-10 text-right font-mono text-sm">
            {item.title}
          </p>
          <Image src={item.img} alt={item.title} fill className="object-contain" />
        </BentoCard>
      ))}
    </section>
  );
}