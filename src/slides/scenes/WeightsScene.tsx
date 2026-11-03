import { useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import type { SceneProps } from './types';

const COLS = 10;
const ROWS = 6;
const CELL = { width: 70, height: 56, gap: 10 };
const GRID = { x: 60, y: 30 };
const PANEL = { x: 1120, y: 30, width: 520, height: 456 };
const WORD = { size: 36 };

/** Passes over the weights: two slow ones on the first beat, then one per word, fast, on the second. */
const passes = (words: number, [s0, s1]: number[]) => [
  { start: s0 + 20, duration: 36 },
  { start: s0 + 62, duration: 36 },
  ...Array.from({ length: Math.max(words - 2, 0) }, (_, index) => ({ start: s1 + 6 + index * 8, duration: 7 })),
];

/**
 * Writing a token means reading every weight. Sections: the weights in VRAM, the memory bandwidth, the written
 * text (its `texte`, one word per pass). Beats: two slow passes, then full speed.
 */
export const WeightsScene: React.FC<SceneProps> = ({ sections: [weights, bandwidth, output], starts }) => {
  const frame = useCurrentFrame();
  const words = (output.text ?? '').split(/\s+/).filter(Boolean);
  const schedule = passes(words.length, starts);
  const current = schedule.find((pass) => frame >= pass.start && frame < pass.start + pass.duration);
  const sweep = current ? ((frame - current.start) / current.duration) * (COLS + 2) - 1 : -10;
  const enter = progress(frame, starts[0]);
  const gridWidth = COLS * (CELL.width + CELL.gap) - CELL.gap;
  const gridHeight = ROWS * (CELL.height + CELL.gap) - CELL.gap;
  const arrowY = GRID.y + gridHeight / 2;

  return (
    <g style={{ opacity: enter }}>
      {Array.from({ length: COLS * ROWS }, (_, index) => {
        const col = index % COLS;
        const row = Math.floor(index / COLS);
        const lit = Math.max(0, 1 - Math.abs(sweep - col) / 1.5);
        const x = GRID.x + col * (CELL.width + CELL.gap);
        const y = GRID.y + row * (CELL.height + CELL.gap);
        return (
          <g key={index}>
            <rect x={x} y={y} width={CELL.width} height={CELL.height} rx={8} style={{ fill: COLORS.surface, stroke: COLORS.border, strokeWidth: 2 }} />
            <rect x={x} y={y} width={CELL.width} height={CELL.height} rx={8} style={{ fill: COLORS.accent, opacity: lit }} />
          </g>
        );
      })}
      <text x={GRID.x + gridWidth / 2} y={GRID.y + gridHeight + 56} textAnchor="middle" style={{ fontSize: 34, fontWeight: 700, fill: COLORS.foreground }}>
        {fr(weights.text ? `${weights.title} : ${weights.text}` : weights.title)}
      </text>

      <line x1={GRID.x + gridWidth + 30} y1={arrowY} x2={PANEL.x - 40} y2={arrowY} style={{ stroke: current ? COLORS.accent : COLORS.border, strokeWidth: 8 }} />
      <path d={`M ${PANEL.x - 20} ${arrowY} l -30 -20 v 40 z`} style={{ fill: current ? COLORS.accent : COLORS.border }} />
      <text x={(GRID.x + gridWidth + PANEL.x) / 2} y={arrowY - 30} textAnchor="middle" style={{ fontSize: 27, fill: COLORS.muted }}>
        {fr(bandwidth.title)}
      </text>
      {bandwidth.text && (
        <text x={(GRID.x + gridWidth + PANEL.x) / 2} y={arrowY + 58} textAnchor="middle" style={{ fontSize: 30, fontWeight: 700, fill: COLORS.foreground }}>
          {fr(bandwidth.text)}
        </text>
      )}

      <rect x={PANEL.x} y={PANEL.y} width={PANEL.width} height={PANEL.height} rx={18} style={{ fill: COLORS.surface, stroke: COLORS.border, strokeWidth: 3 }} />
      <text x={PANEL.x + 30} y={PANEL.y + 56} style={{ fontSize: 30, fontWeight: 700, fill: COLORS.muted }}>
        {fr(output.title)}
      </text>
      <foreignObject x={PANEL.x + 30} y={PANEL.y + 84} width={PANEL.width - 60} height={PANEL.height - 110}>
        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 12, rowGap: 6, fontSize: WORD.size, lineHeight: 1.4, color: COLORS.foreground }}>
          {words.map((word, index) => {
            const pass = schedule[index];
            return (
              <span key={index} style={{ opacity: pass ? progress(frame, pass.start + pass.duration - 2, 6) : 0 }}>
                {fr(word)}
              </span>
            );
          })}
        </div>
      </foreignObject>
    </g>
  );
};

/** Frames the second beat needs to write the remaining words. */
export const weightsSecondBeat = (text: string | undefined) => {
  const words = (text ?? '').split(/\s+/).filter(Boolean).length;
  return 6 + Math.max(words - 2, 0) * 8 + 30;
};
