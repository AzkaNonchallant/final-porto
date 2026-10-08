import { cn } from "@/lib/utils";

type PlayfulTextProps = {
  lines: string[];
  as?: "h1" | "h2";
  className?: string;
  stagger?: number;
  startDelay?: number;
};

export default function PlayfulText({
  lines,
  as: Tag = "h1",
  className,
  stagger = 0.045,
  startDelay = 0.15,
}: PlayfulTextProps) {
  const introDuration = 0.75;
  let index = 0;

  return (
    <Tag aria-label={lines.join(" ")} className={cn(className)}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className="block">
          {line.split("").map((char, ci) => {
            const i = index++;
            const introDelay = startDelay + i * stagger;
            const idleDelay = introDelay + introDuration + i * 0.06;

            return (
              <span
                key={ci}
                className="inline-block"
                style={{
                  animation: `playful-pop-in ${introDuration}s cubic-bezier(0.34, 1.5, 0.64, 1) ${introDelay}s both`,
                }}
              >
                <span
                  className="playful-idle inline-block"
                  style={{
                    animation: `playful-idle 3.6s ease-in-out ${idleDelay}s infinite`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            )
          })}
        </span>
      ))}
    </Tag>
  );
}
