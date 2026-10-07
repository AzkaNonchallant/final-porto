import Image from "next/image";
import Link from "next/link";

export default function ShowcaseSection() {
  return (
    <section className="grid items-center gap-8 md:grid-cols-2">
      <Image src="/avatar.png" alt="Avatar" width={320} height={320}
        className="mx-auto rounded-xl" />
      <div className="flex flex-col items-center gap-6">
        <Image src="/logo-azka.png" alt="Azka" width={260} height={120} />
        <Link
          href="/projects"
          className="rounded-lg bg-gradient-to-r from-indigo-500 to-purple-400 px-8 py-2 font-bold text-white"
        >
          More →
        </Link>
      </div>
    </section>
  );
}