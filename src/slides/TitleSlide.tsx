import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';

export const TitleSlide: React.FC = () => {
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
        <h1 style={{ fontSize: 96, margin: 0, lineHeight: 1.1 }}>
          Une plateforme IA à la demande, <span style={{ color: COLORS.accent }}>100 % open source</span>
        </h1>
        <h2 style={{ fontSize: 56, fontWeight: 400, color: COLORS.muted, marginTop: 40 }}>
          Du GPU local au cloud souverain
        </h2>
        <p style={{ fontSize: 40, marginTop: 80 }}>Julien Del Rio · Capitole du Libre 2026</p>
      </div>
    </AbsoluteFill>
  );
};
