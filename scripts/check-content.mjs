// Checks the slide content in docs/contenu/*.md and prints the deck: number, planned start, id, clicks.
// Loads src/deck.ts through Vite (same `?raw` imports as the presenter), so content errors show up here first.
// `npm run check -- devfest` prints an edition instead (docs/contenu/editions/); every edition is validated anyway.
import { createServer } from 'vite';

const edition = process.argv[2];

const server = await createServer({ logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' });
try {
  const { deckFor } = await server.ssrLoadModule('/src/deck.ts');
  const { EDITION_NAMES } = await server.ssrLoadModule('/src/content/index.ts');
  const slides = deckFor(edition);
  for (const [index, slide] of slides.entries()) {
    const clicks = slide.pauses.length === 0 ? 'pas de clic' : `${slide.pauses.length} clic${slide.pauses.length > 1 ? 's' : ''}`;
    const start = `${Math.floor(slide.plannedStart / 60)}:${String(slide.plannedStart % 60).padStart(2, '0')}`;
    console.log(`${String(index + 1).padStart(2)}  ${start.padStart(5)}  ${slide.id.padEnd(22)} ${clicks.padEnd(12)} ${slide.durationInFrames} images`);
  }
  const total = slides.reduce((sum, slide) => sum + slide.pauses.length, 0);
  console.log(`\n${edition ? `Édition ${edition} : ` : ''}${slides.length} slides, ${total} clics à l'intérieur des slides : contenu valide`);
  for (const name of EDITION_NAMES.filter((name) => name !== edition)) {
    console.log(`Édition ${name} : ${deckFor(name).length} slides, contenu valide`);
  }
} catch (error) {
  console.error(`\nContenu invalide : ${error.message}`);
  process.exitCode = 1;
} finally {
  await server.close();
}
