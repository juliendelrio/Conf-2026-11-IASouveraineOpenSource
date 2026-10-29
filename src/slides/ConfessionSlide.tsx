import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { emphasized, inline } from '../components/inline';
import { COLORS, FONT_FAMILY } from '../theme';

// The opening confession: one line per click, the punchline (a `==…==` line) large, bold and italic
export const ConfessionSlide: React.FC<{ lines: string[] }> = ({ lines }) => {
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
      {lines.map((line, index) => {
        const punchline = emphasized(line);
        return punchline === undefined ? (
          <p key={line} style={{ fontSize: 64, lineHeight: 1.3, margin: index === 0 ? 0 : '32px 0 0', ...fadeUp(frame, itemStart(index)) }}>
            {inline(line)}
          </p>
        ) : (
          <p
            key={line}
            style={{
              fontSize: 80,
              fontWeight: 700,
              fontStyle: 'italic',
              color: COLORS.accent,
              margin: '96px 0 0',
              ...fadeUp(frame, itemStart(index)),
            }}
          >
            {inline(punchline)}
          </p>
        );
      })}
    </AbsoluteFill>
  );
};
