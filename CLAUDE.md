# CLAUDE.md

Slides for the Capitole du Libre 2026 talk by Julien Del Rio.

## The talk

- **Title**: Une plateforme IA à la demande, 100 % open source : du GPU local au cloud souverain
- **When / where**: Saturday 14 November 2026, 15:00–15:55 (55 min, Q&A included), room A202, Capitole du Libre, Toulouse
- **Audience**: developers and sovereign-hosting experts
- **Language**: French (slide content in French; code, comments and commits in English)
- **Abstract**: https://capitoledulibre.org/programme/talk/LSBRQY/
- **Storyline**: an on-demand AI platform covering the whole chain, from local GPUs to large clouds, with a fully open source orchestration layer:
  - 3× RTX 6000 Pro running open-weights Qwen-family models served by **vLLM**
  - **LiteLLM** as the single OpenAI-compatible gateway
  - **Open WebUI** as the self-hosted chat interface
  - Tiered routing: internal models first, then larger models hosted in France, US clouds only when needed (e.g. agentic development)
  - Architecture, pitfalls, and lessons learned from 4 months of POC + 2 months in production (Numih France internal AI programme)

## Stack

- **Remotion** (pinned, exact version) for slides as animated React compositions, 1920×1080 @ 30 fps
- **Vite + React** web presenter (`@remotion/player`), deployed to **GitHub Pages** by `.github/workflows/deploy.yml` on push to `main`
- **PPTX backup** for offline use: `scripts/build-pptx.mjs` renders the last frame of each slide with `@remotion/renderer` and assembles them with `pptxgenjs`

## Layout

- `src/deck.ts` — ordered list of slides: single source of truth for the presenter, the Remotion Studio and the PPTX
- `src/slides/` — one component per slide
- `src/theme.ts` — dimensions, colors, fonts
- `src/web/` — browser presenter (keyboard navigation, `#n` hash = current slide, `f` = fullscreen)
- `remotion/` — Remotion entry point (`registerRoot`) registering every slide as a composition
- `.agents/skills/` — Remotion Agent Skills (`npx remotion skills add` recreates the `.claude/skills` symlinks, which are git-ignored)

## Commands

- `npm run dev` — presenter in the browser
- `npm run studio` — Remotion Studio to design / preview slides
- `npm run build` — typecheck + production build to `dist/`
- `npm run pptx` — offline backup deck in `out/slides.pptx` (stills in `out/stills/`)

## Conventions

- Each slide's `durationInFrames` is its entrance animation length; **the last frame must be the complete resting state** (it is what the PPTX shows and where the player stops).
- Animations must be driven by `useCurrentFrame()` / `interpolate()` / `spring()` only, never CSS transitions or timers, so renders are deterministic.
- Keep assets local (`public/`, `staticFile()`), no runtime CDN: the talk must work offline.
- After changing slides, check both outputs: `npm run build` and `npm run pptx` (then look at the stills).
