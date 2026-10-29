// Turns the parsed content of docs/contenu/ into deck slides: one template per `type`.
import type { ComponentType } from 'react';
import { clicksBefore, framesFor } from '../components/animation';
import { emphasized } from '../components/inline';
import {
  BulletsSlide,
  type Cell,
  CompareSlide,
  GlossarySlide,
  KeyFigureSlide,
  StatementSlide,
  StepsSlide,
  TableSlide,
  TrioSlide,
} from '../components/templates';
import type { Slide } from '../deck';
import { ConfessionSlide } from '../slides/ConfessionSlide';
import { MoeSlide } from '../slides/MoeSlide';
import { SpeedCeilingSlide } from '../slides/SpeedCeilingSlide';
import { SpeedFormulaSlide } from '../slides/SpeedFormulaSlide';
import { ThanksSlide } from '../slides/ThanksSlide';
import { TitleSlide } from '../slides/TitleSlide';
import { type Block, ContentError, type Key, parseBadges, type SlideContent } from './parse';

const TITLE_DURATION = 30;

type Built = {
  component: ComponentType;
  /** Number of body groups, entering one after the other (see the click steps in animation.ts). */
  groups: number;
  /** Clicks used when the slide doesn't say: every group after the first, or none. */
  defaultClicks: 'tous' | 'aucun';
};

const yes = (value: string | undefined) => value?.trim().toLowerCase() === 'oui';

