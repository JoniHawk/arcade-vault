# SPEC 02 — Home como landing page y Biblioteca en `/games`

> **Status:** Implementado
> **Depends on:** SPEC 01
> **Date:** 2026-11-09
> **Objective:** Implementar la landing page de `references/resources/templates/home-about/home.jsx` en `/` y mover la Biblioteca actual a `/games`.

## Por qué existe esta spec

En SPEC 01 `/` es la Biblioteca. La plantilla `home-about` define una landing (hero, features, preview de juegos, stats, actividad, precios, CTA final) que pasa a ser la puerta de entrada. La Biblioteca se mueve a `/games`, lo que obliga a revisar enlaces y nav.

## Alcance

**Dentro:**

- Nueva landing en `/` con 7 bloques de `home.jsx`: hero con silhouettes flotantes, "¿Por qué Arcade Vault?", "Juegos disponibles ahora", stats, "Actividad en vivo", precios + FAQ, CTA final.
- Biblioteca existente movida a `/games` sin cambios funcionales.
- Nav (escritorio y panel móvil): añadir "Inicio" (`/`); "Biblioteca" apunta a `/games`; el logo apunta a `/`.
- Actualizar enlaces que significan "volver a la biblioteca" para que apunten a `/games`.
- Preview de juegos: primeros 6 de `GAMES`, cada tarjeta enlaza a `/juegos/[id]`.
- Animación `reveal` al hacer scroll (IntersectionObserver) respetando `prefers-reduced-motion`.
- Datos mock de actividad, top jugadores y stats como constantes tipadas en `lib/data.ts`.
- Estilos: layout con utilidades Tailwind; efectos complejos (silhouettes, reveal, ticker, neón, pulse, blink, sello de precio) como clases en `app/globals.css`.
- Responsive: sin scroll horizontal a 375 px.

**Fuera de alcance (specs futuras):**

- Página "Acerca de" (`about.jsx`) y su enlace en el nav.
- Migrar `/juegos/[id]` y `/juegos/[id]/jugar` a `/games/...` (queda mezcla `/games` + `/juegos`, deuda anotada).
- Datos reales para actividad, ranking o stats (todo mock fijo).
- Registro real al pulsar "CREAR CUENTA" / "EMPEZAR GRATIS" (solo navega a `/auth`).
- Pasarela de pago o planes reales (el plan es solo texto informativo).
- Internacionalización y tests automatizados.

## Modelo de datos

```ts
// lib/data.ts (se añade)
export type LiveScore = {
  player: string;          // "NEONFOX"
  game: string;            // título legible: "Caída"
  score: number;
  ago: string;             // "hace 2 min"
  color: "cyan" | "magenta" | "green" | "yellow";
};
export type TopPlayer = { rank: number; player: string; score: number };
export type HomeStat = { value: string; unit: string; sub: string }; // "12+", "JUEGOS", "Y CONTANDO"

export const LIVE_SCORES: LiveScore[];    // 7 filas, valores de home.jsx
export const TOP_PLAYERS_TODAY: TopPlayer[]; // 5 filas, valores de home.jsx
export const HOME_STATS: HomeStat[];      // 3 bloques, valores de home.jsx
```

Convenciones:

- Valores idénticos a `home.jsx` (NEONFOX, PX_KAI, etc.), fijos entre renders.
- Números con `toLocaleString("es-ES")`.
- Los textos de features, precios y FAQ viven en sus componentes (contenido estático, no datos).

## Estructura de archivos

```
app/page.tsx                  (reemplaza: ahora renderiza la landing)
app/games/page.tsx            (nuevo: renderiza <Library />, antes en app/page.tsx)
lib/data.ts                   (modifica: LIVE_SCORES, TOP_PLAYERS_TODAY, HOME_STATS)
app/globals.css               (modifica: clases de la home que falten)
components/nav.tsx            (modifica: "Inicio", rutas, estados activos)
components/home/hero.tsx, floating-silhouettes.tsx, features.tsx,
  games-preview.tsx, stats.tsx, live-activity.tsx, pricing.tsx,
  final-cta.tsx, reveal.tsx
components/game-player.tsx, hall-of-fame.tsx, app/juegos/[id]/page.tsx
                              (modifican: enlace "volver" → /games)
```

