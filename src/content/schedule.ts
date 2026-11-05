// Planned start time of each slide, from the chapter durations written in the content file titles
// (`# 3. Le matériel (8 min 30)`). Within a chapter, the time is shared out by weight: a slide counts 1, plus half
// for each click inside it; a chapter divider is only shown for a couple of seconds.
import type { Slide } from '../deck';
import { ContentError, type SlideContent } from './parse';

const DIVIDER_WEIGHT = 0.15;
const CLICK_WEIGHT = 0.5;

/** `# 3. Le matériel (8 min 30)` → 510 seconds. */
export const chapterSeconds = (file: string, source: string) => {
  const title = source.split(/\r?\n/).find((line) => line.startsWith('# '));
  const match = title && /\((\d+) min(?: (\d+))?\)\s*$/.exec(title);
  if (!match) throw new ContentError(`${file} : durée du chapitre manquante dans le titre, ex. « # 3. Le matériel (8 min 30) »`);
  return Number(match[1]) * 60 + Number(match[2] ?? 0);
};

/** Adds `plannedStart` (seconds from the start of the talk) to every slide. */
export const withSchedule = (slides: Slide[], contents: SlideContent[], durations: Map<string, number>): Slide[] => {
  const weight = (index: number) =>
    contents[index].fields.type === 'intercalaire' ? DIVIDER_WEIGHT : 1 + CLICK_WEIGHT * slides[index].pauses.length;
  const chapterWeight = new Map<string, number>();
  contents.forEach((content, index) => chapterWeight.set(content.file, (chapterWeight.get(content.file) ?? 0) + weight(index)));

  let elapsed = 0;
  return slides.map((slide, index) => {
    const { file } = contents[index];
    const start = elapsed;
    elapsed += ((durations.get(file) ?? 0) * weight(index)) / chapterWeight.get(file)!;
    return { ...slide, plannedStart: Math.round(start) };
  });
};

/** 750 → « 12:30 ». */
export const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
