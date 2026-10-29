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
  /** Speaker notes (`#### …` under the slide in the content), shown in the speaker view. */
  notes: Note[];
};

// The deck is written in docs/contenu/*.md (order, texts, click steps); see docs/contenu/README.md.
// Every slide but the title gets its page number and the total in the bottom-right corner.
export const SLIDES: Slide[] = CONTENT_SLIDES.map((slide, index) =>
  index === 0 ? slide : { ...slide, component: withPageNumber(slide.component, index + 1, CONTENT_SLIDES.length) },
);
