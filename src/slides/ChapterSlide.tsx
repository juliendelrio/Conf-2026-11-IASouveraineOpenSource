import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { fadeUp, progress } from '../components/animation';
import { fr } from '../components/typography';
import { COLORS, FONT_FAMILY } from '../theme';

const STEP = { width: 270, height: 72, gap: 24 };

type ChapterSlideProps = {
  /** Chapter number, shown large (none for the conclusion). */
  number?: string;
  title: string;
  /** The steps of the common thread, in order. */
  steps: string[];
  /** Index of the current step; the ones before are done. None: every step is done (conclusion). 'all': every step is
   * covered by this chapter (the glossary and its terms), none is done. */
  current?: number | 'all';
};

// Section divider: the common thread on top, the current step highlighted (the highlight slides in from the
// previous step), then the chapter number and title. No click: it is shown for a couple of seconds.
export const ChapterSlide: React.FC<ChapterSlideProps> = ({ number, title, steps, current: marked }) => {
  const frame = useCurrentFrame();
  const slide = progress(frame, 2, 18);
  const all = marked === 'all';
  const current = all ? undefined : marked;
  const from = current === undefined ? 0 : Math.max(current - 1, 0);
  const highlightX = current === undefined ? 0 : interpolate(slide, [0, 1], [from, current]) * (STEP.width + STEP.gap);
  const highlightOpacity = current === undefined ? 0 : current === 0 ? slide : 1;
  const done = (index: number) => !all && (current === undefined || index < current);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.foreground,
        fontFamily: FONT_FAMILY,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', gap: STEP.gap, ...fadeUp(frame, 0) }}>
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: STEP.width,
            height: STEP.height,
            borderRadius: STEP.height / 2,
            backgroundColor: COLORS.accent,
            translate: `${highlightX}px 0px`,
            opacity: highlightOpacity,
          }}
        />
        {steps.map((step, index) => (
          <div
            key={step}
            style={{
              position: 'relative',
              width: STEP.width,
              height: STEP.height,
              borderRadius: STEP.height / 2,
              border: `3px solid ${index === current ? 'transparent' : all ? COLORS.accent : COLORS.border}`,
              display: 'grid',
              placeItems: 'center',
              fontSize: 30,
              fontWeight: 600,
              color: index === current && slide > 0.5 ? COLORS.background : all ? COLORS.foreground : COLORS.muted,
              opacity: done(index) ? 0.55 : all ? progress(frame, 4 + index * 3) : 1,
            }}
          >
            {fr(step)}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 140, display: 'flex', alignItems: 'baseline', gap: 48, ...fadeUp(frame, 8) }}>
        {number && <span style={{ fontSize: 200, fontWeight: 800, color: COLORS.accent, lineHeight: 1 }}>{number}</span>}
        <span style={{ fontSize: 120, fontWeight: 800, lineHeight: 1 }}>{fr(title)}</span>
      </div>
    </AbsoluteFill>
  );
};
