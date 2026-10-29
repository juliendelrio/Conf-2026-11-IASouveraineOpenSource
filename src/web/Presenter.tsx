import { memo, useCallback, useEffect, useState } from 'react';
import { Player } from '@remotion/player';
import { type Slide, SLIDES } from '../deck';
import { COLORS, themeVariables, type ThemeName, VIDEO } from '../theme';

const THEME_STORAGE_KEY = 'slides-theme';

const clampIndex = (index: number) => Math.min(Math.max(index, 0), SLIDES.length - 1);

// Slides are 1-based in the URL hash (#1, #2, ...) so a refresh keeps the current slide
const readSlideFromHash = () => {
  const index = Number.parseInt(window.location.hash.slice(1), 10) - 1;
  return Number.isNaN(index) ? 0 : clampIndex(index);
};

// Light by default; the dark choice is remembered per browser when storage is available
const readStoredTheme = (): ThemeName => {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

const storeTheme = (theme: ThemeName) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked site data): the theme just isn't remembered
  }
};

const PLAYER_STYLE: React.CSSProperties = { width: '100%', height: '100%' };

// Memoized so a theme switch (CSS variables on the parent) doesn't re-render the Player, which would restart the slide
const SlidePlayer = memo(({ slide }: { slide: Slide }) => (
  <Player
    component={slide.component}
    durationInFrames={slide.durationInFrames}
    compositionWidth={VIDEO.width}
    compositionHeight={VIDEO.height}
    fps={VIDEO.fps}
    autoPlay
    // Stay on the last frame (the slide's resting state) instead of jumping back to the empty first frame
    moveToBeginningWhenEnded={false}
    style={PLAYER_STYLE}
  />
));

export const Presenter: React.FC = () => {
  const [current, setCurrent] = useState(readSlideFromHash);
  const [theme, setTheme] = useState(readStoredTheme);

  const goTo = useCallback((index: number) => {
    const next = clampIndex(index);
    setCurrent(next);
    window.history.replaceState(null, '', `#${next + 1}`);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((previous) => {
      const next = previous === 'light' ? 'dark' : 'light';
      storeTheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) goTo(current + 1);
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) goTo(current - 1);
      else if (event.key === 'Home') goTo(0);
      else if (event.key === 'End') goTo(SLIDES.length - 1);
      else if (event.key === 'f') void document.documentElement.requestFullscreen();
      else if (event.key === 'd') toggleTheme();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [current, goTo, toggleTheme]);

  const slide = SLIDES[current];

  return (
    <div
      style={{
        ...themeVariables(theme),
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: COLORS.background,
      }}
    >
      <SlidePlayer key={slide.id} slide={slide} />
      {/* Theme button on the title slide only, to keep the other slides clean; the d key works everywhere */}
      {current === 0 && (
        <button
          type="button"
          // Out of the tab order so Space and Enter keep moving slides instead of clicking the button
          tabIndex={-1}
          onClick={toggleTheme}
          title="Changer de thème (touche d)"
          style={{
            position: 'fixed',
            top: 12,
            right: 12,
            padding: '6px 12px',
            border: `1px solid ${COLORS.border}`,
            borderRadius: 6,
            background: 'transparent',
            color: COLORS.muted,
            font: '14px system-ui, sans-serif',
            cursor: 'pointer',
            opacity: 0.6,
          }}
        >
          {theme === 'light' ? 'Thème sombre' : 'Thème clair'}
        </button>
      )}
    </div>
  );
};
