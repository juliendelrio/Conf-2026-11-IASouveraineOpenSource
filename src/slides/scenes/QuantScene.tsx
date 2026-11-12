import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import type { SceneProps, SceneSection } from './types';

const BITS = [16, 8, 4];
const CELL = { width: 40, gap: 6, height: 64 };
const BAR = { x: 60, y: 210 };
const SCALE = 7; // pixels per Go
const BASE = 500;
const CARD = { x: 1130, width: 440 };
const BLOCK = { x: 1170, width: 360 };

/** « ~54 Go » → 54. */
export const gigabytes = (section: SceneSection | undefined) => Number((/([\d,]+)\s*Go/.exec(section?.text ?? '')?.[1] ?? '0').replace(',', '.'));

/**
 * Quantization: the same weights in 16, 8 then 4 bits. Sections: one per precision (`texte`: the model size,
 * `détail`: a weight written at that precision, `mesure`: the quality lost, in orders of magnitude), then the card (`texte`: its VRAM). Beats: one per precision; the
 * model block shrinks until it fits in the card.
 */
export const QuantScene: React.FC<SceneProps> = ({ sections, starts }) => {
  const frame = useCurrentFrame();
  const precisions = sections.slice(0, 3);
  const card = sections[3];
  const sizes = precisions.map(gigabytes);
  const vram = gigabytes(card);
  const step = starts.filter((start, index) => index === 0 || frame > start).length - 1;
  const enter = progress(frame, starts[0]);

  // Size and lit bits follow the steps, easing from one to the next
  const size = interpolate(frame, [starts[1], starts[1] + 20, starts[2], starts[2] + 20], [sizes[0], sizes[1], sizes[1], sizes[2]], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const fits = size <= vram;
  const barWidth = 16 * (CELL.width + CELL.gap) - CELL.gap;

  return (
    <g style={{ opacity: enter }}>
      {/* One weight, written with fewer and fewer bits */}
      {precisions.map((precision, index) => (
        <text
          key={index}
          x={BAR.x + barWidth / 2}
          y={BAR.y - 60}
          textAnchor="middle"
          style={{ fontSize: 72, fontWeight: 800, fontFamily: 'ui-monospace, Consolas, monospace', fill: COLORS.foreground, opacity: index === step ? 1 : 0 }}
        >
          {fr(precision.detail ?? '')}
        </text>
      ))}
      {Array.from({ length: 16 }, (_, index) => {
        const kept = index < BITS[step];
        const fade = kept ? 1 : 1 - progress(frame, starts[step] + 1, 12);
        return (
          <rect
            key={index}
            x={BAR.x + index * (CELL.width + CELL.gap)}
            y={BAR.y}
            width={CELL.width}
            height={CELL.height}
            rx={6}
            style={{
              fill: kept ? COLORS.chartBar : COLORS.surface,
              stroke: COLORS.border,
              strokeWidth: 2,
              strokeDasharray: kept ? undefined : '6 5',
              opacity: kept ? 1 : 0.35 + 0.65 * fade,
            }}
          />
        );
      })}
      <text x={BAR.x + barWidth / 2} y={BAR.y + CELL.height + 70} textAnchor="middle" style={{ fontSize: 44, fontWeight: 700, fill: COLORS.accent }}>
        {fr(precisions[step].title)}
      </text>
      {precisions[step].measure && (
        <text
          x={BAR.x + barWidth / 2}
          y={BAR.y + CELL.height + 140}
          textAnchor="middle"
          style={{ fontSize: 36, fontWeight: 600, fill: COLORS.muted, opacity: progress(frame, starts[step] + 10, 12) }}
        >
          {fr(precisions[step].measure!)}
        </text>
      )}

      {/* The model against the card's VRAM */}
      <rect
        x={BLOCK.x}
        y={BASE - size * SCALE}
        width={BLOCK.width}
        height={size * SCALE}
        rx={10}
        style={{ fill: fits ? COLORS.chartBar : COLORS.danger, opacity: 0.85 }}
      />
      <text x={BLOCK.x + BLOCK.width / 2} y={BASE - size * SCALE - 18} textAnchor="middle" style={{ fontSize: 34, fontWeight: 700, fill: COLORS.foreground }}>
        {fr(precisions[step].text ?? '')}
      </text>
      <rect
        x={CARD.x}
        y={BASE - vram * SCALE}
        width={CARD.width}
        height={vram * SCALE}
        rx={14}
        style={{ fill: 'none', stroke: COLORS.foreground, strokeWidth: 5, strokeDasharray: '16 10' }}
      />
      <text x={CARD.x + CARD.width / 2} y={BASE + 48} textAnchor="middle" style={{ fontSize: 30, fill: COLORS.muted }}>
        {fr(card.text ? `${card.title} : ${card.text}` : card.title)}
      </text>
    </g>
  );
};
