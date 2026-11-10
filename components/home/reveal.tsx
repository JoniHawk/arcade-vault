"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  as?: "section" | "div";
  className?: string;
  children: ReactNode;
};

// Aparece al entrar en el viewport. El contenido es visible hasta montar:
// la clase `reveal` (oculta) se añade en el efecto, así que sin JS no se pierde nada.
// Con `prefers-reduced-motion` no se activa.
export default function Reveal({ as: Tag = "div", className, children }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (!el.classList.contains("in")) el.classList.add("reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {children}
    </Tag>
  );
}
