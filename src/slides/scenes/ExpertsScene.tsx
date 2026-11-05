import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import { random } from './kit';
import type { SceneProps } from './types';

const COLS = 12;
const ROWS = 2;
const EXPERTS = COLS * ROWS;
const CELL = { width: 80, height: 44, gap: 12 };
const GRID_X = 300;
const LAYER_Y = [20, 175, 405];
const LAYER_HEIGHT = ROWS * (CELL.height + CELL.gap) - CELL.gap;
const TRACK_X = 215;
const TOKEN = { width: 60, height: 36 };
const OUT = { x: 1480, y: 30, cols: 3, size: 44, gap: 12 };

/** A token goes through the layers one after the other; in each one, `experts` are lit for `work` frames. */
type Token = { start: number; perLayer: number; experts: number[][] };

/** Dense tokens on the first beat (every expert of every layer works, slowly), MoE tokens on the second (fast). */
const tokens = ([s0, s1]: number[]): Token[] => [
  ...[0, 1].map((index) => ({
    start: s0 + 15 + index * 48,
    perLayer: 12,
    experts: LAYER_Y.map(() => Array.from({ length: EXPERTS }, (_, cell) => cell)),
  })),
  ...Array.from({ length: 6 }, (_, index) => ({
    start: s1 + 8 + index * 15,
    perLayer: 5,
    experts: LAYER_Y.map((_, layer) => [0, 1].map((pick) => Math.floor(random(index * 31 + layer * 7 + pick * 13 + 3) * EXPERTS))),
  })),
];

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Mixture of Experts, layer by layer. Sections: the labels of the three layers drawn (the last one stands for « … the
 * last layer »). Beats: a dense model (every expert of every layer works for each token, slowly); a MoE (in each layer,
 * the router picks a couple of experts, so tokens come out faster); then every expert outlined: they all stay in
 * memory.
 */
export const ExpertsScene: React.FC<SceneProps> = ({ sections, starts }) => {
  const frame = useCurrentFrame();
  const schedule = tokens(starts);
  const enter = progress(frame, starts[0]);
  const memory = progress(frame, starts[2] + 4, 20);
  const centers = LAYER_Y.map((y) => y + LAYER_HEIGHT / 2);

  const heat = (layer: number, cell: number) =>
    Math.max(
      0,
      ...schedule
        .filter((token) => token.experts[layer].includes(cell))
        .map((token) => {
          const at = token.start + layer * token.perLayer;
          return interpolate(frame, [at, at + 2, at + token.perLayer - 1, at + token.perLayer + 4], [0, 1, 1, 0], clamp);
        }),
    );

  const active = schedule.find((token) => frame >= token.start && frame < token.start + token.perLayer * LAYER_Y.length);
  const tokenY = active
    ? interpolate(
        frame,
        LAYER_Y.flatMap((_, layer) => [active.start + layer * active.perLayer, active.start + (layer + 1) * active.perLayer - 2]),
        LAYER_Y.flatMap((_, layer) => [centers[layer], centers[layer]]),
        clamp,
      )
    : undefined;
  const done = schedule.filter((token) => frame >= token.start + token.perLayer * LAYER_Y.length).length;

  return (
    <g style={{ opacity: enter }}>
      {LAYER_Y.map((y, layer) => (
        <g key={layer}>
          <text x={40} y={centers[layer] + 11} style={{ fontSize: 30, fontWeight: 700, fill: COLORS.muted }}>
            {fr(sections[layer]?.title ?? '')}
          </text>
          {Array.from({ length: EXPERTS }, (_, cell) => {
            const x = GRID_X + (cell % COLS) * (CELL.width + CELL.gap);
            const cy = y + Math.floor(cell / COLS) * (CELL.height + CELL.gap);
            return (
              <g key={cell}>
                <rect
                  x={x}
                  y={cy}
                  width={CELL.width}
                  height={CELL.height}
                  rx={8}
                  style={{ fill: COLORS.surface, stroke: memory > 0 ? COLORS.chartHighlight : COLORS.border, strokeWidth: 2 + memory * 3 }}
                />
                <rect x={x} y={cy} width={CELL.width} height={CELL.height} rx={8} style={{ fill: COLORS.accent, opacity: heat(layer, cell) }} />
              </g>
            );
          })}
        </g>
      ))}
      {/* Dozens of layers in a real model: the gap before the last one */}
      <text x={GRID_X + (COLS * (CELL.width + CELL.gap)) / 2} y={(LAYER_Y[1] + LAYER_HEIGHT + LAYER_Y[2]) / 2 + 18} textAnchor="middle" style={{ fontSize: 52, fill: COLORS.muted }}>
        ⋮
      </text>

      <line x1={TRACK_X + TOKEN.width / 2} y1={centers[0]} x2={TRACK_X + TOKEN.width / 2} y2={centers[2]} style={{ stroke: COLORS.border, strokeWidth: 4, strokeDasharray: '8 8' }} />
      {tokenY !== undefined && (
        <rect x={TRACK_X} y={tokenY - TOKEN.height / 2} width={TOKEN.width} height={TOKEN.height} rx={TOKEN.height / 2} style={{ fill: COLORS.chartBar }} />
      )}

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
