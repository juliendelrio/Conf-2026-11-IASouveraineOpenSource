import { type Slide, SLIDES } from '../deck';
import type { ThemeName } from '../theme';

const THEME_STORAGE_KEY = 'slides-theme';
const MODE_STORAGE_KEY = 'slides-navigation';

/** Navigation by click (each step of a slide, the default) or by slide (each slide shown complete). */
export type NavigationMode = 'click' | 'slide';

/**
 * Where the presentation is: a slide, a click step inside it, and whether to play the entrance up to that step.
 * `remote` marks a position received from the other window, so it isn't sent back.
 */
export type Position = { slide: number; step: number; animate: boolean; remote?: boolean };

const clampIndex = (index: number) => Math.min(Math.max(index, 0), SLIDES.length - 1);

// Slides are 1-based in the URL hash (#1, #2, ...) so a refresh keeps the current slide
export const readSlideFromHash = () => {
  const index = Number.parseInt(window.location.hash.slice(1), 10) - 1;
  return Number.isNaN(index) ? 0 : clampIndex(index);
};

/** Number of click steps after the arrival on a slide. */
export const lastStep = (slide: number) => SLIDES[slide].pauses.length;

/** Frame shown at a click step: the next pause, or the slide's resting state once every step is in. */
export const targetFrame = (slide: Slide, step: number) => slide.pauses[step] ?? slide.durationInFrames - 1;

/** Step shown on arrival on a slide: nothing of the body yet by click, everything by slide. */
export const arrivalStep = (slide: number, mode: NavigationMode) => (mode === 'slide' ? lastStep(slide) : 0);

/** Where the presentation opens: the slide of the URL hash, shown at once (no autoplay needed before any click). */
export const initialPosition = (mode: NavigationMode): Position => {
  const slide = readSlideFromHash();
  return { slide, step: arrivalStep(slide, mode), animate: false };
};

/** Next click: reveal the next step of the slide (by click only), or move on to the next slide. */
export const nextPosition = ({ slide, step }: Position, mode: NavigationMode): Position => {
  if (mode === 'click' && step < lastStep(slide)) return { slide, step: step + 1, animate: true };
  // By slide, the next slide shows complete at once (the presenter fades it in as a whole), except an animation,
  // which plays through so its intermediate steps aren't lost
  if (slide < SLIDES.length - 1) {
    return { slide: slide + 1, step: arrivalStep(slide + 1, mode), animate: mode === 'click' || Boolean(SLIDES[slide + 1].animated) };
  }
  return { slide, step: lastStep(slide), animate: true };
};

/** Back: hide the last revealed step (by click only), or show the previous slide complete. */
export const previousPosition = ({ slide, step }: Position, mode: NavigationMode): Position => {
  if (mode === 'click' && step > 0) return { slide, step: step - 1, animate: false };
  if (slide > 0) return { slide: slide - 1, step: lastStep(slide - 1), animate: false };
  return { slide, step: arrivalStep(slide, mode), animate: false };
};

// Preferences are remembered per browser when storage is available
const readStored = (key: string) => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

const store = (key: string, value: string) => {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode, blocked site data): the choice just isn't remembered
  }
};

// URL parameters force a choice for that address, over the remembered one, without changing it:
// ?theme=clair|sombre and ?navigation=clic|slide
const readUrlParam = (name: string) => new URLSearchParams(window.location.search).get(name);

const URL_THEMES: Record<string, ThemeName> = { clair: 'light', sombre: 'dark' };
const URL_MODES: Record<string, NavigationMode> = { clic: 'click', slide: 'slide' };

// Light theme and navigation by click by default
export const readInitialTheme = (): ThemeName =>
  URL_THEMES[readUrlParam('theme') ?? ''] ?? (readStored(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light');
export const storeTheme = (theme: ThemeName) => store(THEME_STORAGE_KEY, theme);

export const readInitialMode = (): NavigationMode =>
  URL_MODES[readUrlParam('navigation') ?? ''] ?? (readStored(MODE_STORAGE_KEY) === 'slide' ? 'slide' : 'click');
export const storeMode = (mode: NavigationMode) => store(MODE_STORAGE_KEY, mode);
