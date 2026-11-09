# SPEC 01 — MVP visual: todas las pantallas de Arcade Vault

> **Status:** Implementado
> **Depends on:** ninguna
> **Date:** 2026-11-09
> **Objective:** Implementar en Next.js las 5 pantallas de la plantilla `references/resources/templates/` (biblioteca, detalle, reproductor, auth, salón de la fama) como UI navegable con datos mock, sin ningún juego real.

## Por qué existe esta spec

La plantilla es un SPA React con Babel y hash-routing. Hay que traducirla al stack real (Next.js App Router, TypeScript, Tailwind v4) sin perder el diseño neón/CRT. Se separa de los juegos reales para validar primero toda la capa visual.

## Alcance

**Dentro:**

- 5 pantallas como rutas App Router: `/`, `/juegos/[id]`, `/juegos/[id]/jugar`, `/auth`, `/salon`.
- Nav (con menú móvil/hamburguesa) y footer compartidos en `app/layout.tsx`.
- Datos mock (8 juegos, categorías, jugadores, `seededScores`) portados a TypeScript.
- Login/registro simulados con persistencia en `localStorage` (`av_user`, `av_scores`).
- Reproductor simulado: HUD, marco CRT con arena decorativa, score aleatorio creciente, pausa, fin y modal Game Over con guardado de puntuación.
- Búsqueda y filtro por categoría en la biblioteca (estado cliente).
- Maquetación con utilidades Tailwind; las clases de `app/globals.css` se reutilizan para efectos complejos (neón, CRT, tilt, animaciones, podio). `globals.css` se revisa y ajusta si falta algo.
- Responsive (el nav de la plantilla ya define panel móvil).

**Fuera de alcance (specs futuras):**

- Cualquier juego real (lógica, canvas, input).
- Backend, base de datos, auth real (OAuth Google/GitHub, hash de claves, sesiones).
- Rankings reales compartidos entre usuarios.
- Tests automatizados (no hay runner configurado).
- Contador de créditos funcional (queda fijo en `CRÉDITOS · 03`).
- Internacionalización (la UI queda solo en español).

## Modelo de datos

```ts
// lib/data.ts
export type Category = "ARCADE" | "PUZZLE" | "SHOOTER" | "VERSUS";
export type Game = {
  id: string;          // slug: "bloque-buster", "caida", ...
  title: string;
  short: string;
  long: string;
  cat: Category;
  cover: string;       // clase CSS: "cover-bricks", "cover-tetro", ...
  color: "cyan" | "magenta" | "green" | "yellow";
  best: number;
  plays: string;       // "12.4K"
};
export const GAMES: Game[];                 // 8 juegos de data.jsx
export const CATS: ["TODOS", ...Category[]];
export type ScoreRow = { rank: number; name: string; score: number; date: string };
export function seededScores(seed: number, count?: number): ScoreRow[];

// lib/session.tsx (localStorage)
export type User = { name: string };        // clave "av_user", max 10 chars, mayúsculas
export type SavedScore = { game: string; score: number; name: string; at: number }; // clave "av_scores": SavedScore[]
```

Convenciones:

- Números con `toLocaleString("es-ES")`.
- `seededScores` es determinista: detalle usa `id.length * 17 + 3` (10 filas), salón usa `tab.length * 23 + 7` (12 filas).
- Lecturas de `localStorage` solo tras montar (evitar hydration mismatch) y dentro de `try/catch`.

## Estructura de archivos

```
app/layout.tsx                    (modifica: SessionProvider, Nav, footer)
app/page.tsx                      Biblioteca
app/juegos/[id]/page.tsx          Detalle (notFound si id inválido)
app/juegos/[id]/jugar/page.tsx    Reproductor
app/auth/page.tsx                 Auth
app/salon/page.tsx                Salón de la Fama
app/not-found.tsx                 404 con estilo del sitio
lib/data.ts, lib/session.tsx, lib/scores.ts
components/nav.tsx, footer.tsx, game-card.tsx, library.tsx,
  leaderboard.tsx, auth-form.tsx, game-player.tsx, hall-of-fame.tsx
```

Los nombres exactos de componentes pueden ajustarse en implementación si las rutas y responsabilidades se mantienen.

## Plan de implementación

1. Leer en `node_modules/next/dist/docs/01-app` las guías de routing dinámico (`params`), Client Components, `cacheComponents` y `next/font`. Anotar restricciones antes de escribir código.
2. Revisar `app/globals.css` contra `references/resources/templates/styles.css`: confirmar que están todas las clases y variables usadas. Ajustar lo que falte. Verificar: `npm run dev` carga fondo `av-bg`/`av-noise` sin errores.
3. Crear `lib/data.ts` con tipos, `GAMES`, `CATS`, `PLAYERS`, `seededScores`. Verificar: `npm run lint` pasa.
4. Crear `lib/session.tsx` (`SessionProvider`, `useSession` con `user`, `login`, `signOut`) y `lib/scores.ts` (`saveScore`). Verificar: lint y build pasan.
5. Crear `components/nav.tsx` y `footer.tsx` y montarlos en `app/layout.tsx` con el provider. Verificar: nav visible en `/`, enlaces a `/` y `/salon`, panel móvil abre y cierra.
6. Biblioteca: `game-card.tsx` (tilt 3D con mouse), `library.tsx` (búsqueda, chips, estado vacío) y `app/page.tsx`. Verificar: filtrar por texto y categoría; clic en tarjeta navega a `/juegos/[id]`.
7. Detalle: `leaderboard.tsx` y `app/juegos/[id]/page.tsx`, con `notFound()` para id inexistente. Verificar: `/juegos/caida` muestra datos; `/juegos/xxx` muestra 404.
8. Auth: `auth-form.tsx` (tabs entrar/crear, invitado, botones sociales inertes) y `app/auth/page.tsx`. Verificar: enviar formulario guarda `av_user` y redirige a `/`; nav muestra el nombre.
9. Salón: `hall-of-fame.tsx` (chips por juego, podio, tabla, fila "tu mejor marca" si hay usuario) y `app/salon/page.tsx`. Verificar: cambiar de juego cambia podio y tabla.
10. Reproductor: `game-player.tsx` y `app/juegos/[id]/jugar/page.tsx` (HUD, CRT, pausa, FIN, modal, guardar en `av_scores`, jugar de nuevo). Verificar: score sube; pausa lo detiene; guardar escribe en `localStorage`.
11. Pulido final: `app/not-found.tsx`, metadata por página, revisión responsive. Verificar: `npm run lint` y `npm run build` sin errores.

