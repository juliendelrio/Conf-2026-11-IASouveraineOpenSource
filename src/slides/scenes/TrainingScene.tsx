import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import { Box, edge, Link, Stream, Tag } from './kit';
import type { SceneProps } from './types';

const DATA = { x: 40, y: 190, width: 380, height: 170 };
const TRAINING = { x: 590, y: 190, width: 420, height: 170 };
const WEIGHTS = { x: 1200, y: 190, width: 420, height: 170 };
const HIDDEN = { x: 10, y: 130, width: 1060, height: 290 };
/** The black box stays dark in both themes. */
const BLACK = '#0b1120';

/**
 * Open weights. Sections: the data, the training, the weights (`détail`: the tag shown at the end), then the black
 * box (`texte`: what it hides). Beats: data and training produce the weights; the training disappears into a black
 * box; only the weights are left, alone in the middle.
 */
export const TrainingScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const [data, training, weights, hidden] = sections;
  const cover = progress(frame, s1, 20);
  const gone = progress(frame, s2, 15);
  const shift = interpolate(progress(frame, s2 + 5, 25), [0, 1], [0, (1680 - WEIGHTS.width) / 2 - WEIGHTS.x]);

  return (
    <g>
      <g style={{ opacity: 1 - gone }}>
        <Box {...DATA} title={data.title} text={data.text} delay={s0} />
        <Box {...TRAINING} title={training.title} text={training.text} delay={s0 + 15} />
        <Link path={[edge(DATA, 'right'), edge(TRAINING, 'left')]} delay={s0 + 10} />
        <Link path={[edge(TRAINING, 'right'), edge(WEIGHTS, 'left')]} delay={s0 + 25} />
        <Stream path={[edge(DATA, 'right'), edge(TRAINING, 'left')]} start={s0 + 30} stop={s1 + 10} gap={10} travel={30} />
        <Stream path={[edge(TRAINING, 'right'), edge(WEIGHTS, 'left')]} start={s0 + 45} stop={s1 + 10} gap={10} travel={30} color={COLORS.chartHighlight} />
        {/* The black box slides over the data and the training */}
        <g style={{ opacity: cover }}>
          <rect x={HIDDEN.x} y={HIDDEN.y} width={HIDDEN.width * cover} height={HIDDEN.height} rx={24} style={{ fill: BLACK, stroke: COLORS.border, strokeWidth: 3 }} />
          <text x={HIDDEN.x + HIDDEN.width / 2} y={HIDDEN.y + HIDDEN.height / 2} textAnchor="middle" style={{ fontSize: 52, fontWeight: 800, fill: '#f8fafc', opacity: progress(frame, s1 + 15) }}>
            {fr(hidden.title)}
          </text>
          {hidden.text && (
            <text x={HIDDEN.x + HIDDEN.width / 2} y={HIDDEN.y + HIDDEN.height / 2 + 56} textAnchor="middle" style={{ fontSize: 32, fill: '#94a3b8', opacity: progress(frame, s1 + 15) }}>
              {fr(hidden.text)}
            </text>
          )}
        </g>
      </g>
      <g transform={`translate(${shift} 0)`}>
        <Box {...WEIGHTS} title={weights.title} text={weights.text} delay={s0 + 30} highlight={frame > s2} />
        {weights.detail && frame > s2 && <Tag at={{ x: WEIGHTS.x + WEIGHTS.width / 2, y: WEIGHTS.y + WEIGHTS.height + 70 }} text={weights.detail} delay={s2 + 25} />}
      </g>
    </g>
  );
};