Los nombres exactos de componentes pueden ajustarse en implementación si rutas y responsabilidades se mantienen.

## Plan de implementación

1. Leer en `node_modules/next/dist/docs/01-app` lo necesario sobre Server vs Client Components, `Link` y metadata con `cacheComponents`. Anotar restricciones antes de escribir código.
2. Crear `app/games/page.tsx` con `<Library />` y metadata. Verificar: `/games` muestra la biblioteca idéntica a la actual.
3. Actualizar enlaces "volver a la biblioteca" a `/games` en `components/game-player.tsx`, `components/hall-of-fame.tsx` y `app/juegos/[id]/page.tsx`. Verificar: cada botón lleva a `/games`.
4. Actualizar `components/nav.tsx`: añadir "Inicio" (activo solo en `/`), "Biblioteca" → `/games` (activa en `/games` y `/juegos/*`), logo → `/`; igual en el panel móvil. Verificar: navegar entre las tres secciones marca la activa correcta.
5. Añadir `LIVE_SCORES`, `TOP_PLAYERS_TODAY` y `HOME_STATS` a `lib/data.ts`. Verificar: `npm run lint` pasa.
6. Auditar `app/globals.css` contra `references/resources/templates/home-about/styles.css`: portar solo las clases de efectos de la home que falten (silhouettes `s1`–`s8`, `reveal`, ticker, top-list, sello de precio, scroll hint). Verificar: `npm run dev` carga sin errores de CSS.
7. Crear `components/home/reveal.tsx` (Client Component con IntersectionObserver, desactivado con `prefers-reduced-motion`) y `floating-silhouettes.tsx`. Verificar: componentes montables sin errores de consola.
8. Hero: `components/home/hero.tsx` con título en 3 líneas, subtítulo, CTAs (`/games`, `/auth`) y "DESLIZA". Reemplazar `app/page.tsx` por la landing con solo el hero. Verificar: `/` muestra hero; "EXPLORAR JUEGOS" lleva a `/games`; "CREAR CUENTA" a `/auth`.
9. Bloques "¿Por qué Arcade Vault?" (`features.tsx`, 4 tarjetas con iconos pixel) y "Juegos disponibles ahora" (`games-preview.tsx`, 6 tarjetas + "VER TODOS LOS JUEGOS"). Verificar: tarjeta lleva a `/juegos/[id]`; botón a `/games`.
10. Bloques `stats.tsx` y `live-activity.tsx` (últimas puntuaciones + top jugadores con enlace "VER SALÓN" a `/salon`). Verificar: 7 filas de ticker, 5 filas de top con #01–#03 diferenciados.
11. Bloques `pricing.tsx` (plan + 3 FAQ) y `final-cta.tsx`; envolver secciones con `Reveal`. Verificar: "EMPEZAR GRATIS" a `/auth`; "INSERTAR MONEDA" a `/games`.
12. Pulido: metadata de `/`, revisión responsive a 375 px, `npm run lint` y `npm run build`.

## Criterios de aceptación

