"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
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
    label: "DevOps Engineer",
    color: "bg-fuchsia-400",
    pos: "rotate-6 ml-[13cqw]",
    experience: {
      windowTitle: "Azka — DevOps/Backend Engineer",
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
  { label: "Instagram", href: "https://www.instagram.com/azkarafif42/", Icon: FaInstagram },
  { label: "GitHub", href: "https://github.com/AzkaNonchallant", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/azka-aydirrafif-590005373/", Icon: FaLinkedin },
];

export default function HeroSection() {
  const { windows, zOrder, open, focus, minimize, restore, close } =
    useWindows<Role>();

  return (
    <section className="grid h-[118cqw] grid-cols-[1fr_1.5fr_1.05fr] grid-rows-[1fr_auto] gap-[2cqw] md:h-[63cqw] md:grid-cols-[1fr_1.6fr_0.8fr] md:grid-rows-[1.85fr_1fr] md:gap-4">
      <BentoCard className="p-0 @container md:row-span-2">
        <div className="flex h-full flex-col bg-neutral-200 p-[8cqw] bg-[linear-gradient(to_right,#a3a3a3_1px,transparent_1px),linear-gradient(to_bottom,#a3a3a3_1px,transparent_1px)] bg-[size:12cqw_12cqw]">
          <PlayfulText
            as="h1"
            lines={["Hi, my name", "is Azka"]}
            className="font-mono text-[12cqw] font-bold leading-tight text-neutral-900 md:text-[9.6cqw]"
          />

          <div className="mt-[8cqw] flex flex-1 flex-col justify-evenly gap-[6cqw]">
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
                      "group/role relative block cursor-pointer rounded-[2cqw] px-[5cqw] py-[3cqw] font-mono text-[7cqw] font-bold text-neutral-900 shadow-[1.5cqw_1.5cqw_0_0_#000] transition-[transform,box-shadow] duration-200 hover:-translate-y-[0.6cqw] hover:shadow-[2cqw_2cqw_0_0_#000] active:translate-y-0 md:text-[5.4cqw]",
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
      <BentoCard className="flex flex-col justify-center gap-[3cqw] bg-purple-300 p-[1.6cqw]">
        <BouncyText
          lines={["Learn", "more", "about", "me."]}
          className="font-mono text-[min(11cqw,6.5rem)] font-extrabold uppercase leading-[0.85] tracking-tighter text-neutral-800 md:text-[min(8cqw,6.5rem)]"
        />

        <div className="flex flex-nowrap items-center gap-[max(4px,0.8cqw)]">
          <Link
            href="https://rafin.web.id"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Learn more about me"
            className="flex h-[max(2.1rem,3.4cqw)] w-[max(3rem,10.5cqw)] shrink-0 items-center justify-center rounded-[max(0.4rem,0.7cqw)] border-2 border-neutral-900 bg-white text-neutral-900 shadow-[0.2cqw_0.2cqw_0_0_rgba(0,0,0,0.4)] transition hover:scale-105"
          >
            <MoveRight
              className="size-[max(1.2rem,2.5cqw)] text-neutral-900"
              strokeWidth={2.5}
            />
          </Link>

          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid size-[max(1.9rem,2.7cqw)] shrink-0 place-items-center rounded-[max(0.3rem,0.6cqw)] border-2 border-neutral-900 bg-white text-purple-600 shadow-[0.2cqw_0.2cqw_0_0_rgba(0,0,0,0.4)] transition hover:-translate-y-1"
            >
              <Icon className="size-[max(1rem,1.5cqw)]" />
            </a>
          ))}
        </div>
      </BentoCard>

      {/* KANAN: 2 gambar (atas & bawah) */}
      <BentoCard className="row-span-2 flex flex-col gap-[1cqw] bg-yellow-300 p-[1.5cqw] md:gap-4 md:p-4">
        <BentoCard className="flex flex-1 basis-0 flex-col items-start justify-center gap-[2cqw] rounded-none bg-blue-300 p-[1.6cqw] md:rounded-xl">
          <BouncyText
            lines={["All", "Will", "Be", "Well."]}
            className="font-mono text-[min(6.6cqw,3.4rem)] font-extrabold uppercase leading-[0.85] tracking-tighter text-neutral-800 text-white md:text-[min(4.4cqw,3.4rem)]"
          />

          <div className="flex items-center gap-2">
            <span className="h-[max(2px,0.25cqw)] w-[max(1.5rem,3cqw)] rounded-full bg-white/50" />
            <span className="font-mono text-[max(0.7rem,1cqw)] font-medium uppercase tracking-[0.18em] text-white/70">
              Est. 2023
            </span>
          </div>
        </BentoCard>
        <div className="relative aspect-square flex-none basis-0 overflow-hidden rounded-none md:aspect-auto md:flex-1 md:rounded-2xl">
          <Image
            src="/ascii-art.png"
            alt="Gelombang hijau"
            fill
            sizes="(min-width: 768px) 20vw, 30vw"
            className="object-cover"
          />
        </div>
      </BentoCard>

      {/* TENGAH BAWAH: 2 gambar */}
      <div className="col-span-2 grid grid-cols-2 gap-[1cqw] md:col-span-1 md:col-start-2 md:gap-4">
        <div className="relative aspect-square overflow-hidden rounded-[max(0.35rem,0.9cqw)] md:aspect-auto md:rounded-xl">
          <Image
            src="/azkayow.png"
            alt="Ilustrasi karakter"
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-square overflow-hidden rounded-[max(0.35rem,0.9cqw)] md:aspect-auto md:rounded-xl">
          <Image
            src="/project-gambar/realgr.gif"
            alt="Ilustrasi gurita"
            fill
            unoptimized
            sizes="(min-width: 768px) 25vw, 50vw"
            className="scale-[1.9] object-cover"
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
      />
    </section>
  );
}
