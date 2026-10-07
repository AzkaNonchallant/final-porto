import { useId } from "react";

type DotDividerProps = {
  rows?: number; 
  gap?: number; 
  size?: number; 
  className?: string;
};

export default function DotDivider({
  rows = 3,
  gap = 20,
  size = 3,
  className = "",
}: DotDividerProps) {
  const id = useId().replace(/:/g, "");
  const offset = (gap - size) / 2;

  return (
    <div
      aria-hidden="true"
      className={`w-full text-white/90 ${className}`}
    >
      <svg width="100%" height={rows * gap} className="block">
        <defs>
          <pattern
            id={id}
            width={gap}
            height={gap}
            patternUnits="userSpaceOnUse"
          >
            <rect
              x={offset}
              y={offset}
              width={size}
              height={size}
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`} />
      </svg>
    </div>
  );
}