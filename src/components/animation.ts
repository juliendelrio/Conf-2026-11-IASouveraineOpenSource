import { Easing, interpolate } from 'remotion';

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** Length of an entrance animation, in frames. */
export const ENTER = 15;

/** 0 → 1 progress over `duration` frames starting at `delay`, clamped on both ends. */
export const progress = (frame: number, delay: number, duration = ENTER) =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE_OUT,
  });

/** Fade and slide-up entrance style, starting at `delay` frames. */
export const fadeUp = (frame: number, delay: number): React.CSSProperties => {
  const p = progress(frame, delay);
  return { opacity: p, translate: `0px ${(1 - p) * 30}px` };
};

// --- Click steps ---------------------------------------------------------------
// The body of every slide is split into groups that enter one after the other, ITEM_DELAY frames apart.
// A group is fully in before the next one starts, so the presenter can pause right at a group's start frame
// and wait for a click (see `pauses` in src/deck.ts). Without pauses (Studio, PPTX) the groups simply chain.

/** Frame at which the body starts, once the kicker and title are in. */
export const BODY_START = 10;

/** Frames between two groups; any group's own animation must fit in it. */
export const ITEM_DELAY = 30;

/** Start frame of body group `index` (0-based). */
export const itemStart = (index: number) => BODY_START + index * ITEM_DELAY;

/** Duration of a slide whose body has `groups` groups: the last group has entered. */
export const framesFor = (groups: number) => itemStart(groups - 1) + ENTER + 5;

/** Presenter pauses: wait for a click before each of these groups. */
export const clicksBefore = (...groups: number[]) => groups.map(itemStart);
