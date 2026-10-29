import { useCallback } from 'react';
import { SLIDES } from '../deck';
import { COLORS, themeVariables } from '../theme';
import { targetFrame } from './deck-state';
import { SlidePlayer } from './SlidePlayer';
import { useDeck } from './useDeck';

/** Opens the speaker view in its own window, on the same slide; both windows then stay in step. */
export const openSpeakerView = () =>
  window.open(`${window.location.pathname}?vue=orateur${window.location.hash}`, 'slides-orateur', 'popup,width=1400,height=900');

// The audience view: the slide alone, full window
export const Presenter: React.FC = () => {
  const onKey = useCallback((key: string) => {
    if (key !== 'p') return false;
    openSpeakerView();
    return true;
  }, []);
  const { position, theme, forward, toggleTheme } = useDeck({ onKey });
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
