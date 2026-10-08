import type { ReactNode } from "react";

export type Experience = {
  windowTitle: string;
  tagline: string;
  company: string;
  period: string;
  bullets: string[];
  skills: string[];
};

export default function ExperienceDetail({
  experience,
}: {
  experience: Experience;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border-2 border-neutral-900 bg-[#4b4bff] p-4 text-white">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] opacity-80">
          {experience.company}
        </p>
        <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.08em]">
          {experience.period}
        </p>
        <p className="mt-2 text-sm leading-snug text-white/90">
          {experience.tagline}
        </p>
      </div>

      <ul className="flex flex-col gap-2">
        {experience.bullets.map((bullet) => (
          <li
            key={bullet}
            className="flex gap-2 rounded-lg border-2 border-neutral-900 bg-white p-3 text-sm text-neutral-700"
          >
            <span className="mt-1.5 size-2 shrink-0 rounded-full bg-[#6f84ff]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5">
        {experience.skills.map((skill) => (
          <Chip key={skill}>{skill}</Chip>
        ))}
      </div>
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-neutral-900/25 bg-white px-2 py-0.5 font-mono text-[10px] font-medium text-neutral-600">
      {children}
    </span>
  );
}
