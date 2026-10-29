import type { ComponentType } from 'react';
import { clicksBefore, framesFor } from './components/animation';
import { withPageNumber } from './components/PageNumber';
import { ConfessionSlide } from './slides/ConfessionSlide';
import { ConfessionCallbackSlide, FinalMessageSlide, LessonsSlide, ThanksSlide } from './slides/conclusion';
import { EngineCycleSlide, EnginesTrioSlide, EngineWatchSlide, OurEnginesSlide } from './slides/engines';
import { FiveQuestionsSlide, HardwareTrioSlide, RentFirstSlide, TwoApproachesSlide } from './slides/hardware';
import { HardwareByCategorySlide } from './slides/HardwareByCategorySlide';
import { MoeSlide } from './slides/MoeSlide';
import { ModelTimelineSlide } from './slides/ModelTimelineSlide';
import {
  AugustModelsSlide,
  AugustSlide,
  CategoriesSlide,
  CodeVersionsSlide,
  LicenseSlide,
  ModelsTrioSlide,
  ModelsWhySlide,
  OutOfReachSlide,
} from './slides/models';
import { GlossaryOneSlide, GlossaryTwoSlide, PromiseSlide, ThreadSlide } from './slides/opening';
import { EditionsSlide, PlatformPathSlide, PlatformTrioSlide, TiersSlide, TokensSlide } from './slides/platform';
import { SpeedCeilingSlide } from './slides/SpeedCeilingSlide';
import { SpeedFormulaSlide } from './slides/SpeedFormulaSlide';
import { TitleSlide } from './slides/TitleSlide';
import {
  ChatTrioSlide,
  DevLeversSlide,
  DevTrioSlide,
  HarnessSlide,
  IntegrationsSlide,
  IntegrationsTrioSlide,
  InternalChatSlide,
  TwoHarnessesSlide,
  UsageTypesSlide,
  VisionSlide,
} from './slides/usages';

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
};

// Order and numbering follow the slide outlines in docs/storyline.md
const DECK: Slide[] = [
  // 0. Opening
  { id: 'title', component: TitleSlide, durationInFrames: 30, pauses: [] },
  { id: 'confession', component: ConfessionSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'promise', component: PromiseSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'thread', component: ThreadSlide, durationInFrames: framesFor(6), pauses: clicksBefore(1, 2, 3, 4, 5) },
  // 1. Glossary
  { id: 'glossary-1', component: GlossaryOneSlide, durationInFrames: framesFor(5), pauses: clicksBefore(1, 2, 3, 4) },
  { id: 'glossary-2', component: GlossaryTwoSlide, durationInFrames: framesFor(5), pauses: clicksBefore(1, 2, 3, 4) },
  // 2. Models
  { id: 'models-why', component: ModelsWhySlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'august', component: AugustSlide, durationInFrames: framesFor(5), pauses: clicksBefore(1, 2, 3, 4) },
  { id: 'categories', component: CategoriesSlide, durationInFrames: framesFor(5), pauses: clicksBefore(1, 2, 3, 4) },
  { id: 'out-of-reach', component: OutOfReachSlide, durationInFrames: framesFor(2), pauses: clicksBefore(1) },
  { id: 'model-timeline', component: ModelTimelineSlide, durationInFrames: framesFor(6), pauses: clicksBefore(1, 2, 3, 4, 5) },
  { id: 'code-versions', component: CodeVersionsSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'august-models', component: AugustModelsSlide, durationInFrames: framesFor(6), pauses: clicksBefore(3, 4, 5) },
  { id: 'license', component: LicenseSlide, durationInFrames: framesFor(6), pauses: clicksBefore(1, 2, 3, 4, 5) },
  { id: 'models-trio', component: ModelsTrioSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  // 3. Hardware
  { id: 'rent-first', component: RentFirstSlide, durationInFrames: framesFor(6), pauses: clicksBefore(2, 5) },
  { id: 'five-questions', component: FiveQuestionsSlide, durationInFrames: framesFor(5), pauses: clicksBefore(1, 2, 3, 4) },
  { id: 'speed-formula', component: SpeedFormulaSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'speed-ceiling', component: SpeedCeilingSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'moe', component: MoeSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'hardware-by-category', component: HardwareByCategorySlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'two-approaches', component: TwoApproachesSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'hardware-trio', component: HardwareTrioSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  // 4. Engines
  { id: 'our-engines', component: OurEnginesSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'engine-cycle', component: EngineCycleSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'engine-watch', component: EngineWatchSlide, durationInFrames: framesFor(2), pauses: clicksBefore(1) },
  { id: 'engines-trio', component: EnginesTrioSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  // 5. Platform
  { id: 'platform-path', component: PlatformPathSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'tokens', component: TokensSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'editions', component: EditionsSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'tiers', component: TiersSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'platform-trio', component: PlatformTrioSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  // 6. Usages
  { id: 'usage-types', component: UsageTypesSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'internal-chat', component: InternalChatSlide, durationInFrames: framesFor(2), pauses: clicksBefore(1) },
  { id: 'chat-trio', component: ChatTrioSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'dev-levers', component: DevLeversSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'harness', component: HarnessSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'two-harnesses', component: TwoHarnessesSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'vision', component: VisionSlide, durationInFrames: framesFor(2), pauses: clicksBefore(1) },
  { id: 'dev-trio', component: DevTrioSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'integrations', component: IntegrationsSlide, durationInFrames: framesFor(4), pauses: clicksBefore(1, 2, 3) },
  { id: 'integrations-trio', component: IntegrationsTrioSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  // 7. Conclusion
  { id: 'lessons', component: LessonsSlide, durationInFrames: framesFor(7), pauses: clicksBefore(1, 2, 3, 4, 5, 6) },
  { id: 'confession-callback', component: ConfessionCallbackSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'final-message', component: FinalMessageSlide, durationInFrames: framesFor(3), pauses: clicksBefore(1, 2) },
  { id: 'thanks', component: ThanksSlide, durationInFrames: framesFor(3), pauses: [] },
];

// Every slide but the title gets its page number and the total in the bottom-right corner
export const SLIDES: Slide[] = DECK.map((slide, index) =>
  index === 0 ? slide : { ...slide, component: withPageNumber(slide.component, index + 1, DECK.length) },
);
