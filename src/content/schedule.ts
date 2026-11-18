// Planned start time of each slide, from the chapter durations written in the content file titles
// (`# 3. Le matériel (8 min 30)`). Within a chapter, the time is shared out by weight: a slide counts 1, plus half
// for each click inside it; a chapter divider is only shown for a couple of seconds.
// An edition keeps the pace of the deck: a chapter that loses slides gets shorter, one that gains some gets longer.
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

const weight = (slide: Slide, content: SlideContent) =>
  content.fields.type === 'intercalaire' ? DIVIDER_WEIGHT : 1 + CLICK_WEIGHT * slide.pauses.length;

/** The pace of each chapter of the deck: the seconds one unit of weight takes, from the chapter's duration. */
export const chapterPace = (slides: Slide[], contents: SlideContent[], durations: Map<string, number>) => {
  const weights = new Map<string, number>();
  contents.forEach((content, index) => weights.set(content.file, (weights.get(content.file) ?? 0) + weight(slides[index], content)));
  return new Map([...weights].map(([file, total]) => [file, (durations.get(file) ?? 0) / total]));
};

/** Adds `plannedStart` and `plannedSeconds` to every slide, each taking its weight at the pace of its chapter. */
export const withSchedule = (slides: Slide[], contents: SlideContent[], pace: Map<string, number>): Slide[] => {
  let elapsed = 0;
  return slides.map((slide, index) => {
    const start = elapsed;
    elapsed += (pace.get(contents[index].file) ?? 0) * weight(slide, contents[index]);
    return { ...slide, plannedStart: Math.round(start), plannedSeconds: Math.round(elapsed) - Math.round(start) };
  });
};

/** 750 → « 12:30 ». */
export const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
