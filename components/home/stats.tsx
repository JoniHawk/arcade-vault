import { HOME_STATS } from "@/lib/data";
import Reveal from "@/components/home/reveal";

export default function Stats() {
  return (
    <Reveal as="section" className="home-stats px-8 py-[60px]">
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 gap-8 min-[721px]:grid-cols-3">
        {HOME_STATS.map((st, i) => (
          <div
            key={st.unit}
            className="border-t border-[color:var(--line)] p-5 text-center first:border-t-0 min-[721px]:border-t-0 min-[721px]:border-l min-[721px]:first:border-l-0"
            style={{ transitionDelay: i * 90 + "ms" }}
          >
            <div className="neon-yellow font-[family-name:var(--pixel)] text-[clamp(32px,5vw,56px)] tracking-[0.04em]">
              {st.value}
            </div>
            <div className="pixel mt-2.5 text-[13px] tracking-[0.18em] text-[color:var(--ink)]">
              {st.unit}
            </div>
            <div className="mt-2 font-[family-name:var(--mono)] text-[11px] tracking-[0.16em] text-[color:var(--ink-faint)] uppercase">
              {st.sub}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
