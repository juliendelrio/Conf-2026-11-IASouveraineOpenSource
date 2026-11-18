import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { inline } from '../components/inline';
import { fr } from '../components/typography';
import { COLORS, FONT_FAMILY } from '../theme';

type TitleSlideProps = {
  title: string;
  subtitle: string;
  signature: string;
  /** A notice above the title, for the room while it waits (this talk stands in for another one): its label and text. */
  notice?: { label?: string; text: string };
};

export const TitleSlide: React.FC<TitleSlideProps> = ({ title, subtitle, signature, notice }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const translateY = interpolate(frame, [0, 20], [40, 0], { extrapolateRight: 'clamp' });

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
      <div style={{ opacity, transform: `translateY(${translateY}px)` }}>
        {notice && (
          <div
            style={{
              marginBottom: 64,
              padding: '28px 36px',
              borderRadius: 16,
              backgroundColor: `color-mix(in srgb, ${COLORS.accent} 12%, ${COLORS.background})`,
            }}
          >
            {notice.label && (
              <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: 4, textTransform: 'uppercase', color: COLORS.accent, marginBottom: 12 }}>
                {fr(notice.label)}
              </div>
            )}
            <div style={{ fontSize: 40, lineHeight: 1.3 }}>{inline(notice.text)}</div>
          </div>
        )}
        <h1 style={{ fontSize: notice ? 84 : 96, margin: 0, lineHeight: 1.1 }}>{inline(title)}</h1>
        <h2 style={{ fontSize: 56, fontWeight: 400, color: COLORS.muted, marginTop: 40 }}>{fr(subtitle)}</h2>
        <p style={{ fontSize: 40, marginTop: 80 }}>{fr(signature)}</p>
      </div>
    </AbsoluteFill>
  );
};
