type Props = { className?: string };

export default function TrianglePattern({ className }: Props) {
  const rings = Array.from({ length: 5 }, (_, i) => i);

  return (
    <svg
      viewBox="0 0 200 180"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="6"
      aria-hidden="true"
    >
      {rings.map((i) => {
        const top = 10 + i * 16;
        const base = 130 - i * 6;
        const half = (base - top) * 0.62;
        return (
          <polygon
            key={i}
            points={`100,${top} ${100 + half},${base} ${100 - half},${base}`}
          />
        );
      })}
      {[150, 162, 174].map((y) => (
        <line key={y} x1="10" y1={y} x2="190" y2={y} />
      ))}
    </svg>
  );
}