import Image from "next/image";
import Link from "next/link";

export default function ShowcaseSection() {
  return (
    <section className="grid items-center gap-8 md:grid-cols-2">
      {/* Kiri: bar + avatar */}
      <div className="mx-auto w-[320px]">
        <div className="mb-3 flex gap-1.5">
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className="h-3 flex-1 rounded-md bg-[#6f84ff] shadow-[0_2px_0_rgba(0,0,0,0.35)]"
            />
          ))}
        </div>
        <Image
          src="/chinatsu.jpg"
          alt="Avatar"
          width={320}
          height={320}
          className="rounded-xl"
        />
      </div>

      {/* Kanan: logo + tombol */}
      <div className="flex flex-col items-center gap-6">
        <Image src="/test.svg" alt="Azka" width={260} height={120} />
        <Link
          href="/projects"
          className="rounded-lg bg-[#6f84ff] px-8 py-2 font-mono text-xl font-bold text-white shadow-[3px_0_0_#ff5533] transition hover:brightness-110"
        >
          More→
        </Link>
      </div>
    </section>
  );
}