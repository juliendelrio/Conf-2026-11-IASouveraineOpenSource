import { useEffect, useState } from 'react';
import { Thumbnail } from '@remotion/player';
import { SLIDES } from '../deck';
import { themeVariables, VIDEO } from '../theme';
import { lastStep, nextPosition, targetFrame } from './deck-state';
import { Notes } from './Notes';
import { SlidePlayer } from './SlidePlayer';
import { useDeck } from './useDeck';

/** Target length of the talk, for the timer. */
const TALK_MINUTES = 44;

const UI = {
  background: '#0b1220',
  panel: '#111a2e',
  text: '#e5e7eb',
  muted: '#94a3b8',
  accent: '#93c5fd',
  late: '#fca5a5',
} as const;

const formatDuration = (ms: number) => {
  const seconds = Math.floor(ms / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
};

/** Talk timer: starts with the first move (or the button), can be paused and reset. */
const useTimer = (started: boolean) => {
  const [runningSince, setRunningSince] = useState<number | null>(null);
  const [elapsedBefore, setElapsedBefore] = useState(0);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (started && runningSince === null && elapsedBefore === 0) setRunningSince(Date.now());
  }, [started, runningSince, elapsedBefore]);

  const elapsed = elapsedBefore + (runningSince === null ? 0 : now - runningSince);
  const toggle = () => {
    if (runningSince === null) setRunningSince(Date.now());
    else {
      setElapsedBefore(elapsed);
      setRunningSince(null);
    }
  };
  const reset = () => {
    setElapsedBefore(0);
    setRunningSince(null);
  };
  return { elapsed, running: runningSince !== null, now, toggle, reset };
};

const buttonStyle: React.CSSProperties = {
  padding: '6px 14px',
  border: `1px solid ${UI.muted}`,
  borderRadius: 6,
  background: 'transparent',
  color: UI.text,
  font: '15px system-ui, sans-serif',
  cursor: 'pointer',
};

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: UI.muted, marginBottom: 8 }}>{children}</div>
);

// The speaker view (?vue=orateur): current slide, what the next click shows, notes, timer and clock
export const SpeakerView: React.FC = () => {
  const { position, theme, forward, backward, toggleTheme } = useDeck({ onKey: (key) => key === 'p' });
  const [moved, setMoved] = useState(false);
  const timer = useTimer(moved);

  const slide = SLIDES[position.slide];
  const steps = lastStep(position.slide);
  const next = nextPosition(position);
  const isLast = next.slide === position.slide && next.step === position.step;
  const nextSlide = SLIDES[next.slide];

  // The timer starts with the first move in either window
  const [initial] = useState(position);
  useEffect(() => {
    if (position.slide !== initial.slide || position.step !== initial.step) setMoved(true);
  }, [position, initial]);

  useEffect(() => {
    document.title = `Orateur · ${position.slide + 1} / ${SLIDES.length}`;
  }, [position.slide]);

  const late = timer.elapsed > TALK_MINUTES * 60 * 1000;

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        backgroundColor: UI.background,
        color: UI.text,
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <header style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '12px 20px', borderBottom: `1px solid ${UI.panel}` }}>
        <strong style={{ fontSize: 20 }}>
          Slide {position.slide + 1} / {SLIDES.length}
        </strong>
        <span style={{ color: UI.muted }}>{steps === 0 ? 'pas de clic' : `clic ${position.step} / ${steps}`}</span>
        <span style={{ marginLeft: 'auto', fontSize: 28, fontVariantNumeric: 'tabular-nums', color: late ? UI.late : UI.text }}>
          {formatDuration(timer.elapsed)}
          <span style={{ fontSize: 16, color: UI.muted }}> / {TALK_MINUTES}:00</span>
        </span>
        <button type="button" tabIndex={-1} style={buttonStyle} onClick={timer.toggle}>
          {timer.running ? 'Pause' : 'Démarrer'}
        </button>
        <button type="button" tabIndex={-1} style={buttonStyle} onClick={timer.reset}>
          Remettre à zéro
        </button>
        <span style={{ fontSize: 22, fontVariantNumeric: 'tabular-nums', color: UI.muted }}>
          {new Date(timer.now).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <button type="button" tabIndex={-1} style={buttonStyle} onClick={backward} title="Flèche gauche">
          ◀
        </button>
        <button type="button" tabIndex={-1} style={buttonStyle} onClick={forward} title="Flèche droite">
          ▶
        </button>
        <button type="button" tabIndex={-1} style={buttonStyle} onClick={toggleTheme} title="Touche d">
          {theme === 'light' ? 'Thème sombre' : 'Thème clair'}
        </button>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20, padding: 20, minHeight: 0 }}>
        <section style={{ minHeight: 0 }}>
          <Label>En cours</Label>
          <div onClick={forward} style={{ ...themeVariables(theme), aspectRatio: '16 / 9', width: '100%', cursor: 'pointer' }}>
            <SlidePlayer key={slide.id} slide={slide} target={targetFrame(slide, position.step)} animate={position.animate} />
          </div>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          <Label>{isLast ? 'Fin de la présentation' : next.slide === position.slide ? 'Au prochain clic' : `Slide suivante (${next.slide + 1})`}</Label>
          {!isLast && (
            <div style={{ ...themeVariables(theme), aspectRatio: '16 / 9', width: '100%', opacity: 0.9 }}>
              <Thumbnail
                component={nextSlide.component}
                durationInFrames={nextSlide.durationInFrames}
                compositionWidth={VIDEO.width}
                compositionHeight={VIDEO.height}
                fps={VIDEO.fps}
                frameToDisplay={targetFrame(nextSlide, next.step)}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          )}
          <div style={{ marginTop: 20, overflowY: 'auto', minHeight: 0, paddingRight: 8 }}>
            <Notes notes={slide.notes} />
          </div>
        </section>
      </main>
    </div>
  );
};
