import { useCallback } from 'react';
import { SLIDES } from '../deck';
import { COLORS, themeVariables } from '../theme';
import { targetFrame } from './deck-state';
import { SlidePlayer } from './SlidePlayer';
import { useDeck } from './useDeck';

/** Opens the speaker view in its own window, on the same slide; both windows then stay in step. */
export const openSpeakerView = () => {
  // Keep the other URL parameters (forced theme or navigation)
  const params = new URLSearchParams(window.location.search);
  params.set('vue', 'orateur');
  window.open(`${window.location.pathname}?${params}${window.location.hash}`, 'slides-orateur', 'popup,width=1400,height=900');
};

const ControlButton: React.FC<{ onClick: () => void; title: string; children: React.ReactNode }> = ({ onClick, title, children }) => (
  <button
    type="button"
    // Out of the tab order so Space and Enter keep moving slides instead of clicking the button
    tabIndex={-1}
    onClick={(event) => {
      // Don't let the click reach the slide area, which would advance the presentation
      event.stopPropagation();
      onClick();
    }}
    title={title}
    style={{
      padding: '6px 12px',
      border: `1px solid ${COLORS.border}`,
      borderRadius: 6,
      background: 'transparent',
      color: COLORS.muted,
      font: '14px system-ui, sans-serif',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);

// The audience view: the slide alone, full window
export const Presenter: React.FC = () => {
  const onKey = useCallback((key: string) => {
    if (key !== 'p') return false;
    openSpeakerView();
    return true;
  }, []);
  const { position, theme, mode, forward, toggleTheme, toggleMode } = useDeck({ onKey });
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
      {/* By slide, no animation inside the slide: the whole slide fades in instead */}
      <div key={slide.id} className={mode === 'slide' ? 'slide-in' : undefined} style={{ width: '100%', height: '100%' }}>
        <SlidePlayer slide={slide} target={targetFrame(slide, position.step)} animate={position.animate} />
      </div>
      {/* Theme and navigation switches on the title slide only, to keep the other slides clean; d and c work everywhere */}
      {position.slide === 0 && (
        <div style={{ position: 'fixed', top: 12, right: 12, display: 'flex', gap: 8, opacity: 0.6 }}>
          <ControlButton onClick={toggleMode} title="Avancer clic par clic ou slide par slide (touche c)">
            {mode === 'click' ? 'Navigation : par clic' : 'Navigation : par slide'}
          </ControlButton>
          <ControlButton onClick={toggleTheme} title="Changer de thème (touche d)">
            {theme === 'light' ? 'Thème sombre' : 'Thème clair'}
          </ControlButton>
        </div>
      )}
    </div>
  );
};
