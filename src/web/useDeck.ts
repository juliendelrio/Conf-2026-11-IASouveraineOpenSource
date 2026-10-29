import { useCallback, useEffect, useRef, useState } from 'react';
import { SLIDES } from '../deck';
import type { ThemeName } from '../theme';
import {
  lastStep,
  nextPosition,
  type Position,
  previousPosition,
  readSlideFromHash,
  readStoredTheme,
  storeTheme,
} from './deck-state';

// The audience window and the speaker view stay in step through a BroadcastChannel (same origin, no server)
const CHANNEL = 'slides-sync';

type Message =
  | { type: 'position'; position: Position }
  | { type: 'theme'; theme: ThemeName }
  /** Sent by a window that just opened, to get the current position and theme. */
  | { type: 'hello' };

type UseDeckOptions = {
  /** Extra keyboard shortcuts of the view (e.g. `p` to open the speaker view). */
  onKey?: (key: string) => boolean;
};

/** Position, theme, keyboard navigation and sync with the other window. */
export const useDeck = ({ onKey }: UseDeckOptions = {}) => {
  // The starting position is marked remote so it isn't broadcast: a window that opens takes the other one's position
  const [position, setPosition] = useState<Position>(() => ({ slide: readSlideFromHash(), step: 0, animate: true, remote: true }));
  const [theme, setTheme] = useState(readStoredTheme);
  const channel = useRef<BroadcastChannel | null>(null);
  const latest = useRef({ position, theme });
  latest.current = { position, theme };

  // Keep the slide number in the URL so a refresh stays on the current slide
  useEffect(() => {
    window.history.replaceState(null, '', `${window.location.search}#${position.slide + 1}`);
  }, [position.slide]);

  useEffect(() => {
    if (typeof BroadcastChannel === 'undefined') return;
    const sync = new BroadcastChannel(CHANNEL);
    channel.current = sync;
    sync.onmessage = ({ data }: MessageEvent<Message>) => {
      if (data.type === 'position') setPosition({ ...data.position, remote: true });
      else if (data.type === 'theme') setTheme(data.theme);
      else if (data.type === 'hello') {
        // Answer with our state, without animation, so the new window shows the same thing right away
        sync.postMessage({ type: 'position', position: { ...latest.current.position, animate: false } } satisfies Message);
        sync.postMessage({ type: 'theme', theme: latest.current.theme } satisfies Message);
      }
    };
    sync.postMessage({ type: 'hello' } satisfies Message);
    return () => {
      sync.close();
      channel.current = null;
    };
  }, []);

  // Send our own moves to the other window (not the ones we just received from it)
  useEffect(() => {
    if (!position.remote) channel.current?.postMessage({ type: 'position', position } satisfies Message);
  }, [position]);

  // Functional updates, so quick successive clicks each count even before React re-renders
  const forward = useCallback(() => setPosition((current) => nextPosition(current)), []);
  const backward = useCallback(() => setPosition((current) => previousPosition(current)), []);
  const goTo = useCallback((next: Position) => setPosition(next), []);

  const toggleTheme = useCallback(() => {
    const next = latest.current.theme === 'light' ? 'dark' : 'light';
    storeTheme(next);
    setTheme(next);
    channel.current?.postMessage({ type: 'theme', theme: next } satisfies Message);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (onKey?.(event.key)) return;
      if (['ArrowRight', 'PageDown', ' ', 'Enter'].includes(event.key)) forward();
      else if (['ArrowLeft', 'PageUp', 'Backspace'].includes(event.key)) backward();
      else if (event.key === 'Home') goTo({ slide: 0, step: 0, animate: true });
      else if (event.key === 'End') goTo({ slide: SLIDES.length - 1, step: lastStep(SLIDES.length - 1), animate: false });
      else if (event.key === 'f') void document.documentElement.requestFullscreen();
      else if (event.key === 'd') toggleTheme();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [forward, backward, goTo, toggleTheme, onKey]);

  return { position, theme, forward, backward, toggleTheme };
};
