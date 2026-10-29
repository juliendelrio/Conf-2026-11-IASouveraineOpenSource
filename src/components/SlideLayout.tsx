import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { fadeUp } from './animation';

type SlideLayoutProps = {
  /** Small label above the title, e.g. the chapter name. */
  kicker: string;
  title: React.ReactNode;
  children: React.ReactNode;
};

/** Common frame for content slides: kicker and title enter first, then the body. */
export const SlideLayout: React.FC<SlideLayoutProps> = ({ kicker, title, children }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.foreground,
        fontFamily: FONT_FAMILY,
        padding: '100px 120px',
      }}
    >
      <div style={fadeUp(frame, 0)}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: COLORS.accent,
          }}
        >
          {kicker}
        </div>
        <h1 style={{ fontSize: 72, margin: '16px 0 0', lineHeight: 1.1 }}>{title}</h1>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 64 }}>{children}</div>
    </AbsoluteFill>
  );
};
