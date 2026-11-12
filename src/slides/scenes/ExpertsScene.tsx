import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import type { Point } from './kit';
import type { SceneProps } from './types';

const EXPERTS = 4;
const PER_EXPERT = 3;
const NEURON = { radius: 12, step: 30 };
const EXPERT_STEP = 120;
const TOP = 30;
/** Columns are drawn on slots; the slot before the last one is left empty for the « ⋯ » (dozens of layers). */
const SLOT = { x: 260, width: 270 };
const OUT = { x: 1450, y: 40, cols: 3, size: 44, gap: 12 };

const slotX = (slot: number) => SLOT.x + slot * SLOT.width;
const neuronY = (expert: number, index: number) => TOP + expert * EXPERT_STEP + index * NEURON.step;
const NEURONS: { expert: number; y: number }[] = Array.from({ length: EXPERTS * PER_EXPERT }, (_, index) => ({
  expert: Math.floor(index / PER_EXPERT),
  y: neuronY(Math.floor(index / PER_EXPERT), index % PER_EXPERT),
}));

/** A token goes through the layers one after the other; in each one, only `experts` work. */
type Token = { start: number; perSlot: number; experts: number[][] };

const ALL = Array.from({ length: EXPERTS }, (_, expert) => expert);
/** The expert picked by the router, per MoE token and per layer: varied, deterministic. */
const PICKS = [
  [0, 2, 1, 3],
  [3, 1, 2, 0],
  [1, 0, 3, 2],
  [2, 3, 0, 1],
  [0, 1, 3, 2],
];

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Mixture of Experts, drawn like the network of the weights slide. Sections: the labels of the layers drawn (the last
 * one stands for « … the last layer », after a gap). Beats: a dense model, every neuron of every layer works for each
 * token, slowly; a MoE, the neurons of each layer are grouped into experts and the router picks one per layer, so
 * tokens come out faster; then every expert is outlined: they all stay in memory.
 */
export const ExpertsScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const layers = sections.length;
  const slots = sections.map((_, layer) => (layer === layers - 1 ? layer + 1 : layer));
  const xs = slots.map(slotX);
  const schedule: Token[] = [
    ...[0, 1].map((index) => ({ start: s0 + 12 + index * 52, perSlot: 12, experts: sections.map(() => ALL) })),
    ...PICKS.map((picks, index) => ({ start: s1 + 15 + index * 18, perSlot: 3, experts: sections.map((_, layer) => [picks[layer % picks.length]]) })),
  ];
  const span = (token: Token) => (slots[layers - 1] + 1) * token.perSlot;

  /** How lit an expert of a layer is: on while a token that uses it is in that layer. */
  const heat = (layer: number, expert: number) =>
    Math.max(
      0,
      ...schedule
        .filter((token) => token.experts[layer].includes(expert))
        .map((token) => {
          const at = token.start + slots[layer] * token.perSlot;
          return interpolate(frame, [at, at + 1, at + token.perSlot, at + token.perSlot + 4], [0, 1, 1, 0], clamp);
        }),
    );
  /** How lit the connections from one expert to the next layer's expert are: while the token crosses them. */
  const linkHeat = (layer: number, from: number, to: number) =>
    Math.max(
      0,
      ...schedule
        .filter((token) => token.experts[layer].includes(from) && token.experts[layer + 1].includes(to))
        .map((token) => {
          const at = token.start + slots[layer + 1] * token.perSlot;
          return interpolate(frame, [at - 1, at, at + token.perSlot, at + token.perSlot + 4], [0, 1, 1, 0], clamp);
        }),
    );

  const grouped = progress(frame, s1, 15);
  const memory = progress(frame, s2 + 4, 20);
  const done = schedule.filter((token) => frame >= token.start + span(token)).length;
  const columnIn = (layer: number) => progress(frame, s0 + layer * 3);
  const point = (layer: number, y: number): Point => ({ x: xs[layer], y });

  return (
    <g>
      {/* The experts: groups of neurons, shown when the model becomes a MoE */}
      {xs.map((x, layer) =>
        ALL.map((expert) => {
          const lit = heat(layer, expert) * grouped;
          return (
            <rect
              key={`${layer}-${expert}`}
              x={x - 30}
              y={neuronY(expert, 0) - 26}
              width={60}
              height={(PER_EXPERT - 1) * NEURON.step + 52}
              rx={16}
              style={{
                fill: COLORS.accent,
                fillOpacity: 0.08 + lit * 0.25,
                stroke: memory > 0 ? COLORS.chartHighlight : COLORS.accent,
                strokeWidth: 2 + memory * 3,
                opacity: grouped,
              }}
            />
          );
        }),
      )}

      {/* Connections between consecutive layers drawn side by side (none across the gap) */}
      {xs.slice(0, -1).map((_, layer) =>
        slots[layer + 1] !== slots[layer] + 1
          ? null
          : NEURONS.flatMap((from, i) =>
              NEURONS.map((to, j) => {
                const lit = linkHeat(layer, from.expert, to.expert);
                const a = point(layer, from.y);
                const b = point(layer + 1, to.y);
                return (
                  <line
                    key={`${layer}-${i}-${j}`}
                    x1={a.x}
                    y1={a.y}
                    x2={b.x}
                    y2={b.y}
                    style={{ stroke: lit > 0 ? COLORS.chartBar : COLORS.border, strokeWidth: 1.5 + lit, opacity: columnIn(layer + 1) * (0.5 + lit * 0.5) }}
                  />
                );
              }),
            ),
      )}

      {/* Neurons, lit while a token goes through their expert */}
      {xs.map((x, layer) =>
        NEURONS.map((neuron, index) => {
          const lit = heat(layer, neuron.expert);
          return (
            <circle
              key={`${layer}-${index}`}
              cx={x}
              cy={neuron.y}
              r={NEURON.radius}
              style={{ fill: lit > 0.5 ? COLORS.chartBar : COLORS.background, stroke: COLORS.muted, strokeWidth: 3, opacity: columnIn(layer) }}
            />
          );
        }),
      )}

      {/* Dozens of layers in a real model: the gap before the last one */}
      <text x={slotX(layers - 1)} y={neuronY(EXPERTS - 1, PER_EXPERT - 1) / 2 + TOP + 18} textAnchor="middle" style={{ fontSize: 60, fill: COLORS.muted, opacity: columnIn(layers - 1) }}>
        ⋯
      </text>

      {sections.map((section, layer) => (
        <text key={layer} x={xs[layer]} y={540} textAnchor="middle" style={{ fontSize: 28, fontWeight: 700, fill: COLORS.muted, opacity: columnIn(layer) }}>
          {fr(section.title)}
        </text>
      ))}

      {/* The tokens written so far */}
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
