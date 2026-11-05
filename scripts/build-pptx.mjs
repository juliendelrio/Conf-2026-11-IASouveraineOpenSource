// Builds the offline backup deck out/slides.pptx:
// renders the last frame (resting state) of every slide to out/stills/<id>.png, then assembles them in deck order.
// An animation gets one image per step (the frame where the presenter waits for each click, then the end state),
// out/stills/<id>-1.png, <id>-2.png…, so the PPTX tells the same story as the presenter.
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';
import PptxGenJS from 'pptxgenjs';
import { createServer } from 'vite';
import { webpackOverride } from '../remotion/webpack-override.mjs';

const STILLS_DIR = 'out/stills';
mkdirSync(STILLS_DIR, { recursive: true });

// The click steps come from src/deck.ts, loaded through Vite like npm run check (same `?raw` imports)
const server = await createServer({ logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' });
const { SLIDES } = await server.ssrLoadModule('/src/deck.ts');
await server.close();
const steps = new Map(SLIDES.filter((slide) => slide.animated).map((slide) => [slide.id, slide.pauses]));

const serveUrl = await bundle({ entryPoint: path.resolve('remotion/index.ts'), webpackOverride });
// Compositions are returned in the order of src/deck.ts
const compositions = await getCompositions(serveUrl);

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 16:9
pptx.title = 'Une plateforme IA à la demande, 100 % souveraine, avec des outils open source';
pptx.author = 'Julien Del Rio';

let images = 0;
for (const composition of compositions) {
  const last = composition.durationInFrames - 1;
  const frames = steps.has(composition.id) ? [...steps.get(composition.id), last] : [last];
  for (const [index, frame] of frames.entries()) {
    const output = frames.length === 1 ? `${STILLS_DIR}/${composition.id}.png` : `${STILLS_DIR}/${composition.id}-${index + 1}.png`;
    console.log(`Rendering ${composition.id}${frames.length === 1 ? '' : ` (${index + 1}/${frames.length})`}...`);
    await renderStill({ composition, serveUrl, output, frame });
    pptx.addSlide().addImage({ path: output, x: 0, y: 0, w: '100%', h: '100%' });
    images++;
  }
}

await pptx.writeFile({ fileName: 'out/slides.pptx' });
console.log(`out/slides.pptx written (${compositions.length} slides, ${images} images)`);
