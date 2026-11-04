import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../../theme';
import { Box, edge, Link, Stream, Tag } from './kit';
import type { SceneProps } from './types';

const TEAMS = [20, 215, 410].map((y) => ({ x: 30, y, width: 340, height: 130 }));
const GATEWAY = { x: 680, y: 205, width: 320, height: 150 };
const MODELS = { x: 1310, y: 205, width: 330, height: 150 };

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * Budgets per team. Sections: three teams (the one with a `détail` hits its budget, the `détail` is its tag),
 * LiteLLM, the models. Beats: requests flow and every team's budget gauge fills; one team reaches its budget and
 * its requests stop at the gateway while the others go on; the budget resets and its requests flow again.
 */
export const BudgetScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const teams = sections.slice(0, 3);
  const [gateway, models] = sections.slice(3);
  const limited = Math.max(0, teams.findIndex((team) => team.detail));
  const blockedAt = s1 + 40;
  const blocked = frame > blockedAt && frame <= s2 + 10;

  const fill = (index: number) =>
    index === limited
      ? interpolate(frame, [s0 + 20, s1, blockedAt, s2 + 5, s2 + 25, s2 + 90], [0, 0.7, 1, 1, 0, 0.25], clamp)
      : interpolate(frame, [s0 + 20, s2 + 90], [0, index === 0 ? 0.55 : 0.4], clamp);

  const toGateway = (index: number) => [edge(TEAMS[index], 'right'), edge(GATEWAY, 'left')];
  const fromGateway = [edge(GATEWAY, 'right'), edge(MODELS, 'left')];

  return (
    <>
      {TEAMS.map((_, index) => (
        <Link key={`l${index}`} path={toGateway(index)} delay={s0 + 10} active />
      ))}
      <Link path={fromGateway} delay={s0 + 14} active />

      {TEAMS.map((_, index) =>
        index === limited ? null : <Stream key={`s${index}`} path={[...toGateway(index), ...fromGateway]} start={s0 + 20 + index * 7} gap={20} travel={60} />,
      )}
      {/* The limited team uses the most: its requests stop at the gateway once the budget is reached */}
      <Stream path={[...toGateway(limited), ...fromGateway]} start={s0 + 20} stop={blockedAt} gap={9} travel={60} color={COLORS.chartHighlight} />
      <Stream path={toGateway(limited)} start={blockedAt} stop={s2 + 10} gap={9} travel={30} color={COLORS.chartHighlight} />
      <Stream path={[...toGateway(limited), ...fromGateway]} start={s2 + 25} gap={9} travel={60} color={COLORS.chartHighlight} />

      <Box {...GATEWAY} title={gateway.title} text={gateway.text} delay={s0 + 4} highlight danger={blocked} />
      <Box {...MODELS} title={models.title} text={models.text} delay={s0 + 8} />
      {TEAMS.map((box, index) => {
        const level = fill(index);
        const full = index === limited && blocked;
        return (
          <g key={`t${index}`}>
            <Box {...box} title={teams[index].title} text={teams[index].text} delay={s0} danger={full} />
            <rect x={box.x + 24} y={box.y + box.height - 24} width={box.width - 48} height={12} rx={6} style={{ fill: COLORS.background }} />
            <rect
              x={box.x + 24}
              y={box.y + box.height - 24}
              width={(box.width - 48) * level}
              height={12}
              rx={6}
              style={{ fill: full ? COLORS.danger : index === limited ? COLORS.chartHighlight : COLORS.chartBar }}
            />
          </g>
        );
      })}
      {blocked && teams[limited].detail && (
        <Tag at={{ x: TEAMS[limited].x + TEAMS[limited].width / 2, y: TEAMS[limited].y }} text={teams[limited].detail!} delay={blockedAt} danger />
      )}
    </>
  );
};
