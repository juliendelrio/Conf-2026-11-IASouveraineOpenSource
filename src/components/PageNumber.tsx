import type { ComponentType } from 'react';
import { AbsoluteFill } from 'remotion';
import { formatTime } from '../content/schedule';
import { COLORS, FONT_FAMILY } from '../theme';

const CORNER: React.CSSProperties = {
  position: 'absolute',
  fontFamily: FONT_FAMILY,
  fontSize: 24,
  fontVariantNumeric: 'tabular-nums',
  color: COLORS.muted,
};

/**
 * Wraps a slide with its page number and the total (« 4 / 46 ») in the bottom-right corner, and its planned start
 * time (« 12:30 ») discreetly in the top-right corner.
 */
export const withPageNumber = (Slide: ComponentType, page: number, total: number, plannedStart?: number): ComponentType => {
  const Numbered: React.FC = () => (
    <>
      <Slide />
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        {plannedStart !== undefined && <span style={{ ...CORNER, right: 60, top: 36, opacity: 0.7 }}>{formatTime(plannedStart)}</span>}
        <span style={{ ...CORNER, right: 60, bottom: 36 }}>
          {page} / {total}
        </span>
      </AbsoluteFill>
    </>
  );
  Numbered.displayName = `Numbered(${Slide.displayName ?? Slide.name})`;
  return Numbered;
};
