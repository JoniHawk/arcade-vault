# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Arcade Vault: online games platform where players compete for highest score. README says it follows Spec Driven Design (`/spec`, `/spec-impl` skills from `Klerith/fernando-skills`, installed via `npx skills@latest add Klerith/fernando-skills`). Currently a fresh create-next-app scaffold (only `app/layout.tsx`, `app/page.tsx`, `app/globals.css`).

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` / `npm start` — production build / serve
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`)
- No test runner configured.

## Stack / Architecture notes

- Next.js 16.4.5, React 19.3, TypeScript strict, Tailwind v4 (wired via `@tailwindcss/turbopack` loader rule in `next.config.ts`, not PostCSS).
- App Router at root `app/` (no `src/`). Path alias `@/*` → repo root.
- `next.config.ts` enables `cacheComponents`, `partialPrefetching`, `experimental.agentFeedback`. `cacheComponents` changes caching/dynamic-rendering semantics vs. older Next — check docs before using data fetching, `use cache`, or dynamic APIs.
- **Next.js here has breaking changes vs. training data.** Per `AGENTS.md`, read relevant guide in `node_modules/next/dist/docs/` (`01-app`, `02-pages`, `03-architecture`, `04-community`) before writing code; heed deprecations.
