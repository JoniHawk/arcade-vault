type Props = {
  kicker: string;
  title: string;
  color: "cyan" | "magenta" | "yellow" | "green";
};

const KICKER_COLOR = {
  cyan: "neon-cyan",
  magenta: "neon-magenta",
  yellow: "neon-yellow",
  green: "neon-green",
} as const;

export default function SectionHead({ kicker, title, color }: Props) {
  return (
    <div className="mb-9 flex items-center gap-[18px]">
      <div
        className={`pixel text-[11px] tracking-[0.22em] ${KICKER_COLOR[color]}`}
      >
        {kicker}
      </div>
      <h2 className="m-0 font-[family-name:var(--pixel)] text-[clamp(18px,2.8vw,28px)] tracking-[0.06em] text-[color:var(--ink)]">
        {title}
      </h2>
      <div className="h-px flex-1 bg-[linear-gradient(90deg,var(--line),transparent)]"></div>
    </div>
  );
}
