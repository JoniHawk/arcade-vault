import Link from "next/link";
import Reveal from "@/components/home/reveal";

export default function FinalCta() {
  return (
    <Reveal
      as="section"
      className="home-final mx-auto max-w-[900px] px-8 pt-[100px] pb-[120px] text-center"
    >
      <h2 className="final-title pixel m-0 mb-9 text-[clamp(22px,4vw,40px)] tracking-[0.08em]">
        ¿LISTO PARA JUGAR?
      </h2>
      <Link href="/games" className="btn xl pulse px-11! py-6!">
        INSERTAR MONEDA →
      </Link>
      <div className="mt-7 text-[13px] tracking-[0.06em] text-[color:var(--ink-dim)]">
        Gratis. Sin registro obligatorio. Empieza en segundos.
      </div>
    </Reveal>
  );
}
