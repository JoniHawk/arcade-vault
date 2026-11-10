import Reveal from "@/components/home/reveal";
import SectionHead from "@/components/home/section-head";

type IconKind = "GAMEPAD" | "FREE" | "TROPHY" | "ROCKET";

const FEATURES: {
  icon: IconKind;
  title: string;
  desc: string;
  color: "cyan" | "yellow" | "magenta" | "green";
}[] = [
  {
    icon: "GAMEPAD",
    title: "JUEGOS CLÁSICOS",
    desc: "Arkanoid, Tetris, Snake y muchos más. Los mejores arcades de todos los tiempos en un solo lugar.",
    color: "cyan",
  },
  {
    icon: "FREE",
    title: "100% GRATIS",
    desc: "Sin suscripciones, sin pagos ocultos. Todos los juegos disponibles de forma gratuita.",
    color: "yellow",
  },
  {
    icon: "TROPHY",
    title: "LADDER BOARDS",
    desc: "Compite con jugadores de todo el mundo. Escala el ranking y demuestra quién es el mejor.",
    color: "magenta",
  },
  {
    icon: "ROCKET",
    title: "SIEMPRE CRECIENDO",
    desc: "Agregamos nuevos juegos constantemente. Vuelve seguido, siempre habrá algo nuevo que jugar.",
    color: "green",
  },
];

// Iconos pixel 16x16 dibujados con rects; el color viene del padre (currentColor).
function FeatureIcon({ kind }: { kind: IconKind }) {
  const C = "currentColor";
  switch (kind) {
    case "GAMEPAD":
      return (
        <svg className="ft-icon" viewBox="0 0 16 16">
          <g fill={C}>
            <rect x="2" y="6" width="12" height="6" />
            <rect x="0" y="8" width="2" height="4" />
            <rect x="14" y="8" width="2" height="4" />
            <rect x="3" y="8" width="2" height="2" />
            <rect x="2" y="9" width="4" height="0.5" />
            <rect x="11" y="7" width="1.5" height="1.5" />
            <rect x="11" y="10" width="1.5" height="1.5" />
          </g>
        </svg>
      );
    case "FREE":
      return (
        <svg className="ft-icon" viewBox="0 0 16 16">
          <g fill={C}>
            <rect x="3" y="3" width="10" height="10" fill="none" stroke={C} strokeWidth="1.5" />
            <rect x="5" y="6" width="1.5" height="4" />
            <rect x="5" y="6" width="4" height="1.5" />
            <rect x="5" y="8" width="3" height="1" />
            <rect x="10" y="6" width="1.5" height="4" />
          </g>
        </svg>
      );
    case "TROPHY":
      return (
        <svg className="ft-icon" viewBox="0 0 16 16">
          <g fill={C}>
            <rect x="3" y="2" width="10" height="2" />
            <rect x="3" y="2" width="2" height="6" />
            <rect x="11" y="2" width="2" height="6" />
            <rect x="5" y="8" width="6" height="2" />
            <rect x="7" y="10" width="2" height="3" />
            <rect x="5" y="13" width="6" height="1.5" />
            <rect x="1" y="3" width="2" height="3" />
            <rect x="13" y="3" width="2" height="3" />
          </g>
        </svg>
      );
    case "ROCKET":
      return (
        <svg className="ft-icon" viewBox="0 0 16 16">
          <g fill={C}>
            <rect x="7" y="1" width="2" height="2" />
            <rect x="6" y="3" width="4" height="2" />
            <rect x="5" y="5" width="6" height="6" />
            <rect x="4" y="11" width="2" height="2" />
            <rect x="10" y="11" width="2" height="2" />
            <rect x="7" y="6" width="2" height="2" fill="#0a0a0f" />
            <rect x="6" y="13" width="1" height="2" />
            <rect x="9" y="13" width="1" height="2" />
          </g>
        </svg>
      );
  }
}

export default function Features() {
  return (
    <Reveal as="section" className="mx-auto my-20 max-w-[1320px] px-8">
      <SectionHead kicker="// 01" title="¿POR QUÉ ARCADE VAULT?" color="magenta" />
      <div className="grid grid-cols-1 gap-[18px] min-[521px]:grid-cols-2 min-[981px]:grid-cols-4">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className={"feature-card " + f.color}
            style={{ transitionDelay: i * 80 + "ms" }}
          >
            <FeatureIcon kind={f.icon} />
            <div className="ft-title pixel">{f.title}</div>
            <div className="ft-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
