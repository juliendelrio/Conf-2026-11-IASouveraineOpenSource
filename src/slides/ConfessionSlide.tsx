import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { fr } from '../components/typography';
import { COLORS, FONT_FAMILY } from '../theme';

// 0.2 — The opening confession: the talk was built with Claude's help (one line per click)
export const ConfessionSlide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.foreground,
        fontFamily: FONT_FAMILY,
        justifyContent: 'center',
        padding: 160,
      }}
    >
      <p style={{ fontSize: 64, lineHeight: 1.3, margin: 0, ...fadeUp(frame, itemStart(0)) }}>
        Un talk sur l'IA souveraine <span style={{ color: COLORS.accent }}>100 % open source</span>…
      </p>
      <p style={{ fontSize: 64, lineHeight: 1.3, margin: '32px 0 0', ...fadeUp(frame, itemStart(1)) }}>
        entièrement conçu avec l'aide de <strong>Claude</strong>, ces slides comprises.
      </p>
      <p
        style={{
          fontSize: 80,
          fontWeight: 700,
          fontStyle: 'italic',
          color: COLORS.accent,
          margin: '96px 0 0',
          ...fadeUp(frame, itemStart(2)),
        }}
      >
        {fr('Cynique, mais opérationnel et efficace.')}
      </p>
    </AbsoluteFill>
  );
};
