"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FaGithub, FaInstagram, FaTiktok } from "react-icons/fa6";
import BentoCard from "@/components/ui/BentoCard";
import BouncyText from "@/components/ui/BouncyText";
import PlayfulText from "@/components/ui/PlayfulText";
import ExperienceDetail, {
  type Experience,
} from "@/components/ui/ExperienceDetail";
import WindowLayer from "@/components/ui/WindowLayer";
import { useWindows } from "@/hooks/useWindows";
import { cn } from "@/lib/utils";

type Role = {
  label: string;
  color: string;
  pos: string;
  experience: Experience;
};

const roles: Role[] = [
  {
    label: "Product Engineer",
    color: "bg-yellow-200",
    pos: "-rotate-3 ml-0",
    experience: {
      windowTitle: "Azka — Product Engineer",
      tagline:
        "Bikin produk digital dari nol: riset kebutuhan user, bikin prototipe, sampai ship dan iterasi dari feedback.",
      company: "Product Engineer",
      period: "2025 — sekarang",
      bullets: [
        "Lead development untuk 3 project tim sampai di terima oleh guru",
        "Bikin design system + component library yang dipake lintas tim frontend.",
        "Ngurus A/B test dan analytics buat nentuin fitur mana yang diprioritasin.",
        "Ngajarin tim soal git flow, code review, dan testing biar kerjaan lebih rapi.",
      ],
      skills: [
        "Product Thinking",
        "Figma",
        "Next.js",
        "TypeScript",
        "Analytics",
      ],
    },
  },
  {
    label: "Graphic Designer",
    color: "bg-lime-300",
    pos: "rotate-6 ml-[2cqw]",
    experience: {
      windowTitle: "Azka — Graphic Designer",
      tagline:
        "Bikin identitas visual yang kuat: dari logo, poster, sampai aset digital yang konsisten.",
      company: "PT Millenia Variety Food",
      period: "3 Month of Experience",
      bullets: [
        "Bikin poster & aset sosial media yang hasilnya dipakai untuk lomba dan keperluan perusahaan",
        "Suka bikin ilustrasi vektor dan pixel art di luar jam kerja.",
        "Buat template yang bisa dipakai tim marketing tanpa perlu request tiap kali.",
      ],
      skills: ["Illustrator", "Photoshop", "Figma", "ProCreate"],
    },
  },
  {
    label: "Mobile Developer",
    color: "bg-cyan-200",
    pos: "-rotate-2 ml-[7cqw]",
    experience: {
      windowTitle: "Azka — Mobile Developer",
      tagline:
        "Develop aplikasi mobile yang ringan dan enak dipake di Android maupun iOS.",
      company: "Mobile Developer",
      period: "2025 — sekarang",
      bullets: [
        "Publish 4 aplikasi Android/Ios Native dan PWA",
        "Mengajar sesi pembelajaran mobile developer dengan flutter",
        "Optimasi cold start biar app kebuka di bawah 1.5 detik.",
      ],
      skills: ["Flutter","React Native", "Supabase", "CI/CD"],
    },
  },
  {
    label: "BackEnd Developer",
    color: "bg-fuchsia-400",
    pos: "rotate-6 ml-[13cqw]",
    experience: {
      windowTitle: "Azka — DevOps Engineer",
      tagline:
        "Olah deployment, monitoring, dan infra biar aplikasinya jalan terus tanpa drama.",
      company: "KapsulIndo Nusantara",
      period: "4 Month of Experience",
      bullets: [
        "Membuat ERP  Untuk Kapsulindo",
        "Membuat CI/CD untuk personal project",
        "Backup & recovery plan yang sudah pernah dites beneran.",
      ],
      skills: ["PHP", "Express", "Docker", "AWS"],
    },
  },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com/", Icon: FaInstagram },
  { label: "GitHub", href: "https://github.com/AzkaNonchallant", Icon: FaGithub },
  { label: "TikTok", href: "https://tiktok.com/", Icon: FaTiktok },
];

