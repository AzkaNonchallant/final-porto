"use client";

import Image from "next/image";
import { type ReactNode } from "react";
import { MoveRight } from "lucide-react";
import BentoCard from "@/components/ui/BentoCard";
import WindowLayer from "@/components/ui/WindowLayer";
import { useWindows } from "@/hooks/useWindows";

type Item = {
  label: string; // judul pojok kanan atas
  heading: string; // judul besar di bawah
  sub: string;
  card: string; // bg + warna teks utama
  circle: string;
  button: string;
  buttonText: string; // warna teks tombol (biar kontras)
  deco: ReactNode; // hiasan pojok kiri atas
  lineDeco: ReactNode; // hiasan di ujung garis bawah
  image?: string;
  windowTitle: string;
  projects?: Project[];
  skills?: { group: string; items: string[] }[];
};

type Project = {
  name: string;
  year: string;
  role: string;
  blurb: string;
  stack: string[];
};

const items: Item[] = [
  {
    label: "Development",
    heading: "Software",
    sub: "Development",
    card: "bg-[#e9e4f7] text-neutral-900",
    circle: "bg-[#4b4bff]",
    button: "bg-[#7c5cff] shadow-[0.8cqw_0.8cqw_0_0_#000]",
    buttonText: "text-neutral-900",
    deco: (
      <>
        <span className="absolute left-0 top-0 size-[12cqw] rounded-full bg-[#7c5cff]" />
        <span className="absolute left-[5cqw] top-[11cqw] size-[7.5cqw] rounded-full bg-[#9b82ff]" />
      </>
    ),
    lineDeco: <span className="size-[3.5cqw] rounded-full bg-[#7c5cff]" />,
    windowTitle: "Azka — Software",
    projects: [
      {
        name: "Portfolio v2",
        year: "2025",
        role: "Frontend",
        blurb: "Bento portfolio with playful motion, rebuilt from scratch.",
        stack: ["Next.js", "Tailwind", "Framer Motion"],
      },
      {
        name: "Ticketing API",
        year: "2024",
        role: "Backend",
        blurb: "REST API for cinema ticketing with seat locking.",
        stack: ["Node.js", "PostgreSQL", "Redis"],
      },
      {
        name: "Ops Dashboard",
        year: "2024",
        role: "Fullstack",
        blurb: "Internal monitoring dashboard for campus servers.",
        stack: ["React", "Go", "Grafana"],
      },
    ],
  },
  {
    label: "Skills",
    heading: "Skills",
    sub: "Toolkit",
    card: "bg-[#45a5ff] text-[#ffd84a]",
    circle: "bg-[#ffd84a]",
    button: "bg-[#ffd84a] shadow-[0.8cqw_0.8cqw_0_0_#000]",
    buttonText: "text-neutral-900",
    deco: (
      <svg
        viewBox="0 0 64 32"
        className="w-[15cqw]"
        fill="#ffd84a"
        stroke="#d9a800"
        strokeWidth="1.5"
      >
        <polygon points="2,28 14,6 30,22" />
        <polygon points="34,4 60,4 46,22" />
      </svg>
    ),
    lineDeco: null,
    windowTitle: "Azka — Skills",
    skills: [
      {
        group: "Design",
        items: ["Figma", "Illustrator", "Photoshop", "Branding", "Pixel Art"],
      },
      {
        group: "Frontend",
        items: ["TypeScript", "React", "Next.js", "Tailwind", "Framer Motion"],
      },
      {
        group: "Backend",
        items: ["Node.js", "PostgreSQL", "Redis", "Firebase"],
      },
      {
        group: "Mobile",
        items: ["Kotlin", "React Native", "Swift"],
      },
      {
        group: "Infra",
        items: ["Docker", "Kubernetes", "Terraform", "AWS", "Linux"],
      },
    ],
  },
  {
    label: "Achievement",
    heading: "Achievement",
    sub: "Proud",
    card: "bg-[#262626] text-[#4f4bff]",
    circle: "bg-[#4f4bff]",
    button: "bg-[#4f4bff] shadow-[0.8cqw_0.8cqw_0_0_#000]",
    buttonText: "text-white",
    deco: (
      <svg
        viewBox="0 0 40 40"
        className="w-[9cqw]"
        fill="none"
        stroke="#4f4bff"
        strokeWidth="2"
      >
        <polygon points="20,3 25,15 38,15 28,24 32,37 20,29 8,37 12,24 2,15 15,15" />
      </svg>
    ),
    lineDeco: (
      <svg viewBox="0 0 40 40" className="w-[4cqw]" fill="#4f4bff">
        <polygon points="20,3 25,15 38,15 28,24 32,37 20,29 8,37 12,24 2,15 15,15" />
      </svg>
    ),
    windowTitle: "Azka — Achievement",
    projects: [
      {
        name: "Hackathon Winner",
        year: "2025",
        role: "Team Lead",
        blurb: "1st place of 24 teams building an ed-tech attendance app.",
        stack: ["Next.js", "Supabase"],
      },
      {
        name: "Campus Ambassador",
        year: "2024",
        role: "Community",
        blurb: "Ran workshops and design sprints for 200+ students.",
        stack: ["Figma", "Discord"],
      },
      {
        name: "OSS Contributor",
        year: "2023",
        role: "Open Source",
        blurb: "Merged 14 PRs into a Tailwind CSS plugin repo.",
        stack: ["TypeScript", "Git"],
      },
    ],
  },
];

