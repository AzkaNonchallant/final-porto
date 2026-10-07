import { cn } from "@/lib/utils";

type BouncyTextProps = {
  lines: string[];
  className?: string;
  stagger?: number;
  startDelay?: number;
};

export default function BouncyText({
  lines,
  className,
  stagger = 0.06,
  startDelay = 0.2,
}: BouncyTextProps) {
  const introDuration = 0.8;
  let index = 0;

  return (
    <h2 aria-label={lines.join(" ")} className={cn(className)}>
      {lines.map((line, li) => (
        <span key={li} aria-hidden="true" className="block">
          {line.split("").map((char, ci) => {
            const i = index++;
            const introDelay = startDelay + i * stagger;
            const idleDelay = introDelay + introDuration + i * 0.08;

            return (
              <span
                key={ci}
                className="letter-jump inline-block"
                style={{
                  animation: `letter-jump-in ${introDuration}s cubic-bezier(0.34, 1.4, 0.64, 1) ${introDelay}s both`,
                }}
              >
                <span
                  className="letter-idle inline-block"
                  style={{
                    animation: `letter-idle 3.2s ease-in-out ${idleDelay}s infinite`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}