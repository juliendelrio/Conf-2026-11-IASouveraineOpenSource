import type { ComponentType } from 'react';
import { AbsoluteFill } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';

/** Wraps a slide with its page number and the total (« 4 / 46 ») in the bottom-right corner. */
export const withPageNumber = (Slide: ComponentType, page: number, total: number): ComponentType => {
  const Numbered: React.FC = () => (
    <>
      <Slide />
      <AbsoluteFill style={{ pointerEvents: 'none' }}>
        <span
          style={{
            position: 'absolute',
            right: 60,
            bottom: 36,
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            fontVariantNumeric: 'tabular-nums',
            color: COLORS.muted,
          }}
        >
          {page} / {total}
        </span>
      </AbsoluteFill>
    </>
  );
  Numbered.displayName = `Numbered(${Slide.displayName ?? Slide.name})`;
  return Numbered;
};
