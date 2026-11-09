import Link from "next/link";

export default function NotFound() {
  return (
    <div className="fade-in px-4 py-24 text-center">
      <div className="pixel neon-magenta text-[40px] sm:text-[56px]">404</div>
      <h1 className="pixel neon-cyan mt-6 text-sm sm:text-lg">
        PÁGINA NO ENCONTRADA
      </h1>
      <p className="mono mt-4 text-xs tracking-[0.16em] text-[color:var(--ink-dim)]">
        ESTA PARTIDA NO EXISTE · INSERTA OTRA MONEDA
      </p>
      <div className="mt-8">
        <Link href="/" className="btn lg">
          VOLVER AL VAULT
        </Link>
      </div>
    </div>
  );
}
