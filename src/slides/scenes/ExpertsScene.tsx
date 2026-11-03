import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { COLORS } from '../../theme';
import { random } from './kit';
import type { SceneProps } from './types';

const COLS = 8;
const ROWS = 4;
const CELL = { width: 92, height: 92, gap: 14 };
const GRID = { x: 430, y: 40 };
const GRID_WIDTH = COLS * (CELL.width + CELL.gap) - CELL.gap;
const GRID_HEIGHT = ROWS * (CELL.height + CELL.gap) - CELL.gap;
const OUT = { x: 1420, y: 60, cols: 4, size: 44, gap: 12 };
const TOKEN = { width: 84, height: 50 };

type Token = { start: number; work: number; experts: number[] };

/** Dense tokens on the first beat (every weight works, slowly), MoE tokens on the second (a few experts, fast). */
const tokens = ([s0, s1]: number[]): Token[] => [
  ...[0, 1].map((index) => ({ start: s0 + 15 + index * 42, work: 30, experts: Array.from({ length: COLS * ROWS }, (_, cell) => cell) })),
  ...Array.from({ length: 6 }, (_, index) => ({
    start: s1 + 8 + index * 13,
    work: 10,
    experts: [0, 1, 2].map((pick) => Math.floor(random(index * 7 + pick * 31 + 3) * COLS * ROWS)),
  })),
];

/**
 * Mixture of Experts. No section. Beats: a dense model (the whole grid works for each token), a MoE (a router picks
 * a few experts per token, so tokens come out faster), then every expert outlined: they all stay in memory.
 */
export const ExpertsScene: React.FC<SceneProps> = ({ starts }) => {
  const frame = useCurrentFrame();
  const schedule = tokens(starts);
  const enter = progress(frame, starts[0]);
  const memory = progress(frame, starts[2] + 4, 20);
  const travel = 14;

  const heat = (cell: number) =>
    Math.max(
      0,
      ...schedule
        .filter((token) => token.experts.includes(cell))
        .map((token) =>
          interpolate(frame, [token.start + travel, token.start + travel + 3, token.start + travel + token.work, token.start + travel + token.work + 6], [0, 1, 1, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        ),
    );

  const done = schedule.filter((token) => frame >= token.start + travel + token.work).length;

  return (
    <g style={{ opacity: enter }}>
      {Array.from({ length: COLS * ROWS }, (_, cell) => {
        const x = GRID.x + (cell % COLS) * (CELL.width + CELL.gap);
        const y = GRID.y + Math.floor(cell / COLS) * (CELL.height + CELL.gap);
        return (
          <g key={cell}>
            <rect
              x={x}
              y={y}
              width={CELL.width}
              height={CELL.height}
              rx={12}
              style={{ fill: COLORS.surface, stroke: memory > 0 ? COLORS.chartHighlight : COLORS.border, strokeWidth: 2 + memory * 4 }}
            />
            <rect x={x} y={y} width={CELL.width} height={CELL.height} rx={12} style={{ fill: COLORS.accent, opacity: heat(cell) }} />
          </g>
        );
      })}

      {schedule.map((token, index) => {
        const t = interpolate(frame, [token.start, token.start + travel], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
        if (frame < token.start || t >= 1) return null;
        return (
          <rect
            key={index}
            x={60 + t * (GRID.x - 60 - TOKEN.width)}
            y={GRID.y + GRID_HEIGHT / 2 - TOKEN.height / 2}
            width={TOKEN.width}
            height={TOKEN.height}
            rx={TOKEN.height / 2}
            style={{ fill: COLORS.chartBar }}
          />
        );
      })}

      <path d={`M ${GRID.x + GRID_WIDTH + 30} ${GRID.y + GRID_HEIGHT / 2} h 70 l -20 -16 m 20 16 l -20 16`} style={{ fill: 'none', stroke: COLORS.border, strokeWidth: 6, strokeLinecap: 'round' }} />
      {Array.from({ length: done }, (_, index) => (
        <rect
          key={index}
          x={OUT.x + (index % OUT.cols) * (OUT.size + OUT.gap)}
          y={OUT.y + Math.floor(index / OUT.cols) * (OUT.size + OUT.gap)}
          width={OUT.size}
          height={OUT.size}
          rx={10}
          style={{ fill: COLORS.chartBar }}
        />
      ))}
    </g>
  );
};
