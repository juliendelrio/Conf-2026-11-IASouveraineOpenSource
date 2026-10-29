// Parser for the slide content files in docs/contenu/ (syntax described in docs/contenu/README.md).
import type { Status, StatusKind } from '../components/Badge';

/** Keys allowed in `clé : valeur` lines; anything else written in lowercase is reported as a typo. */
const KEYS = [
  'type',
  'rubrique',
  'titre',
  'sous-titre',
  'signature',
  'badges',
  'pied',
  'clics',
  'largeurs',
  'taille',
  'ligne-surlignée',
  'numérotées',
  'valeur',
  'légende',
  'texte',
  'détail',
  'surligné',
  'chiffre',
  'objectif',
  'piège',
  'leçon',
  'exemple',
  'mesure',
] as const;

export type Key = (typeof KEYS)[number];

export type Table = { columns: string[]; rows: string[][] };

/** A slide or one of its `###` sections: fields, bullet items and an optional table. */
export type Block = {
  title: string;
  fields: Partial<Record<Key, string>>;
  items: string[];
  table?: Table;
};

export type SlideContent = Block & {
  /** The `## id` of the slide, also its Remotion composition id. */
  id: string;
  /** Content file, for error messages. */
  file: string;
  sections: Block[];
};

export class ContentError extends Error {}

const KEY_LINE = /^([a-zà-ÿ-]+)\s*:\s*(.*)$/u;

const newBlock = (title: string): Block => ({ title, fields: {}, items: [] });

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());

/**
 * Reads one content file. `#` titles, `####` notes (oral, compléments…), HTML comments and plain
 * paragraphs are ignored; `## id` starts a slide, `### titre` a section (card, step…).
 */
export const parseSlides = (file: string, source: string): SlideContent[] => {
  const slides: SlideContent[] = [];
  let slide: SlideContent | undefined;
  let block: Block | undefined;
  let inNotes = false;
  let tableLines: string[] = [];

  const fail = (message: string): never => {
    throw new ContentError(`${file}${slide ? ` › ${slide.id}` : ''} : ${message}`);
  };

  const flushTable = () => {
    if (tableLines.length === 0 || !block) return;
    if (tableLines.length < 2) fail(`tableau sans ligne de séparation « |---| »`);
    const [header, , ...rows] = tableLines.map(splitRow);
    block.table = { columns: header, rows };
    tableLines = [];
  };

  for (const raw of source.split(/\r?\n/)) {
    const line = raw.trimEnd();
    if (!line.startsWith('|')) flushTable();

    if (line.startsWith('#### ')) {
      inNotes = true;
    } else if (line.startsWith('### ')) {
      if (!slide) fail(`section « ${line} » avant la première slide`);
      block = newBlock(line.slice(4).trim());
      slide!.sections.push(block);
      inNotes = false;
    } else if (line.startsWith('## ')) {
      slide = { ...newBlock(''), id: line.slice(3).trim(), file, sections: [] };
      slides.push(slide);
      block = slide;
      inNotes = false;
    } else if (inNotes || !block || line.startsWith('# ') || line.startsWith('<!--') || line.trim() === '') {
      continue;
    } else if (line.startsWith('|')) {
      tableLines.push(line);
    } else if (line.startsWith('- ')) {
      block.items.push(line.slice(2).trim());
    } else {
      const match = KEY_LINE.exec(line);
      if (!match) continue; // Plain paragraph: a note for the reader, not shown on the slide
      const [, key, value] = match;
      if (!(KEYS as readonly string[]).includes(key)) fail(`clé inconnue « ${key} » (clés possibles : ${KEYS.join(', ')})`);
      block.fields[key as Key] = value.trim();
    }
  }
  flushTable();
  return slides;
};

/** Reads `{testé: Libellé} {extrapolé: Libellé}` badges. */
export const parseBadges = (text: string | undefined): Status[] =>
  [...(text ?? '').matchAll(/\{(testé|extrapolé)\s*:\s*([^}]*)\}/g)].map(([, kind, label]) => ({
    kind: (kind === 'testé' ? 'tested' : 'extrapolated') as StatusKind,
    label: label.trim(),
  }));

/** Reads the glossary: every `- **Terme** … : définition` line. */
export const parseGlossary = (source: string): Map<string, string> => {
  const terms = new Map<string, string>();
  for (const line of source.split(/\r?\n/)) {
    const match = /^- \*\*(.+?)\*\*[^:]*:\s*(.+)$/.exec(line.trim());
    if (match) terms.set(match[1].trim(), match[2].trim());
  }
  return terms;
};