## Criterios de aceptación

- [ ] `npm run lint` termina sin errores.
- [ ] `npm run build` termina sin errores.
- [ ] Existen las rutas `/`, `/juegos/[id]`, `/juegos/[id]/jugar`, `/auth`, `/salon` y responden 200 para ids válidos.
- [ ] `/juegos/inexistente` y `/juegos/inexistente/jugar` muestran 404.
- [ ] La biblioteca muestra 8 tarjetas; el chip `SHOOTER` deja 2; buscar `zzz` muestra "NO HAY RESULTADOS".
- [ ] Clic en una tarjeta o su botón JUGAR lleva a `/juegos/[id]` del juego correcto.
- [ ] El detalle muestra título, descripción larga, tags, estadísticas y 10 filas de puntuaciones con top 1–3 diferenciados.
- [ ] "JUGAR AHORA" lleva a `/juegos/[id]/jugar`; "VOLVER AL VAULT" lleva a `/`.
- [ ] En `/auth`, enviar el formulario guarda `av_user` en `localStorage` (nombre en mayúsculas, máximo 10 caracteres) y redirige a `/`.
- [ ] La pestaña "CREAR CUENTA" muestra el campo de correo; "INICIAR SESIÓN" lo oculta.
- [ ] "JUGAR COMO INVITADO" redirige a `/` sin guardar usuario.
- [ ] Con sesión iniciada, el nav muestra el nombre; clic lo cierra y borra `av_user`.
- [ ] El salón muestra podio (3 puestos) y 12 filas; cambiar de juego cambia los datos; con usuario aparece la fila "TU MEJOR MARCA".
- [ ] En el reproductor la puntuación sube sola; PAUSA la detiene y muestra "EN PAUSA"; REANUDAR la retoma.
- [ ] FIN abre el modal "FIN DEL JUEGO" con la puntuación final.
- [ ] GUARDAR PUNTUACIÓN añade una entrada a `av_scores` con `game`, `score`, `name`, `at` y muestra "PUNTUACIÓN GUARDADA".
- [ ] JUGAR DE NUEVO reinicia score, vidas y nivel; SALIR lleva a `/juegos/[id]`.
- [ ] A 375 px de ancho no hay scroll horizontal y el nav usa el menú hamburguesa.
- [ ] Recargar la página con sesión iniciada no produce errores de hidratación en consola.
- [ ] Las páginas se maquetan con utilidades Tailwind; `globals.css` solo aporta clases de efectos y tokens.

## Decisiones

- **Sí:** rutas App Router reales. URLs compartibles, idiomático en Next. Se descarta el hash-SPA de la plantilla.
- **Sí:** Tailwind v4 para maquetación + clases existentes de `globals.css` para efectos complejos. Evita reescribir 900 líneas de CSS sin ganar nada.
- **No:** migrar todo `globals.css` a utilidades. Mucho trabajo y riesgo de divergir del diseño.
- **Sí:** mock en `localStorage` (`av_user`, `av_scores`) como la plantilla. Sin backend en esta fase.
- **No:** persistencia real o auth real. Va en otra spec.
- **Sí:** reproductor con simulación. Permite validar HUD, pausa y modal antes de tener juegos.
- **Sí:** datos mock tipados en `lib/data.ts`. Cuando haya backend se sustituye la fuente sin tocar los componentes.
- **Sí:** estado del salón (juego activo) como estado cliente, no en la URL. Es lo que hace la plantilla; query param queda para otra spec si se necesita.
- **Sí:** "tu mejor marca" en el salón queda mock como en la plantilla (no lee `av_scores`).

## Riesgos

| Riesgo | Mitigación |
| --- | --- |
| Next 16 con `cacheComponents` cambia semántica de datos dinámicos y `params` | Paso 1 lee la documentación local; datos son estáticos y viven en módulos. |
| Hydration mismatch al leer `localStorage` | Leer solo en `useEffect` tras montar; render inicial como invitado. |
| `localStorage` bloqueado (modo privado) | `try/catch` en todas las lecturas/escrituras; la app funciona sin persistir. |
| `globals.css` incompleto frente a la plantilla | Paso 2 lo audita antes de construir componentes. |
| Tilt 3D y animaciones en móvil | El tilt solo reacciona a `mousemove`; respetar `prefers-reduced-motion` si el CSS ya lo contempla. |

## Qué **no** está en esta spec

- Ningún juego real (lógica, canvas, controles).
- Backend, base de datos, OAuth, sesiones reales.
- Rankings compartidos entre usuarios.
- Tests automatizados.
- Créditos funcionales.
- Internacionalización.

Cada uno, si llega, va en su propia spec.
