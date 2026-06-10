# Daszz

A premium skincare intelligence platform launch website — private reveal experience counting down to June 12, 2026 at 10:00 AM IST, with early-access waitlist signup, SEO content pages, and a 3D face visualization.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Web: React + Vite, Tailwind CSS v4, Framer Motion, Three.js / @react-three/fiber, wouter, react-helmet-async
- Fonts: DM Sans (body), Cormorant Garamond (display — loaded via Google Fonts in index.html)
- API: Express 5
- DB: PostgreSQL + Drizzle ORM (`earlyAccessLeads` table: id, name, email UNIQUE, source, launch_campaign, created_at)
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/daszz/src/` — web artifact
  - `pages/Home.tsx` — homepage with all homepage sections
  - `pages/About.tsx`, `Learn.tsx`, `SkincareIntelligence.tsx`, `DigitalSkinTwin.tsx`, `SkinTracking.tsx`, `PersonalizedSkincare.tsx` — SEO/content pages
  - `components/` — all homepage section components + shared
  - `components/learn/ArticleLayout.tsx`, `ArticleCard.tsx` — article rendering
  - `components/seo/` — PageSEO, JsonLd, Breadcrumb
  - `components/EarlyAccessCta.tsx` — shared green CTA block used on all SEO pages
  - `content/learn/` — article data and MDX-style content
  - `lib/early-access.ts` — POST /api/early-access submit helper
  - `lib/analytics.ts` — GA_EVENTS helpers
  - `lib/launch-config.ts` — LAUNCH_TIME, CAMPAIGN_START, APP_URL constants
  - `lib/seo.ts` — PAGE_META for all pages, SITE_URL, structured data helpers
- `artifacts/api-server/src/` — Express API
- `lib/db/` — Drizzle schema + migrations

## Architecture decisions

- Contract-first: OpenAPI spec → Orval codegen → typed React Query hooks + Zod schemas
- Green color system via CSS custom properties in `src/index.css` — not Tailwind config overrides
- `font-display` Tailwind class maps to `Cormorant Garamond` via CSS; `font-sans` maps to `DM Sans`
- Countdown, launch gate, and live state all computed client-side from `LAUNCH_TIME` constant
- Three.js face uses green palette (`#8FCFB0`, `#6FAF91`, `#2F6B55`) with WebGL availability check + `SceneFallback` for reduced-motion/no-WebGL contexts

## Product

Premium skincare intelligence launch site with:
- Live countdown to June 12, 2026 reveal
- Early-access waitlist (name + email → Postgres, deduped by email)
- 8 SEO article pages under `/learn/`
- 4 product vision pages (Skincare Intelligence, Digital Skin Twin, Skin Tracking, Personalized Skincare)
- About page
- 3D animated face visualization (Three.js, with green color palette)

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- `pnpm --filter @workspace/daszz run typecheck` will show errors from unused shadcn/ui boilerplate in `src/components/ui/` — these are template artifacts, none are imported by the actual app
- Green palette must use inline styles or CSS custom properties, NOT Tailwind `green-*` utilities (those map to Tailwind's default green scale, not the Daszz palette)
- `scrollToEarlyAccess()` navigates to `/#early-access` on non-home pages via `window.location.href`, then smooth-scrolls on the home page
- Duplicate email signup → 409 status → `status === "duplicate"` state in EarlyAccessForm

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