- [ ] `npm run lint` termina sin errores.
- [ ] `npm run build` termina sin errores.
- [ ] `/` muestra la landing (hero + 6 secciones) y `/games` muestra la biblioteca con 8 tarjetas.
- [ ] El chip `SHOOTER` en `/games` deja 2 tarjetas y buscar `zzz` muestra "NO HAY RESULTADOS" (sin regresión de SPEC 01).
- [ ] El nav muestra "Inicio", "Biblioteca" y "Salón de la Fama"; no muestra "Acerca de".
- [ ] "Inicio" solo está activo en `/`; "Biblioteca" está activa en `/games` y `/juegos/caida`.
- [ ] El logo del nav lleva a `/`.
- [ ] "EXPLORAR JUEGOS", "VER TODOS LOS JUEGOS" e "INSERTAR MONEDA" llevan a `/games`.
- [ ] "CREAR CUENTA" y "EMPEZAR GRATIS" llevan a `/auth`.
- [ ] La sección "Juegos disponibles ahora" muestra exactamente 6 tarjetas; clic en una lleva a `/juegos/[id]` del juego correcto.
- [ ] La sección de features muestra 4 tarjetas; la de stats muestra 3 bloques con "12+", "MILES" y "GLOBAL".
- [ ] "Últimas puntuaciones" muestra 7 filas; "Top jugadores · hoy" muestra 5 filas; "VER SALÓN →" lleva a `/salon`.
- [ ] La sección de precios muestra el plan "JUGADOR VAULT" a `$0` y 3 preguntas FAQ.
- [ ] Los botones "volver" de detalle, reproductor y salón llevan a `/games`.
- [ ] Las secciones con `reveal` aparecen al hacer scroll; con `prefers-reduced-motion: reduce` aparecen sin animación.
- [ ] A 375 px de ancho no hay scroll horizontal en `/` y el nav usa el menú hamburguesa.
- [ ] Recargar `/` no produce errores de hidratación en consola.
- [ ] El login y "JUGAR COMO INVITADO" de `/auth` siguen redirigiendo a `/`.

## Decisiones

- **Sí:** Home en `/`, Biblioteca en `/games`. Decisión del usuario: la home es la landing.
- **Sí:** dejar `/juegos/[id]` y `/juegos/[id]/jugar`. Cambio mínimo; la inconsistencia `/games` vs `/juegos` queda como deuda.
- **No:** migrar detalle y reproductor a `/games/...`. Toca más archivos y criterios de SPEC 01.
- **Sí:** "Acerca de" en spec aparte. Mantiene esta spec acotada a una pantalla.
- **Sí:** mock como constantes tipadas en `lib/data.ts`. Estables en servidor y cliente, fáciles de sustituir por backend.
- **No:** derivar actividad de `seededScores`. Cambiaría los valores respecto a la plantilla sin aportar nada.
- **Sí:** layout con Tailwind y efectos en `globals.css`, igual que SPEC 01. Evita copiar ~100 reglas de CSS.
- **Sí:** los botones "volver a la biblioteca" apuntan a `/games`; el redirect post-login, invitado y el botón del 404 se quedan en `/`. Mantiene los criterios de SPEC 01 y evita decidir un cambio no pedido.
- **Sí:** contenido de features, precios y FAQ dentro de sus componentes. Es copy estático, no datos.

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Enlaces a `/` que antes significaban "biblioteca" quedan mal | Paso 3 y 4 los actualizan explícitamente; criterio de aceptación los verifica. |
| `reveal` oculta contenido si JS falla o el observer no dispara | Contenido visible por defecto sin JS; la clase de ocultar solo se aplica tras montar. |
| Hydration mismatch con animaciones o `toLocaleString` | Datos fijos, formateo con `es-ES` determinista; efectos solo en `useEffect`. |
| Silhouettes flotantes causan scroll horizontal en móvil | `overflow: hidden` en el hero; verificación a 375 px. |
| Next 16 con `cacheComponents` cambia semántica de metadata/rutas | Paso 1 lee la documentación local; todo el contenido es estático. |
| `globals.css` diverge de la plantilla | Paso 6 audita y porta solo lo que falta. |

## Qué **no** está en esta spec

- Página "Acerca de".
- Migración de `/juegos/[id]` a `/games/[id]`.
- Datos reales de actividad, ranking o stats.
- Registro o pagos reales.
- Internacionalización y tests automatizados.

Cada uno, si llega, va en su propia spec.
