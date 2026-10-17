import { useCallback, useEffect, useState } from 'react';
import { Player } from '@remotion/player';
import { SLIDES } from '../deck';
import { VIDEO } from '../theme';

const clampIndex = (index: number) => Math.min(Math.max(index, 0), SLIDES.length - 1);

// Slides are 1-based in the URL hash (#1, #2, ...) so a refresh keeps the current slide
const readSlideFromHash = () => {
  const index = Number.parseInt(window.location.hash.slice(1), 10) - 1;
  return Number.isNaN(index) ? 0 : clampIndex(index);
};

export const Presenter: React.FC = () => {
  const [current, setCurrent] = useState(readSlideFromHash);

  const goTo = useCallback((index: number) => {
    const next = clampIndex(index);
    setCurrent(next);
    window.history.replaceState(null, '', `#${next + 1}`);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) goTo(current + 1);
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) goTo(current - 1);
      else if (event.key === 'Home') goTo(0);
      else if (event.key === 'End') goTo(SLIDES.length - 1);
      else if (event.key === 'f') void document.documentElement.requestFullscreen();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [current, goTo]);

  const slide = SLIDES[current];

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center' }}>
      <Player
        key={slide.id}
        component={slide.component}
        durationInFrames={slide.durationInFrames}
        compositionWidth={VIDEO.width}
        compositionHeight={VIDEO.height}
        fps={VIDEO.fps}
        autoPlay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
