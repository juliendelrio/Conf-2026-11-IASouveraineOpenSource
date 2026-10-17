import type { ComponentType } from 'react';
import { TitleSlide } from './slides/TitleSlide';

export type Slide = {
  /** Unique id, also used as Remotion composition id and PPTX still name. */
  id: string;
  component: ComponentType;
  /** Length of the entrance animation; the last frame is the slide's resting state. */
  durationInFrames: number;
};

export const SLIDES: Slide[] = [
  { id: 'title', component: TitleSlide, durationInFrames: 30 },
];
