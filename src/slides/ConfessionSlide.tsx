import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { fadeUp } from '../components/animation';
import { COLORS, FONT_FAMILY } from '../theme';

// 0.2 — The opening confession: the talk was built with Claude's help
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
      <p style={{ fontSize: 64, lineHeight: 1.3, margin: 0, ...fadeUp(frame, 0) }}>
        Un talk sur l'IA souveraine <span style={{ color: COLORS.accent }}>100 % open source</span>…
      </p>
      <p style={{ fontSize: 64, lineHeight: 1.3, margin: '32px 0 0', ...fadeUp(frame, 20) }}>
        entièrement conçu avec l'aide de <strong>Claude</strong>, ces slides comprises.
      </p>
      <p
        style={{
          fontSize: 80,
          fontWeight: 700,
          fontStyle: 'italic',
          color: COLORS.accent,
          margin: '96px 0 0',
          ...fadeUp(frame, 50),
        }}
      >
        « Et globalement, je recommande. »
      </p>
    </AbsoluteFill>
  );
};
