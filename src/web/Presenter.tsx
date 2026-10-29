import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { type CallbackListener, Player, type PlayerRef } from '@remotion/player';
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

/** Where the presenter is: a slide, a click step inside it, and whether to play the entrance up to that step. */
type Position = { slide: number; step: number; animate: boolean };

const lastStep = (slide: number) => SLIDES[slide].pauses.length;

/** Frame shown at a click step: the next pause, or the slide's resting state once every step is in. */
const targetFrame = (slide: Slide, step: number) => slide.pauses[step] ?? slide.durationInFrames - 1;

type SlidePlayerProps = { slide: Slide; target: number; animate: boolean };

// Plays the slide up to `target` and stops there; jumps straight to it when not animating (going back).
// Memoized so a theme switch (CSS variables on the parent) doesn't re-render the Player.
const SlidePlayer = memo(({ slide, target, animate }: SlidePlayerProps) => {
  const ref = useRef<PlayerRef>(null);

  useEffect(() => {
    const player = ref.current;
    if (!player) return;
    if (!animate || player.getCurrentFrame() >= target) {
      player.pause();
      player.seekTo(target);
      return;
    }
    const onFrameUpdate: CallbackListener<'frameupdate'> = ({ detail }) => {
      if (detail.frame >= target) {
        player.pause();
        player.seekTo(target);
      }
    };
    player.addEventListener('frameupdate', onFrameUpdate);
    player.play();
    return () => player.removeEventListener('frameupdate', onFrameUpdate);
  }, [target, animate]);

  return (
    <Player
      ref={ref}
      component={slide.component}
      durationInFrames={slide.durationInFrames}
      compositionWidth={VIDEO.width}
      compositionHeight={VIDEO.height}
      fps={VIDEO.fps}
      initialFrame={animate ? 0 : target}
      // Stay on the last frame (the slide's resting state) instead of jumping back to the empty first frame
      moveToBeginningWhenEnded={false}
      // Clicks and Space advance the presentation, they must not toggle playback
      clickToPlay={false}
      spaceKeyToPlayOrPause={false}
      style={PLAYER_STYLE}
    />
  );
});

export const Presenter: React.FC = () => {
  const [position, setPosition] = useState<Position>(() => ({ slide: readSlideFromHash(), step: 0, animate: true }));
  const [theme, setTheme] = useState(readStoredTheme);

  // Keep the slide number in the URL so a refresh stays on the current slide
  useEffect(() => {
    window.history.replaceState(null, '', `#${position.slide + 1}`);
  }, [position.slide]);

  // Functional updates, so quick successive clicks each count even before React re-renders
  const goTo = useCallback((next: Position) => setPosition(next), []);

  // Next click: reveal the next step of the slide, or move on to the next slide
  const forward = useCallback(
    () =>
      setPosition(({ slide, step }) => {
        if (step < lastStep(slide)) return { slide, step: step + 1, animate: true };
        if (slide < SLIDES.length - 1) return { slide: slide + 1, step: 0, animate: true };
        return { slide, step, animate: true };
      }),
    [],
  );

  // Back: hide the last revealed step, or show the previous slide complete
  const backward = useCallback(
    () =>
      setPosition(({ slide, step }) => {
        if (step > 0) return { slide, step: step - 1, animate: false };
        if (slide > 0) return { slide: slide - 1, step: lastStep(slide - 1), animate: false };
        return { slide, step, animate: false };
      }),
    [],
  );

  const toggleTheme = useCallback(() => {
    setTheme((previous) => {
      const next = previous === 'light' ? 'dark' : 'light';
      storeTheme(next);
      return next;
    });
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) forward();
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) backward();
      else if (event.key === 'Home') goTo({ slide: 0, step: 0, animate: true });
      else if (event.key === 'End') goTo({ slide: SLIDES.length - 1, step: lastStep(SLIDES.length - 1), animate: false });
      else if (event.key === 'f') void document.documentElement.requestFullscreen();
      else if (event.key === 'd') toggleTheme();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [forward, backward, goTo, toggleTheme]);

  const slide = SLIDES[position.slide];

  return (
    <div
      onClick={forward}
      style={{
        ...themeVariables(theme),
        width: '100vw',
        height: '100vh',
        display: 'grid',
        placeItems: 'center',
        backgroundColor: COLORS.background,
      }}
    >
      <SlidePlayer key={slide.id} slide={slide} target={targetFrame(slide, position.step)} animate={position.animate} />
      {/* Theme button on the title slide only, to keep the other slides clean; the d key works everywhere */}
      {position.slide === 0 && (
        <button
          type="button"
          // Out of the tab order so Space and Enter keep moving slides instead of clicking the button
          tabIndex={-1}
          onClick={(event) => {
            // Don't let the click reach the slide area, which would advance the presentation
            event.stopPropagation();
            toggleTheme();
          }}
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
