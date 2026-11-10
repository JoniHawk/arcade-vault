import Link from "next/link";
import { GAMES } from "@/lib/data";
import Reveal from "@/components/home/reveal";
import SectionHead from "@/components/home/section-head";

export default function GamesPreview() {
  return (
    <Reveal as="section" className="mx-auto my-20 max-w-[1320px] px-8">
      <SectionHead kicker="// 02" title="JUEGOS DISPONIBLES AHORA" color="cyan" />
      <div className="grid grid-cols-2 gap-4 min-[601px]:grid-cols-3 min-[1101px]:grid-cols-6">
        {GAMES.slice(0, 6).map((g) => (
          <Link key={g.id} href={`/juegos/${g.id}`} className="mini-card block">
            <div className="mini-cover">
              <div className={"cover-bg " + g.cover}></div>
            </div>
            <div className="px-3 py-2.5">
              <div className="font-[family-name:var(--pixel)] text-[10px] tracking-[0.06em]">
                {g.title}
              </div>
              <div className="mt-1 font-[family-name:var(--mono)] text-[10px] tracking-[0.14em] text-[color:var(--ink-faint)]">
                {g.cat}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/games" className="btn lg">
          VER TODOS LOS JUEGOS →
        </Link>
      </div>
    </Reveal>
  );
}
