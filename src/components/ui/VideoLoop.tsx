import { cn } from "@/lib/utils";

type VideoLoopProps = {
  src: string;
  poster?: string;
  className?: string;
};

export default function VideoLoop({ src, poster, className }: VideoLoopProps) {
  return (
    <video
      className={cn("h-full w-full object-cover", className)}
      src={src}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
    />
  );
}