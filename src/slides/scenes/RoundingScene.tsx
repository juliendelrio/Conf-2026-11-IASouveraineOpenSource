import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import type { SceneProps, SceneSection } from './types';

const AXIS = { from: 0.7, to: 0.8, x: 140, width: 1400, y: 330 };
/** Spacing of the graduations at each precision: illustrative, real formats are not decimal. */
const STEPS = [0.0005, 0.01, 0.05];

const at = (value: number) => AXIS.x + ((value - AXIS.from) / (AXIS.to - AXIS.from)) * AXIS.width;
/** « 0,7342 » → 0.7342. */
const valueOf = (section: SceneSection) => Number((section.detail ?? '0').replace(',', '.'));
const label = (value: number) => value.toFixed(2).replace('.', ',');

/**
 * Quantization as rounding: one weight on a ruler whose graduations get coarser. Sections: one per precision
 * (`### 16 bits`, `détail`: the weight at that precision). Beats: one per precision; the weight snaps to the nearest
 * graduation, and the gap with its exact value (the precision lost) shows.
 */
export const RoundingScene: React.FC<SceneProps> = ({ sections, starts }) => {
  const frame = useCurrentFrame();
  const values = sections.map(valueOf);
  const step = starts.filter((start, index) => index === 0 || frame > start).length - 1;
  const enter = progress(frame, starts[0]);
  const value = interpolate(frame, [starts[1], starts[1] + 20, starts[2], starts[2] + 20], [values[0], values[1], values[1], values[2]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const lost = progress(frame, starts[1] + 20);

  return (
    <g style={{ opacity: enter }}>
      <text x={AXIS.x} y={70} style={{ fontSize: 56, fontWeight: 800, fill: COLORS.accent }}>
        {fr(sections[step].title)}
      </text>

      {/* The graduations of each precision, cross-fading from one step to the next */}
      {STEPS.map((spacing, index) => {
        const shown = index === step ? progress(frame, starts[index] + 2, 12) : index === step - 1 ? 1 - progress(frame, starts[step], 12) : 0;
        if (shown === 0) return null;
        const count = Math.round((AXIS.to - AXIS.from) / spacing);
        return (
          <g key={index} style={{ opacity: shown }}>
            {Array.from({ length: count + 1 }, (_, tick) => {
              const tickValue = AXIS.from + tick * spacing;
              const major = Math.abs((tickValue * 100) % 5) < 1e-6 || Math.abs((tickValue * 100) % 5) > 5 - 1e-6;
              const height = major ? 44 : index === 0 ? 16 : 30;
              return (
                <line
                  key={tick}
                  x1={at(tickValue)}
                  x2={at(tickValue)}
                  y1={AXIS.y - height}
                  y2={AXIS.y + height}
                  style={{ stroke: major ? COLORS.foreground : COLORS.muted, strokeWidth: index === 0 ? 1.5 : 4 }}
                />
              );
            })}
            {index > 0 &&
              Array.from({ length: count + 1 }, (_, tick) => (
                <text key={tick} x={at(AXIS.from + tick * spacing)} y={AXIS.y + 96} textAnchor="middle" style={{ fontSize: 28, fill: COLORS.muted }}>
                  {label(AXIS.from + tick * spacing)}
                </text>
              ))}
          </g>
        );
      })}
      <line x1={AXIS.x} x2={AXIS.x + AXIS.width} y1={AXIS.y} y2={AXIS.y} style={{ stroke: COLORS.foreground, strokeWidth: 4 }} />

      {/* The exact value stays as a ghost; the gap is the precision lost */}
      {frame > starts[1] && (
        <g style={{ opacity: lost }}>
          <line x1={at(values[0])} x2={at(value)} y1={AXIS.y - 110} y2={AXIS.y - 110} style={{ stroke: COLORS.danger, strokeWidth: 6 }} />
          <circle cx={at(values[0])} cy={AXIS.y} r={18} style={{ fill: 'none', stroke: COLORS.muted, strokeWidth: 4, strokeDasharray: '6 5' }} />
        </g>
      )}
      <circle cx={at(value)} cy={AXIS.y} r={20} style={{ fill: COLORS.chartHighlight }} />
      <line x1={at(value)} x2={at(value)} y1={AXIS.y - 24} y2={AXIS.y - 130} style={{ stroke: COLORS.chartHighlight, strokeWidth: 4 }} />
      <text
        x={at(value)}
        y={AXIS.y - 150}
        textAnchor="middle"
        style={{ fontSize: 64, fontWeight: 800, fontFamily: 'ui-monospace, Consolas, monospace', fill: COLORS.foreground }}
      >
        {fr(sections[step].detail ?? '')}
      </text>
    </g>
  );
};
