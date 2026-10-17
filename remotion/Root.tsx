import { Composition } from 'remotion';
import { SLIDES } from '../src/deck';
import { VIDEO } from '../src/theme';

export const RemotionRoot: React.FC = () => (
  <>
    {SLIDES.map((slide) => (
      <Composition
        key={slide.id}
        id={slide.id}
        component={slide.component}
        durationInFrames={slide.durationInFrames}
        fps={VIDEO.fps}
        width={VIDEO.width}
        height={VIDEO.height}
      />
    ))}
  </>
);