const toCell = (text: string): Cell => (/\{(testé|extrapolé)\s*:/.test(text) ? { status: parseBadges(text) } : text);

const build = (slide: SlideContent, glossary: Map<string, string>): Built => {
  const fail = (message: string): never => {
    throw new ContentError(`${slide.file} › ${slide.id} : ${message}`);
  };
  const need = (block: Block, key: Key) => block.fields[key] ?? fail(`champ « ${key} » manquant${block === slide ? '' : ` dans « ${block.title} »`}`);
  const needTable = (block: Block) => block.table ?? fail(`tableau manquant${block === slide ? '' : ` dans « ${block.title} »`}`);
  const number = (text: string, what: string) => {
    const value = Number(text.replace(',', '.'));
    return Number.isFinite(value) ? value : fail(`${what} : « ${text} » n'est pas un nombre`);
  };

  const { fields } = slide;
  // Read on demand: not every type has a kicker and a title
  const common = () => ({
    kicker: need(slide, 'rubrique'),
    title: need(slide, 'titre'),
    status: parseBadges(fields.badges),
    footer: fields.pied,
  });
  const footer = fields.pied ? 1 : 0;
  const type = need(slide, 'type');

  switch (type) {
    case 'titre': {
      const props = { title: need(slide, 'titre'), subtitle: need(slide, 'sous-titre'), signature: need(slide, 'signature') };
      return { component: () => <TitleSlide {...props} />, groups: 1, defaultClicks: 'aucun' };
    }
    case 'aveu': {
      const lines = slide.items;
      return { component: () => <ConfessionSlide lines={lines} />, groups: lines.length, defaultClicks: 'tous' };
    }
    case 'liste': {
      const items = slide.items;
      return { component: () => <BulletsSlide {...common()} items={items} />, groups: items.length + footer, defaultClicks: 'tous' };
    }
    case 'tableau': {
      const table = needTable(slide);
      const props = {
        ...common(),
        columns: table.columns,
        widths: fields.largeurs ?? table.columns.map(() => '1fr').join(' '),
        rows: table.rows.map((row) => row.map(toCell)),
        fontSize: fields.taille ? number(fields.taille, 'taille') : undefined,
        highlightRow: fields['ligne-surlignée'] ? number(fields['ligne-surlignée'], 'ligne-surlignée') - 1 : undefined,
      };
      return { component: () => <TableSlide {...props} />, groups: table.rows.length + footer, defaultClicks: 'tous' };
    }
    case 'étapes': {
      const steps = slide.sections.map((section) => ({
        label: section.title,
        text: section.fields.texte,
        sub: section.fields['détail'],
        highlight: yes(section.fields['surligné']),
      }));
      const numbered = fields['numérotées']?.trim().toLowerCase() !== 'non';
      return {
        component: () => <StepsSlide {...common()} steps={steps} numbered={numbered} />,
        groups: steps.length + footer,
        defaultClicks: 'tous',
      };
    }
    case 'cartes': {
      const cards = slide.sections.map((section) => ({
        title: section.title,
        value: section.fields.valeur,
        caption: section.fields['légende'],
        items: section.items.length > 0 ? section.items : undefined,
        status: parseBadges(section.fields.badges),
        highlight: yes(section.fields['surligné']),
      }));
      return { component: () => <CompareSlide {...common()} cards={cards} />, groups: cards.length + footer, defaultClicks: 'tous' };
    }
    case 'chiffre': {
      const props = { ...common(), figure: need(slide, 'chiffre'), caption: need(slide, 'légende') };
      return { component: () => <KeyFigureSlide {...props} />, groups: 1 + footer, defaultClicks: 'tous' };
    }
    case 'trio': {
      const props = { kicker: need(slide, 'rubrique'), goal: need(slide, 'objectif'), pitfall: need(slide, 'piège'), lesson: need(slide, 'leçon') };
      return { component: () => <TrioSlide {...props} />, groups: 3, defaultClicks: 'tous' };
    }
    case 'déclaration': {
      const lines = slide.items.map((item) => {
        const text = emphasized(item);
        return text === undefined ? { text: item } : { text, emphasis: true };
      });
      const kicker = fields.rubrique;
      return { component: () => <StatementSlide kicker={kicker} lines={lines} />, groups: lines.length, defaultClicks: 'tous' };
    }
    case 'lexique': {
      const terms = slide.items.map((term) => ({
        term,
        definition: glossary.get(term) ?? fail(`terme « ${term} » absent de lexique.md`),
      }));
      return { component: () => <GlossarySlide {...common()} terms={terms} />, groups: terms.length, defaultClicks: 'tous' };
    }
    case 'formule': {
      if (slide.sections.length !== 3) fail('une formule a exactement 3 sections (a ÷ b = c)');
      const terms = slide.sections.map((section) => ({ label: section.title, sub: need(section, 'exemple') }));
      return {
        component: () => <SpeedFormulaSlide kicker={common().kicker} title={common().title} terms={terms} footer={common().footer} />,
        groups: 3 + footer,
        defaultClicks: 'tous',
      };
    }
    case 'plafonds': {
      const machines = needTable(slide).rows.map(([name, speed, element, ours]) => ({
        name,
        tokensPerSecond: number(speed, `tok/s de ${name}`),
        group: number(element || '1', `élément de ${name}`) - 1,
        ours: yes(ours),
      }));
      const props = { ...common(), subtitle: need(slide, 'sous-titre'), machines };
      return {
        component: () => <SpeedCeilingSlide {...props} />,
        groups: Math.max(...machines.map((machine) => machine.group)) + 1,
        defaultClicks: 'tous',
      };
    }
    case 'moe': {
      const groups = slide.sections.map((section) => ({
        title: section.title,
        bars: needTable(section).rows.map(([label, value, note, highlight]) => ({
          label,
          value: number(value, `valeur de ${label}`),
          unit: 'Go',
          note: note || undefined,
          highlight: yes(highlight),
        })),
      }));
      const measure = fields.mesure;
      return {
        component: () => <MoeSlide {...common()} groups={groups} measure={measure} />,
        groups: groups.length + (measure ? 1 : 0) + footer,
        defaultClicks: 'tous',
      };
    }
    case 'merci': {
      const links = needTable(slide).rows.map(([label, url]) => ({ label, url }));
      const props = { kicker: common().kicker, title: common().title, links, signature: need(slide, 'signature') };
      return { component: () => <ThanksSlide {...props} />, groups: 3, defaultClicks: 'aucun' };
    }
    default:
      return fail(
        `type inconnu « ${type} » (types possibles : titre, aveu, liste, tableau, étapes, cartes, chiffre, trio, déclaration, lexique, formule, plafonds, moe, merci)`,
      );
  }
};

/** `clics : tous | aucun | 2, 3` → presenter pauses. Elements are numbered from 1 in display order. */
const pausesFor = (slide: SlideContent, built: Built): number[] => {
  const clicks = (slide.fields.clics ?? built.defaultClicks).trim().toLowerCase();
  if (clicks === 'aucun') return [];
  if (clicks === 'tous') return clicksBefore(...Array.from({ length: built.groups - 1 }, (_, index) => index + 1));
  const elements = clicks.split(/[,;\s]+/).filter(Boolean).map(Number);
  for (const element of elements) {
    if (!Number.isInteger(element) || element < 2 || element > built.groups) {
      throw new ContentError(
        `${slide.file} › ${slide.id} : clics « ${slide.fields.clics} » : chaque élément doit être un numéro entre 2 et ${built.groups} (1 = ce qui apparaît à l'arrivée)`,
      );
    }
  }
  return clicksBefore(...elements.map((element) => element - 1));
};

export const buildSlides = (contents: SlideContent[], glossary: Map<string, string>): Slide[] => {
  const ids = new Set<string>();
  return contents.map((content) => {
    if (ids.has(content.id)) throw new ContentError(`${content.file} › ${content.id} : identifiant de slide déjà utilisé`);
    ids.add(content.id);
    const built = build(content, glossary);
    const durationInFrames = content.fields.type === 'titre' ? TITLE_DURATION : framesFor(built.groups);
    return { id: content.id, component: built.component, durationInFrames, pauses: pausesFor(content, built) };
  });
};
