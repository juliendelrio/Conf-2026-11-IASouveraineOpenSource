import type { ComponentType } from 'react';
import { durationFor, statementDuration, TRIO_DURATION } from './components/templates';
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
};

// Order and numbering follow the slide outlines in docs/storyline.md
export const SLIDES: Slide[] = [
  // 0. Opening
  { id: 'title', component: TitleSlide, durationInFrames: 30 },
  { id: 'confession', component: ConfessionSlide, durationInFrames: 75 },
  { id: 'promise', component: PromiseSlide, durationInFrames: durationFor(4) },
  { id: 'thread', component: ThreadSlide, durationInFrames: durationFor(5) },
  // 1. Glossary
  { id: 'glossary-1', component: GlossaryOneSlide, durationInFrames: durationFor(5) },
  { id: 'glossary-2', component: GlossaryTwoSlide, durationInFrames: durationFor(5) },
  // 2. Models
  { id: 'models-why', component: ModelsWhySlide, durationInFrames: durationFor(3) },
  { id: 'august', component: AugustSlide, durationInFrames: durationFor(4) },
  { id: 'categories', component: CategoriesSlide, durationInFrames: durationFor(4) },
  { id: 'out-of-reach', component: OutOfReachSlide, durationInFrames: durationFor(4) },
  { id: 'model-timeline', component: ModelTimelineSlide, durationInFrames: durationFor(5) },
  { id: 'code-versions', component: CodeVersionsSlide, durationInFrames: durationFor(4) },
  { id: 'august-models', component: AugustModelsSlide, durationInFrames: durationFor(5) },
  { id: 'license', component: LicenseSlide, durationInFrames: durationFor(5) },
  { id: 'models-trio', component: ModelsTrioSlide, durationInFrames: TRIO_DURATION },
  // 3. Hardware
  { id: 'rent-first', component: RentFirstSlide, durationInFrames: durationFor(5) },
  { id: 'five-questions', component: FiveQuestionsSlide, durationInFrames: durationFor(5) },
  { id: 'speed-formula', component: SpeedFormulaSlide, durationInFrames: 80 },
  { id: 'speed-ceiling', component: SpeedCeilingSlide, durationInFrames: 90 },
  { id: 'moe', component: MoeSlide, durationInFrames: 95 },
  { id: 'hardware-by-category', component: HardwareByCategorySlide, durationInFrames: 75 },
  { id: 'two-approaches', component: TwoApproachesSlide, durationInFrames: durationFor(4) },
  { id: 'hardware-trio', component: HardwareTrioSlide, durationInFrames: TRIO_DURATION },
  // 4. Engines
  { id: 'our-engines', component: OurEnginesSlide, durationInFrames: durationFor(6) },
  { id: 'engine-cycle', component: EngineCycleSlide, durationInFrames: durationFor(2) },
  { id: 'engine-watch', component: EngineWatchSlide, durationInFrames: durationFor(3) },
  { id: 'engines-trio', component: EnginesTrioSlide, durationInFrames: TRIO_DURATION },
  // 5. Platform
  { id: 'platform-path', component: PlatformPathSlide, durationInFrames: durationFor(3) },
  { id: 'tokens', component: TokensSlide, durationInFrames: durationFor(4) },
  { id: 'editions', component: EditionsSlide, durationInFrames: durationFor(4) },
  { id: 'tiers', component: TiersSlide, durationInFrames: durationFor(3) },
  { id: 'platform-trio', component: PlatformTrioSlide, durationInFrames: TRIO_DURATION },
  // 6. Usages
  { id: 'usage-types', component: UsageTypesSlide, durationInFrames: durationFor(3) },
  { id: 'internal-chat', component: InternalChatSlide, durationInFrames: durationFor(4) },
  { id: 'chat-trio', component: ChatTrioSlide, durationInFrames: TRIO_DURATION },
  { id: 'dev-levers', component: DevLeversSlide, durationInFrames: durationFor(3) },
  { id: 'harness', component: HarnessSlide, durationInFrames: durationFor(4) },
  { id: 'two-harnesses', component: TwoHarnessesSlide, durationInFrames: durationFor(4) },
  { id: 'vision', component: VisionSlide, durationInFrames: durationFor(4) },
  { id: 'dev-trio', component: DevTrioSlide, durationInFrames: TRIO_DURATION },
  { id: 'integrations', component: IntegrationsSlide, durationInFrames: durationFor(3) },
  { id: 'integrations-trio', component: IntegrationsTrioSlide, durationInFrames: TRIO_DURATION },
  // 7. Conclusion
  { id: 'lessons', component: LessonsSlide, durationInFrames: durationFor(7) },
  { id: 'confession-callback', component: ConfessionCallbackSlide, durationInFrames: statementDuration(3) },
  { id: 'final-message', component: FinalMessageSlide, durationInFrames: statementDuration(3) },
  { id: 'thanks', component: ThanksSlide, durationInFrames: 70 },
];
