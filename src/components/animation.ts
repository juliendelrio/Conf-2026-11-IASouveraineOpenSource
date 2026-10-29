import { Easing, interpolate } from 'remotion';

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);

/** 0 → 1 progress over `duration` frames starting at `delay`, clamped on both ends. */
export const progress = (frame: number, delay: number, duration = 15) =>
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
