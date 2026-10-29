// Slide content lives in docs/contenu/*.md; files are read as raw text (`?raw`) by both Vite and the Remotion bundler.
import ouverture from '../../docs/contenu/00-ouverture.md?raw';
import lexiqueSlides from '../../docs/contenu/01-lexique.md?raw';
import modeles from '../../docs/contenu/02-modeles.md?raw';
import materiel from '../../docs/contenu/03-materiel.md?raw';
import moteurs from '../../docs/contenu/04-moteurs.md?raw';
import plateforme from '../../docs/contenu/05-plateforme.md?raw';
import usages from '../../docs/contenu/06-usages.md?raw';
import conclusion from '../../docs/contenu/07-conclusion.md?raw';
import lexique from '../../docs/contenu/lexique.md?raw';
import { parseGlossary, parseSlides } from './parse';
import { buildSlides } from './render';

// Deck order: files in this order, then slides in the order they appear in each file
const FILES: [string, string][] = [
  ['00-ouverture.md', ouverture],
  ['01-lexique.md', lexiqueSlides],
  ['02-modeles.md', modeles],
  ['03-materiel.md', materiel],
  ['04-moteurs.md', moteurs],
  ['05-plateforme.md', plateforme],
  ['06-usages.md', usages],
  ['07-conclusion.md', conclusion],
];

export const CONTENT_SLIDES = buildSlides(
  FILES.flatMap(([file, source]) => parseSlides(file, source)),
  parseGlossary(lexique),
);