function SkillList({
  skills,
}: {
  skills: { group: string; items: string[] }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      {skills.map((group) => (
        <div
          key={group.group}
          className="rounded-xl border-2 border-neutral-900 bg-white p-4"
        >
          <h4 className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-900">
            {group.group}
          </h4>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {group.items.map((item) => (
              <span
                key={item}
                className="rounded-md border border-neutral-900/25 bg-neutral-50 px-2 py-1 font-mono text-[11px] font-medium text-neutral-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {projects.map((p) => (
        <li
          key={p.name}
          className="flex flex-col gap-2 rounded-xl border-2 border-neutral-900 bg-white p-4 transition hover:-translate-y-0.5 hover:bg-[#f4f2ff]"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h4 className="font-mono text-sm font-bold uppercase tracking-[0.06em] text-neutral-900">
              {p.name}
            </h4>
            <span className="font-mono text-[10px] font-bold text-neutral-500">
              {p.year}
            </span>
          </div>

          <p className="text-sm text-neutral-600">{p.blurb}</p>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-md bg-[#4b4bff] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-white">
              {p.role}
            </span>
            {p.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-neutral-900/25 px-2 py-0.5 font-mono text-[10px] font-medium text-neutral-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function FeaturedSection() {
  const { windows, zOrder, open, focus, minimize, restore, close, closeAll } =
    useWindows<Item>();

  return (
    <section className="mx-auto grid max-w-[26rem] grid-cols-1 gap-[max(0.75rem,1.3cqw)] sm:max-w-none sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <BentoCard
          key={item.label}
          className={`@container card-bend group aspect-[383/663] rounded-[max(0.75rem,1.2cqw)] border-[1cqw] border-neutral-900 p-0 shadow-[1.2cqw_1.2cqw_0_0_#000] transition-shadow hover:shadow-[1.6cqw_1.6cqw_0_0_#000] ${item.card}`}
          style={{
            animation: `role-pop-in 0.7s cubic-bezier(0.34, 1.5, 0.64, 1) ${0.55 + i * 0.15}s both`,
          }}
        >
          <div className="absolute inset-0">
            {/* garis pinggir dalam */}
            <span className="absolute inset-[2.6cqw] rounded-[1.4cqw] border-[0.5cqw] border-neutral-900/15" />

            {/* hiasan pojok kanan atas */}
            <div className="absolute right-[6cqw] top-[6cqw] transition-transform duration-300 group-hover:rotate-6">
              {item.deco}
            </div>

            {/* nomor besar + label kecil, pojok kiri atas */}
            <div className="absolute left-[5cqw] top-[4cqw] flex flex-col">
              <span className="font-mono text-[14cqw] font-bold leading-[0.8] tracking-[-0.04em] opacity-90">
                {`0${i + 1}`}
              </span>
              <span className="mt-[1.6cqw] w-fit rounded-[1.4cqw] border-[0.6cqw] border-current px-[2cqw] py-[0.8cqw] font-mono text-[4cqw] font-medium uppercase leading-none tracking-[0.16em] opacity-70">
                {item.label}
              </span>
            </div>

            {/* lingkaran tengah (+ gambar opsional) */}
            <div
              className={`absolute left-1/2 top-[50%] aspect-square w-[66cqw] -translate-x-1/2 -translate-y-1/2 rounded-full ring-[0.9cqw] ring-neutral-900/10 transition-transform duration-500 group-hover:scale-105 ${item.circle}`}
            />
            {item.image && (
              <div className="absolute left-1/2 top-[50%] aspect-square w-[85cqw] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3">
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
            <div className="absolute inset-x-[5cqw] bottom-[6cqw] flex items-end justify-between gap-[3cqw]">
              <div className="min-w-0 flex-1">
                <div className="mb-[1.6cqw] flex items-center gap-[1.4cqw]">
                  {item.lineDeco}
                  <span className="h-[0.6cqw] w-[26cqw] rounded-full bg-current opacity-40" />
                </div>
                <p className="truncate text-[8.2cqw] font-extrabold uppercase leading-[0.85] tracking-[-0.03em]">
                  {item.heading}
                </p>
                <p className="mt-[1.4cqw] truncate text-[3.9cqw] font-medium uppercase tracking-[0.18em] opacity-70">
                  {item.sub}
                </p>
              </div>

              <button
                type="button"
                aria-label={`Lihat ${item.heading}`}
                onClick={() => open(item.label, item)}
                className={`flex h-[10cqw] w-[24cqw] shrink-0 items-center justify-center gap-[1.4cqw] rounded-[2.4cqw] border-[0.8cqw] border-neutral-900 text-[4.2cqw] font-bold uppercase tracking-[0.08em] transition-transform duration-300 hover:-translate-y-[0.8cqw] active:translate-y-0 ${item.button} ${item.buttonText}`}
              >
                Lihat
                <MoveRight className="size-[5.4cqw]" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </BentoCard>
      ))}

      <WindowLayer
        windows={windows.map((w) => ({
          id: w.id,
          title: w.data.windowTitle,
          minimized: w.minimized,
          content: w.data.skills ? (
            <SkillList skills={w.data.skills} />
          ) : (
            <ProjectList projects={w.data.projects ?? []} />
          ),
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
