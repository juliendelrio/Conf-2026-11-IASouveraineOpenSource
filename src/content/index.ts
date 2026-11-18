// Slide content lives in docs/contenu/*.md; files are read as raw text (`?raw`) by both Vite and the Remotion bundler.
import ouverture from '../../docs/contenu/00-ouverture.md?raw';
import lexiqueSlides from '../../docs/contenu/01-lexique.md?raw';
import modeles from '../../docs/contenu/02-modeles.md?raw';
import materiel from '../../docs/contenu/03-materiel.md?raw';
import moteurs from '../../docs/contenu/04-moteurs.md?raw';
import plateforme from '../../docs/contenu/05-plateforme.md?raw';
import usages from '../../docs/contenu/06-usages.md?raw';
import conclusion from '../../docs/contenu/07-conclusion.md?raw';
import devfest from '../../docs/contenu/editions/devfest.md?raw';
import lexique from '../../docs/contenu/lexique.md?raw';
import { applyEdition } from './edition';
import { ContentError, parseGlossary, parseSlides } from './parse';
import { buildSlides } from './render';
import { chapterSeconds, withSchedule } from './schedule';

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

// The editions: the same talk given elsewhere, each file holding only what changes (see ./edition.ts)
const EDITIONS: Record<string, string> = { devfest };

export const EDITION_NAMES = Object.keys(EDITIONS);

/** The slides of the deck, or of one of its editions. */
export const contentSlides = (edition?: string) => {
  const base = FILES.flatMap(([file, source]) => parseSlides(file, source));
  if (edition !== undefined && !(edition in EDITIONS)) {
    throw new ContentError(`édition inconnue « ${edition} » (éditions possibles : ${EDITION_NAMES.join(', ')})`);
  }
  const contents = edition === undefined ? base : applyEdition(base, parseSlides(`editions/${edition}.md`, EDITIONS[edition]));
  return withSchedule(
    buildSlides(contents, parseGlossary(lexique)),
    contents,
    new Map(FILES.map(([file, source]) => [file, chapterSeconds(file, source)])),
  );
};
