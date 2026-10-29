import type { ComponentType } from 'react';
import { ConfessionSlide } from './slides/ConfessionSlide';
import { HardwareByCategorySlide } from './slides/HardwareByCategorySlide';
import { ModelTimelineSlide } from './slides/ModelTimelineSlide';
import { SpeedCeilingSlide } from './slides/SpeedCeilingSlide';
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
  { id: 'confession', component: ConfessionSlide, durationInFrames: 75 },
  { id: 'model-timeline', component: ModelTimelineSlide, durationInFrames: 90 },
  { id: 'speed-ceiling', component: SpeedCeilingSlide, durationInFrames: 90 },
  { id: 'hardware-by-category', component: HardwareByCategorySlide, durationInFrames: 75 },
];
