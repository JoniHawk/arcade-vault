import Link from "next/link";
import { LIVE_SCORES, TOP_PLAYERS_TODAY } from "@/lib/data";
import Reveal from "@/components/home/reveal";
import SectionHead from "@/components/home/section-head";

const NEON = {
  cyan: "neon-cyan",
  magenta: "neon-magenta",
  green: "neon-green",
  yellow: "neon-yellow",
} as const;

const CARD = "border border-[color:var(--line)] bg-[color:var(--bg-2)]";
const HEAD =
  "flex min-w-0 items-center justify-between gap-2.5 border-b border-[color:var(--line)] px-3.5 py-3";
const TITLE =
  "pixel min-w-0 flex-1 overflow-hidden text-[10px] tracking-[0.1em] text-ellipsis whitespace-nowrap";

export default function LiveActivity() {
  return (
    <Reveal as="section" className="mx-auto my-20 max-w-[1320px] px-8">
      <SectionHead kicker="// 03" title="ACTIVIDAD EN VIVO" color="yellow" />
      <div className="grid grid-cols-1 gap-[18px] min-[901px]:grid-cols-[1.2fr_1fr]">
        <div className={CARD}>
          <div className={HEAD}>
            <div className={TITLE + " neon-cyan"}>▸ ÚLTIMAS PUNTUACIONES</div>
          </div>
          <div className="max-h-[360px] overflow-hidden py-1.5">
            {LIVE_SCORES.map((r, i) => (
              <div
                key={r.player}
                className="tick-row grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 border-b border-[color:var(--line-2)] px-[18px] py-[11px] font-[family-name:var(--mono)] text-[13px] min-[521px]:grid-cols-[1fr_auto_auto_auto]"
                style={{ animationDelay: i * 60 + "ms" }}
              >
                <span
                  className={`font-[family-name:var(--pixel)] text-[10px] tracking-[0.06em] ${NEON[r.color]}`}
                >
                  {r.player}
                </span>
                <span className="col-span-full text-xs text-[color:var(--ink-dim)] min-[521px]:col-auto">
                  ▸ {r.game}
                </span>
                <span className="font-[family-name:var(--pixel)] text-[11px] text-[color:var(--yellow)] [text-shadow:0_0_6px_rgba(245,255,0,0.5)]">
                  +{r.score.toLocaleString("es-ES")}
                </span>
                <span className="col-span-full text-[11px] tracking-[0.08em] text-[color:var(--ink-faint)] min-[521px]:col-auto">
                  {r.ago}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className={CARD}>
          <div className={HEAD}>
            <div className={TITLE + " neon-magenta"}>▸ TOP JUGADORES · HOY</div>
            <Link href="/salon" className="lb-link inline-block">
              VER SALÓN →
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 px-[18px] pt-2.5 pb-[18px]">
            {TOP_PLAYERS_TODAY.map((r, i) => (
              <div
                key={r.player}
                className={
                  "top-row grid grid-cols-[36px_1fr_auto] items-center gap-2.5 py-2 font-[family-name:var(--mono)]" +
                  (i < 3 ? ` top${i + 1}` : "")
                }
              >
                <span className="tp-rk font-[family-name:var(--pixel)] text-[10px] text-[color:var(--ink-faint)]">
                  #{String(r.rank).padStart(2, "0")}
                </span>
                <span className="font-[family-name:var(--pixel)] text-[11px] tracking-[0.06em] text-[color:var(--ink)]">
                  {r.player}
                </span>
                <span className="tp-s font-[family-name:var(--pixel)] text-[11px] text-[color:var(--cyan)] [text-shadow:0_0_6px_rgba(0,245,255,0.4)]">
                  {r.score.toLocaleString("es-ES")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
