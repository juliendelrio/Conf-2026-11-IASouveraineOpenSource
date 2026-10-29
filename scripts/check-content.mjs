// Checks the slide content in docs/contenu/*.md and prints the deck: number, id, clicks.
// Loads src/deck.ts through Vite (same `?raw` imports as the presenter), so content errors show up here first.
import { createServer } from 'vite';

const server = await createServer({ logLevel: 'error', server: { middlewareMode: true }, appType: 'custom' });
try {
  const { SLIDES } = await server.ssrLoadModule('/src/deck.ts');
  for (const [index, slide] of SLIDES.entries()) {
    const clicks = slide.pauses.length === 0 ? 'pas de clic' : `${slide.pauses.length} clic${slide.pauses.length > 1 ? 's' : ''}`;
    console.log(`${String(index + 1).padStart(2)}  ${slide.id.padEnd(22)} ${clicks.padEnd(12)} ${slide.durationInFrames} images`);
  }
  const total = SLIDES.reduce((sum, slide) => sum + slide.pauses.length, 0);
  console.log(`\n${SLIDES.length} slides, ${total} clics à l'intérieur des slides : contenu valide`);
} catch (error) {
  console.error(`\nContenu invalide : ${error.message}`);
  process.exitCode = 1;
} finally {
  await server.close();
}
