import Link from "next/link";
import Reveal from "@/components/home/reveal";
import SectionHead from "@/components/home/section-head";

const PERKS = [
  "Acceso a todos los juegos",
  "Ranking global y salón de la fama",
  "Sin anuncios entre partidas",
  "Guarda tus puntuaciones",
  "Nuevos juegos cada mes",
  "Funciona en cualquier navegador",
];

const FAQ = [
  {
    q: "¿REALMENTE ES GRATIS?",
    a: 'Sí. Arcade Vault es un proyecto sin fines de lucro hecho por amor a los clásicos. No hay versión "premium" escondida.',
  },
  {
    q: "¿NECESITO CREAR CUENTA?",
    a: "No. Puedes jugar como invitado. Si quieres guardar tu puntuación y aparecer en el ranking, regístrate en 10 segundos.",
  },
  {
    q: "¿CÓMO SOBREVIVEN SIN COBRAR?",
    a: "Es un proyecto comunitario. Si te gusta, compártelo. Esa es toda la moneda que aceptamos.",
  },
];

export default function Pricing() {
  return (
    <Reveal as="section" className="mx-auto my-20 max-w-[1320px] px-8">
      <SectionHead kicker="// 04" title="PRECIOS" color="green" />
      <div className="grid grid-cols-1 items-stretch gap-6 min-[901px]:grid-cols-2">
        <div className="price-card flex flex-col gap-3.5 px-7 py-8">
          <div className="pixel text-[9px] tracking-[0.22em] text-[color:var(--ink-dim)]">
            PLAN ÚNICO
          </div>
          <div className="pixel text-base tracking-[0.08em] text-[color:var(--green)] [text-shadow:0_0_10px_rgba(0,255,136,0.5)]">
            JUGADOR VAULT
          </div>
          <div className="mt-1.5 flex items-baseline gap-2.5">
            <span className="pc-amount-n font-[family-name:var(--pixel)] text-[64px] tracking-[0.02em]">
              $0
            </span>
            <span className="font-[family-name:var(--pixel)] text-[11px] tracking-[0.16em] text-[color:var(--ink-dim)]">
              / SIEMPRE
            </span>
          </div>
          <div className="pixel text-[9px] tracking-[0.18em] text-[color:var(--yellow)] [text-shadow:0_0_6px_rgba(245,255,0,0.45)]">
            SIN TRUCOS · SIN LETRA PEQUEÑA
          </div>
          <ul className="pc-list mt-2.5 mb-1 flex list-none flex-col gap-2 p-0">
            {PERKS.map((p) => (
              <li
                key={p}
                className="font-[family-name:var(--mono)] text-[13px] tracking-[0.02em] text-[color:var(--ink)]"
              >
                ✔ {p}
              </li>
            ))}
          </ul>
          <Link href="/auth" className="btn xl pulse w-full justify-center">
            EMPEZAR GRATIS →
          </Link>
          <div className="mt-1 text-center font-[family-name:var(--mono)] text-[11px] tracking-[0.1em] text-[color:var(--ink-faint)]">
            No pedimos tarjeta. Nunca lo haremos.
          </div>
          <div className="pc-stamp px-[18px] py-2.5 text-center font-[family-name:var(--pixel)] text-[13px] leading-[1.15] tracking-[0.16em]">
            FREE
            <br />
            PLAY
          </div>
        </div>

        <div className="flex flex-col justify-center gap-3.5">
          {FAQ.map((f) => (
            <div key={f.q} className="faq-item px-5 py-[18px]">
              <div className="pixel mb-2 text-[10px] tracking-[0.12em] text-[color:var(--ink)]">
                {f.q}
              </div>
              <div className="font-[family-name:var(--mono)] text-[13px] leading-[1.6] text-[color:var(--ink-dim)]">
                {f.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
