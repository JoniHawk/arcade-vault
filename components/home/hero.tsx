import Link from "next/link";
import FloatingSilhouettes from "@/components/home/floating-silhouettes";

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-60px)] items-center justify-center overflow-hidden px-8 pt-20 pb-[60px]">
      <FloatingSilhouettes />
      <div className="relative z-[3] max-w-[1100px] text-center">
        <div className="hero-eyebrow pixel neon-yellow mb-6 text-[11px] tracking-[0.24em]">
          ▸ INSERTA UNA MONEDA<span className="blink">_</span>
        </div>
        <h1 className="home-title m-0 flex flex-col gap-2 font-[family-name:var(--pixel)] text-[clamp(32px,7vw,88px)] leading-[1.05] tracking-[0.04em]">
          <span className="line-1">EL ARCADE</span>
          <span className="line-2">CLÁSICO ESTÁ</span>
          <span className="line-3">DE VUELTA</span>
        </h1>
        <p className="mx-auto mt-7 mb-9 max-w-[640px] text-[15px] leading-[1.7] tracking-[0.04em] text-[color:var(--ink-dim)]">
          Juega los mejores clásicos directamente en tu navegador.
          <br />
          Sin descargas. Sin costo. Solo diversión.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/games" className="btn xl pulse">
            ▶ EXPLORAR JUEGOS
          </Link>
          <Link href="/auth" className="btn xl magenta">
            ✦ CREAR CUENTA
          </Link>
        </div>
      </div>
      <div
        className="hero-scroll absolute bottom-6 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 font-[family-name:var(--pixel)] text-[9px] tracking-[0.2em] text-[color:var(--ink-faint)]"
        aria-hidden="true"
      >
        <span>DESLIZA</span>
        <span className="arrow">▼</span>
      </div>
    </section>
  );
}
