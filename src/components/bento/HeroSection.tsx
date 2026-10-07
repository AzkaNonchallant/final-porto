import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa6";
import BentoCard from "@/components/ui/BentoCard";
import { cn } from "@/lib/utils";

const roles = [
  { label: "Product Engineer", color: "bg-yellow-200", pos: "-rotate-3 ml-0" },
  {
    label: "Graphic Designer",
    color: "bg-lime-300",
    pos: "rotate-6 ml-[2cqw]",
  },
  {
    label: "Mobile Developer",
    color: "bg-cyan-200",
    pos: "-rotate-2 ml-[7cqw]",
  },
  {
    label: "DevOps Engineer",
    color: "bg-fuchsia-400",
    pos: "rotate-6 ml-[13cqw]",
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/", Icon: FaInstagram },
  { label: "GitHub", href: "https://github.com/", Icon: FaGithub },
  { label: "TikTok", href: "https://tiktok.com/", Icon: FaTiktok },
];

export default function HeroSection() {
  return (
    <section className="grid grid-cols-1 gap-4 md:h-[640px] md:grid-cols-[1fr_1.6fr_0.8fr] md:grid-rows-[2.3fr_1fr]">
      <BentoCard className="p-0 @container md:row-span-2">
        <div className="h-full min-h-[28rem] bg-neutral-200 p-[8cqw] bg-[linear-gradient(to_right,#a3a3a3_1px,transparent_1px),linear-gradient(to_bottom,#a3a3a3_1px,transparent_1px)] bg-[size:12cqw_12cqw] md:min-h-0">
          <h1 className="font-mono text-[11cqw] font-bold leading-tight text-neutral-900">
            Hi, my name
            <br />
            is Azka
          </h1>

          <div className="mt-[10cqw] flex flex-col gap-[12cqw]">
            {roles.map((r) => (
              <div key={r.label} className={cn("relative w-fit", r.pos)}>
                {/* selotip hitam */}
                <span className="absolute -top-[2.5cqw] left-1/2 h-[4.5cqw] w-[28cqw] -translate-x-1/2 bg-black" />
                <div
                  className={cn(
                    "rounded-[2cqw] px-[6cqw] py-[3.5cqw] font-mono text-[6cqw] font-bold text-neutral-900 shadow-[1.5cqw_1.5cqw_0_0_#000]",
                    r.color,
                  )}
                >
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>

      {/* TENGAH ATAS: Learn more */}
      <BentoCard className="flex flex-col justify-between bg-purple-300 p-8">
        <h2 className="font-mono text-6xl font-extrabold uppercase leading-[0.85] tracking-tighter text-neutral-800 lg:text-7xl">
          Learn
          <br />
          more
          <br />
          about
          <br />
          me.
        </h2>

        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/about"
            aria-label="Learn more about me"
            className="flex h-14 w-52 items-center justify-center rounded-xl bg-white transition hover:scale-105"
          >
            <MoveRight className="size-10" strokeWidth={1.5} />
          </Link>

          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-12 place-items-center rounded-lg bg-purple-100 text-purple-500 shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] transition hover:-translate-y-1"
            >
              <Icon className="size-6" />
            </a>
          ))}
        </div>
      </BentoCard>

      {/* KANAN: 2 gambar (atas & bawah) */}
      <BentoCard className="flex flex-col gap-4 bg-yellow-400 md:row-span-2">
        <div className="relative min-h-48 flex-1 overflow-hidden rounded-xl">
          <Image
            src="/chinatsu.jpg"
            alt="Pola segitiga"
            fill
            sizes="(min-width: 768px) 20vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="relative min-h-48 flex-[1.2] overflow-hidden rounded-2xl">
          <Image
            src="/oc.jpg"
            alt="Gelombang hijau"
            fill
            sizes="(min-width: 768px) 20vw, 100vw"
            className="object-cover"
          />
        </div>
      </BentoCard>

      {/* TENGAH BAWAH: 2 gambar */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative min-h-40 overflow-hidden rounded-xl">
          <Image
            src="/chinatsu.jpg"
            alt="Ilustrasi karakter"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative min-h-40 overflow-hidden rounded-xl">
          <Image
            src="/oc.jpg"
            alt="Ilustrasi gurita"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
