import {
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiGit,
  SiFigma,
  SiFlutter,
  SiKotlin,
  SiPostgresql,
  SiLinux,
  SiGithubactions,
  SiKubernetes,
} from "react-icons/si";

const techs = [
  { name: "TypeScript", Icon: SiTypescript },
  { name: "JavaScript", Icon: SiJavascript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Python", Icon: SiPython },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Kotlin", Icon: SiKotlin },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Docker", Icon: SiDocker },
  { name: "Kubernetes", Icon: SiKubernetes },
  { name: "GitHub Actions", Icon: SiGithubactions },
  { name: "Linux", Icon: SiLinux },
  { name: "Git", Icon: SiGit },
  { name: "Figma", Icon: SiFigma },
];

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
  className="flex shrink-0 items-center gap-[4cqw] pr-[4cqw]"
  aria-hidden={hidden}
>
  {techs.map(({ name, Icon }) => (
    <li key={name} title={name}>
      <Icon className="size-[max(1.25rem,2.2cqw)] text-white" />
    </li>
  ))}
</ul>
  );
}

export default function TechMarquee() {
  return (
    <section
      aria-label="Tech stack"
      className="overflow-hidden border-y border-white/15 py-[max(1rem,2cqw)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}