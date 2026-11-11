import type { Status } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { AgentScene } from './scenes/AgentScene';
import { CutScene } from './scenes/CutScene';
import { ExpertsScene } from './scenes/ExpertsScene';
import { SceneFrame } from './scenes/kit';
import { NetworkScene } from './scenes/NetworkScene';
import { PathScene } from './scenes/PathScene';
import { QuantScene } from './scenes/QuantScene';
import { RoundingScene } from './scenes/RoundingScene';
import { RoutingScene } from './scenes/RoutingScene';
import { TeamScene } from './scenes/TeamScene';
import { TokenScene } from './scenes/TokenScene';
import { TrainingScene } from './scenes/TrainingScene';
import type { SceneProps, SceneSection } from './scenes/types';
import { VramScene } from './scenes/VramScene';
import { WeightsScene, weightsSecondBeat } from './scenes/WeightsScene';

type SceneSpec = {
  component: React.FC<SceneProps>;
  /** Allowed numbers of `###` sections. */
  sections: number[];
  /** Length of each beat in frames; there is one caption (and one click step) per beat. */
  beats: (sections: SceneSection[]) => number[];
  /**
   * Per beat, the length of the loop played while waiting for the next click (none: the scene freezes). The scene
   * must be periodic over that length, plus 5 frames (the presenter jumps back slightly early), by the end of the beat.
   */
  loops?: (number | undefined)[];
};

/** Motion-design scenes, chosen by the `scène` field of an `animation` slide. */
export const SCENES: Record<string, SceneSpec> = {
  coupure: { component: CutScene, sections: [2, 4], beats: () => [120, 80, 110], loops: [30] },
  routage: { component: RoutingScene, sections: [5], beats: () => [90, 100, 80] },
  'relecture des poids': { component: WeightsScene, sections: [3], beats: (sections) => [110, weightsSecondBeat(sections[2]?.text)] },
  experts: { component: ExpertsScene, sections: [3], beats: () => [110, 100, 40] },
  quantification: { component: QuantScene, sections: [4], beats: () => [80, 70, 80] },
  chemin: { component: PathScene, sections: [7], beats: () => [120, 120, 120], loops: [30, 30] },
  pilotage: { component: TeamScene, sections: [6], beats: () => [100, 100, 110], loops: [30, 30] },
  réseau: { component: NetworkScene, sections: [4], beats: () => [80, 70, 90], loops: [undefined, 30] },
  'boîte noire': { component: TrainingScene, sections: [4], beats: () => [110, 60, 70], loops: [30] },
  arrondi: { component: RoundingScene, sections: [3], beats: () => [70, 70, 70] },
  tokens: { component: TokenScene, sections: [3], beats: () => [90, 80, 110], loops: [undefined, 30] },
  vram: { component: VramScene, sections: [5], beats: () => [80, 80, 100] },
  'boucle agent': { component: AgentScene, sections: [6], beats: () => [175, 85, 100], loops: [undefined, 30] },
};

type AnimationSlideProps = {
  kicker: string;
  title: string;
  status: Status[];
  scene: SceneSpec;
  sections: SceneSection[];
  captions: string[];
  starts: number[];
};

export const AnimationSlide: React.FC<AnimationSlideProps> = ({ kicker, title, status, scene, sections, captions, starts }) => {
  const Scene = scene.component;
  return (
    <SlideLayout kicker={kicker} title={title} status={status}>
      <SceneFrame captions={captions} starts={starts}>
        <Scene sections={sections} starts={starts} />
      </SceneFrame>
    </SlideLayout>
  );
};