export default function HeroSection() {
  const { windows, zOrder, open, focus, minimize, restore, close, closeAll } =
    useWindows<Role>();

  return (
    <section className="grid grid-cols-1 gap-4 md:h-[63cqw] md:grid-cols-[1fr_1.6fr_0.8fr] md:grid-rows-[1.85fr_1fr]">
      <BentoCard className="p-0 @container md:row-span-2">
        <div className="flex h-full min-h-[26rem] flex-col bg-neutral-200 p-[8cqw] sm:min-h-[30rem] bg-[linear-gradient(to_right,#a3a3a3_1px,transparent_1px),linear-gradient(to_bottom,#a3a3a3_1px,transparent_1px)] bg-[size:12cqw_12cqw] md:min-h-0">
          <PlayfulText
            as="h1"
            lines={["Hi, my name", "is Azka"]}
            className="font-mono text-[9.6cqw] font-bold leading-tight text-neutral-900"
          />

          <div className="mt-[8cqw] flex flex-1 flex-col justify-evenly gap-[4cqw] sm:gap-[6cqw]">
            {roles.map((r, i) => (
              <div
                key={r.label}
                style={{
                  animation: `role-pop-in 0.7s cubic-bezier(0.34, 1.5, 0.64, 1) ${0.5 + i * 0.13}s both`,
                }}
              >
                <div
                  className={cn("role-idle relative w-fit", r.pos)}
                  style={{
                    animation: `role-idle 3.8s ease-in-out ${1.4 + i * 0.32}s infinite`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => open(r.label, r)}
                    aria-label={`Lihat pengalaman sebagai ${r.label}`}
                    className={cn(
                      "group/role relative block cursor-pointer rounded-[2cqw] px-[5cqw] py-[3cqw] font-mono text-[5.4cqw] font-bold text-neutral-900 shadow-[1.5cqw_1.5cqw_0_0_#000] transition-[transform,box-shadow] duration-200 hover:-translate-y-[0.6cqw] hover:shadow-[2cqw_2cqw_0_0_#000] active:translate-y-0",
                      r.color,
                    )}
                  >
                    {/* selotip hitam */}
                    <span className="absolute -top-[2.2cqw] left-1/2 h-[4cqw] w-[30%] -translate-x-1/2 bg-black transition-transform duration-200 group-hover/role:rotate-[0.7deg]" />
                    {r.label}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BentoCard>

      {/* TENGAH ATAS: Learn more */}
      <BentoCard className="flex flex-col justify-center gap-[3cqw] bg-purple-300 p-6 sm:p-8">
        <BouncyText
          lines={["Learn", "more", "about", "me."]}
          className="font-mono text-[clamp(2.6rem,8cqw,6.5rem)] font-extrabold uppercase leading-[0.85] tracking-tighter text-neutral-800"
        />

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/about"
            aria-label="Learn more about me"
            className="flex h-12 w-36 items-center justify-center rounded-xl bg-white transition hover:scale-105 sm:w-44"
          >
            <MoveRight className="size-8" strokeWidth={1.5} />
          </Link>

          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-10 place-items-center rounded-lg bg-purple-100 text-purple-500 shadow-[3px_3px_0_0_rgba(0,0,0,0.3)] transition hover:-translate-y-1"
            >
              <Icon className="size-5" />
            </a>
          ))}
        </div>
      </BentoCard>

      {/* KANAN: 2 gambar (atas & bawah) */}
      <BentoCard className="flex flex-col gap-4 bg-yellow-300 md:row-span-2">
        <BentoCard className="flex flex-1 basis-0 flex-col items-start justify-center gap-[2cqw] bg-blue-300 p-6 sm:p-8">
          <BouncyText
            lines={["All", "Will", "Be", "Well."]}
            className="font-mono text-[clamp(1.6rem,4.4cqw,3.4rem)] font-extrabold uppercase leading-[0.85] tracking-tighter text-neutral-800 text-white"
          />

          <div className="flex items-center gap-2">
            <span className="h-[2px] w-8 rounded-full bg-white/50" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
              Est. 2023
            </span>
          </div>
        </BentoCard>
        <div className="relative min-h-48 flex-1 basis-0 overflow-hidden rounded-2xl md:min-h-0">
          <Image
            src="/ascii-art.png"
            alt="Gelombang hijau"
            fill
            sizes="(min-width: 768px) 20vw, 100vw"
            className="object-cover"
          />
        </div>
      </BentoCard>

      {/* TENGAH BAWAH: 2 gambar */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-auto md:min-h-0">
          <Image
            src="/azkayow.png"
            alt="Ilustrasi karakter"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl md:aspect-auto md:min-h-0">
          <Image
            src="/oc.jpg"
            alt="Ilustrasi gurita"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      <WindowLayer
        windows={windows.map((w) => ({
          id: w.id,
          title: w.data.experience.windowTitle,
          minimized: w.minimized,
          content: <ExperienceDetail experience={w.data.experience} />,
        }))}
        zOrder={zOrder}
        onFocus={focus}
        onMinimize={minimize}
        onRestore={restore}
        onClose={close}
        onCloseAll={closeAll}
      />
    </section>
  );
}
