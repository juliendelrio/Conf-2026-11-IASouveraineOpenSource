import type { ComponentType } from 'react';
import { withPageNumber } from './components/PageNumber';
import { CONTENT_SLIDES } from './content';
import type { Note } from './content/parse';

export type Slide = {
  /** Unique id, also used as Remotion composition id and PPTX still name. */
  id: string;
  component: ComponentType;
  /** Length of the entrance animation; the last frame is the slide's resting state. */
  durationInFrames: number;
  /**
   * Frames where the presenter stops and waits for a click before playing on (see the click steps in
   * src/components/animation.ts). Studio and the PPTX ignore them and show the whole animation.
   */
  pauses: number[];
  /**
   * Animations only: while the presenter waits at one of these frames (a pause), it loops back to the given earlier
   * frame instead of freezing, so a steady scene (requests flowing) keeps moving until the click.
   */
  loops?: Record<number, number>;
  /**
   * Motion-design animation: navigating by slide plays it through on arrival (instead of showing the end state at
   * once), and the PPTX gets one image per step.
   */
  animated?: boolean;
  /** Planned start, in seconds from the start of the talk (from the chapter durations, see src/content/schedule.ts). */
  plannedStart?: number;
  /** Speaker notes (`#### …` under the slide in the content), shown in the speaker view. */
  notes: Note[];
};

// The deck is written in docs/contenu/*.md (order, texts, click steps); see docs/contenu/README.md.
// Every slide but the title gets its page number and the total in the bottom-right corner, and its planned start
// time in the top-right corner (to compare with the speaker view's timer).
export const SLIDES: Slide[] = CONTENT_SLIDES.map((slide, index) =>
  index === 0 ? slide : { ...slide, component: withPageNumber(slide.component, index + 1, CONTENT_SLIDES.length, slide.plannedStart) },
);
