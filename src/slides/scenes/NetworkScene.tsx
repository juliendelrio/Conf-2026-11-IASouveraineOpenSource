import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import { type Point, Tag } from './kit';
import type { SceneProps } from './types';

type Area = { x: number; y: number; width: number; height: number };

/** Neuron positions, one column per layer, spread over the area. */
const neurons = (layers: number[], area: Area, maxGap: number): Point[][] =>
  layers.map((count, layer) => {
    const gap = count > 1 ? Math.min(area.height / (count - 1), maxGap) : 0;
    return Array.from({ length: count }, (_, index) => ({
      x: area.x + (layers.length > 1 ? (layer * area.width) / (layers.length - 1) : area.width / 2),
      y: area.y + area.height / 2 + (index - (count - 1) / 2) * gap,
    }));
  });

type NetworkProps = {
  layers: number[];
  area: Area;
  /** Frame at which the network draws in, layer after layer. */
  delay: number;
  /** From this frame, a signal crosses the layers one after the other, every 30 frames. */
  signal?: number;
  radius?: number;
  maxGap?: number;
  /** The connection drawn in accent color: [layer, from, to]. */
  highlight?: [number, number, number];
  /** Fades the highlight back to normal from this frame. */
  highlightEnd?: number;
};

/** A small neural network: neurons in columns (layers), every neuron linked to every neuron of the next layer. */
export const Network: React.FC<NetworkProps> = ({ layers, area, delay, signal, radius = 14, maxGap = 70, highlight, highlightEnd }) => {
  const frame = useCurrentFrame();
  const points = neurons(layers, area, maxGap);
  // The signal lights one layer at a time; its period is 30 frames, so a waiting slide can loop over it
  const lit = signal !== undefined && frame >= signal ? Math.floor((((frame - signal) % 30) / 30) * layers.length) : -1;
  const highlightOn = highlight ? 1 - (highlightEnd === undefined ? 0 : progress(frame, highlightEnd, 10)) : 0;

  return (
    <g>
      {points.slice(0, -1).map((column, layer) => {
        const shown = progress(frame, delay + layer * 4);
        return column.flatMap((from, i) =>
          points[layer + 1].map((to, j) => {
            const isHighlight = highlight && highlight[0] === layer && highlight[1] === i && highlight[2] === j && highlightOn > 0;
            return (
              <line
                key={`${layer}-${i}-${j}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                style={{
                  stroke: isHighlight ? COLORS.chartHighlight : lit === layer ? COLORS.chartBar : COLORS.border,
                  strokeWidth: isHighlight ? 6 : 2,
                  opacity: shown,
                }}
              />
            );
          }),
        );
      })}
      {points.map((column, layer) =>
        column.map((point, index) => (
          <circle
            key={`${layer}-${index}`}
            cx={point.x}
            cy={point.y}
            r={radius}
            style={{
              fill: lit === layer ? COLORS.chartBar : COLORS.background,
              stroke: COLORS.muted,
              strokeWidth: 3,
              opacity: progress(frame, delay + layer * 4),
            }}
          />
        )),
      )}
    </g>
  );
};

/** Middle of a connection of the network, where a weight tag is pinned. */
const connectionMiddle = (layers: number[], area: Area, maxGap: number, [layer, from, to]: [number, number, number]): Point => {
  const points = neurons(layers, area, maxGap);
  const a = points[layer][from];
  const b = points[layer + 1][to];
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
};

const SMALL = [3, 4, 4, 2];
const MEDIUM = [4, 6, 6, 6, 3];
const LARGE = [6, 9, 9, 9, 9, 9, 5];
const WEIGHT: [number, number, number] = [1, 1, 2];
const CENTER: Area = { x: 560, y: 40, width: 560, height: 400 };
const LEFT: Area = { x: 80, y: 190, width: 300, height: 200 };
const SIZES: Area[] = [LEFT, { x: 560, y: 130, width: 440, height: 320 }, { x: 1180, y: 50, width: 440, height: 400 }];

/**
 * Parameters and weights. Sections: the three networks (`### 7B`, `texte`: what it is), then the weight
 * (`détail`: its value, pinned on a connection). Beats: one network and one of its weights; a signal crosses its
 * layers; bigger networks appear next to it, the number of weights is the size of the model.
 */
export const NetworkScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const [small, medium, large, weight] = sections;
  // The first network moves from the center to the left when the others come in
  const move = progress(frame, s2, 20);
  const area = (key: keyof Area) => interpolate(move, [0, 1], [CENTER[key], LEFT[key]]);
  const smallArea = { x: area('x'), y: area('y'), width: area('width'), height: area('height') };
  const smallGap = interpolate(move, [0, 1], [130, 70]);
  const tagAt = connectionMiddle(SMALL, smallArea, smallGap, WEIGHT);
  const labels = progress(frame, s2 + 10);

  return (
    <g>
      <Network
        layers={SMALL}
        area={smallArea}
        delay={s0}
        signal={s1}
        radius={interpolate(move, [0, 1], [22, 14])}
        maxGap={smallGap}
        highlight={WEIGHT}
        highlightEnd={s2}
      />
      {weight?.detail && frame <= s2 + 10 && (
        <g style={{ opacity: 1 - progress(frame, s2, 10) }}>
          <Tag at={{ x: tagAt.x, y: tagAt.y - 50 }} text={weight.detail} delay={s0 + 25} />
        </g>
      )}
      {frame > s2 && (
        <>
          <Network layers={MEDIUM} area={SIZES[1]} delay={s2 + 8} signal={s2 + 30} radius={12} maxGap={60} />
          <Network layers={LARGE} area={SIZES[2]} delay={s2 + 16} signal={s2 + 30} radius={10} maxGap={44} />
        </>
      )}
      {frame > s1 && frame <= s2 + 10 && (
        <text x={CENTER.x + CENTER.width / 2} y={CENTER.y + CENTER.height + 90} textAnchor="middle" style={{ fontSize: 30, fill: COLORS.muted, opacity: progress(frame, s1) * (1 - progress(frame, s2, 10)) }}>
          {fr(`${SMALL.length} couches, traversées l’une après l’autre`)}
        </text>
      )}
      {[small, medium, large].map((network, index) => {
        const area = SIZES[index];
        return (
          <g key={index} style={{ opacity: labels }}>
            <text x={area.x + area.width / 2} y={505} textAnchor="middle" style={{ fontSize: 44, fontWeight: 800, fill: COLORS.accent }}>
              {fr(network.title)}
            </text>
            {network.text && (
              <text x={area.x + area.width / 2} y={548} textAnchor="middle" style={{ fontSize: 28, fill: COLORS.muted }}>
                {fr(network.text)}
              </text>
            )}
          </g>
        );
      })}
    </g>
  );
};
