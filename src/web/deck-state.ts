import { type Slide, SLIDES } from '../deck';
import type { ThemeName } from '../theme';

const THEME_STORAGE_KEY = 'slides-theme';

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

/** Next click: reveal the next step of the slide, or move on to the next slide. */
export const nextPosition = ({ slide, step }: Position): Position => {
  if (step < lastStep(slide)) return { slide, step: step + 1, animate: true };
  if (slide < SLIDES.length - 1) return { slide: slide + 1, step: 0, animate: true };
  return { slide, step, animate: true };
};

/** Back: hide the last revealed step, or show the previous slide complete. */
export const previousPosition = ({ slide, step }: Position): Position => {
  if (step > 0) return { slide, step: step - 1, animate: false };
  if (slide > 0) return { slide: slide - 1, step: lastStep(slide - 1), animate: false };
  return { slide, step, animate: false };
};

// Light by default; the dark choice is remembered per browser when storage is available
export const readStoredTheme = (): ThemeName => {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
};

export const storeTheme = (theme: ThemeName) => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage unavailable (private mode, blocked site data): the theme just isn't remembered
  }
};
