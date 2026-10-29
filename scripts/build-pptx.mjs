// Builds the offline backup deck out/slides.pptx:
// renders the last frame (resting state) of every slide to out/stills/<id>.png, then assembles them in deck order.
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { bundle } from '@remotion/bundler';
import { getCompositions, renderStill } from '@remotion/renderer';
import PptxGenJS from 'pptxgenjs';
import { webpackOverride } from '../remotion/webpack-override.mjs';

const STILLS_DIR = 'out/stills';
mkdirSync(STILLS_DIR, { recursive: true });

const serveUrl = await bundle({ entryPoint: path.resolve('remotion/index.ts'), webpackOverride });
// Compositions are returned in the order of src/deck.ts
const compositions = await getCompositions(serveUrl);

const pptx = new PptxGenJS();
pptx.layout = 'LAYOUT_WIDE'; // 16:9
pptx.title = 'Une plateforme IA à la demande, 100 % open source';
pptx.author = 'Julien Del Rio';

for (const composition of compositions) {
  const output = `${STILLS_DIR}/${composition.id}.png`;
  console.log(`Rendering ${composition.id}...`);
  await renderStill({ composition, serveUrl, output, frame: composition.durationInFrames - 1 });
  pptx.addSlide().addImage({ path: output, x: 0, y: 0, w: '100%', h: '100%' });
}

await pptx.writeFile({ fileName: 'out/slides.pptx' });
console.log(`out/slides.pptx written (${compositions.length} slides)`);
