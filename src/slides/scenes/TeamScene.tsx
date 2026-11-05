import { useCurrentFrame } from 'remotion';
import { COLORS } from '../../theme';
import { Box, edge, Link, type Point, Stream, Tag } from './kit';
import type { SceneProps } from './types';

const TEAMS = [0, 215, 430].map((y) => ({ x: 30, y, width: 340, height: 130 }));
const GATEWAY = { x: 680, y: 205, width: 320, height: 150 };
const MODELS = [50, 360].map((y) => ({ x: 1310, y, width: 330, height: 150 }));
/** Which model each team calls: A and B the first one, C the second one. */
const CALLS = [0, 0, 1];
const PRIORITY = 0;
const LIMITED = 1;
const REFUSED = 2;

/**
 * Steering by team. Sections: three teams (their `détail` is a tag: A the priority, B the concurrency limit, C the
 * refused access), LiteLLM, then two models. Beats: every team calls its model through the gateway, which knows who
 * calls what; team C asks for a model it isn't allowed and is turned away; under load, team A goes first while team B
 * waits its turn. Streams repeat every 30 frames, so the first two beats can loop while waiting for the click.
 */
export const TeamScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const teams = sections.slice(0, 3);
  const [gateway, ...models] = sections.slice(3);
  const load = frame > s2;

  const toGateway = (team: number): Point[] => [edge(TEAMS[team], 'right'), edge(GATEWAY, 'left')];
  const toModel = (model: number): Point[] => [edge(GATEWAY, 'right'), edge(MODELS[model], 'left')];
  const route = (team: number) => [...toGateway(team), ...toModel(CALLS[team])];
  const queueEnd = edge(GATEWAY, 'left');

  return (
    <>
      {TEAMS.map((_, team) => (
        <Link key={`t${team}`} path={toGateway(team)} delay={s0 + 10} active />
      ))}
      {MODELS.map((_, model) => (
        <Link key={`m${model}`} path={toModel(model)} delay={s0 + 14} active />
      ))}

      {/* Normal traffic; under load the priority team sends more, the limited one is held back */}
      <Stream path={route(PRIORITY)} start={s0 + 15} stop={s2} vanish={s2} gap={15} travel={45} />
      <Stream path={route(PRIORITY)} start={s2 + 2} gap={6} travel={45} />
      <Stream path={route(LIMITED)} start={s0 + 20} stop={s2} vanish={s2} gap={15} travel={45} color={COLORS.chartHighlight} />
      <Stream path={route(LIMITED)} start={s2 + 2} gap={30} travel={45} color={COLORS.chartHighlight} />
      <Stream path={route(REFUSED)} start={s0 + 25} gap={15} travel={45} />

      {/* Team C asks for a model it isn't allowed: turned away at the gateway */}
      <Stream path={toGateway(REFUSED).map((point) => ({ x: point.x, y: point.y - 22 }))} start={s1 + 10} gap={30} travel={30} color={COLORS.danger} />

      {/* Team B's requests waiting their turn in front of the gateway */}
      {load &&
        [0, 1, 2, 3].map((index) => (
          <circle
            key={index}
            cx={queueEnd.x - 28 - index * 28}
            cy={queueEnd.y}
            r={10}
            style={{ fill: COLORS.chartHighlight, opacity: Math.min(1, Math.max(0, (frame - s2 - index * 8) / 6)) }}
          />
        ))}

      <Box {...GATEWAY} title={gateway.title} text={gateway.text} delay={s0 + 4} highlight />
      {MODELS.map((box, model) => (
        <Box key={`mb${model}`} {...box} title={models[model].title} text={models[model].text} delay={s0 + 8} />
      ))}
      {TEAMS.map((box, team) => (
        <Box key={`tb${team}`} {...box} title={teams[team].title} text={teams[team].text} delay={s0} highlight={load && team === PRIORITY} />
      ))}

      {frame > s1 && (
        <path
          d={`M ${queueEnd.x - 34} ${queueEnd.y - 22 - 12} l 24 24 m 0 -24 l -24 24`}
          style={{ stroke: COLORS.danger, strokeWidth: 6, strokeLinecap: 'round', opacity: frame > s1 + 35 ? 1 : 0 }}
        />
      )}
      {frame > s1 && teams[REFUSED].detail && (
        <Tag at={{ x: TEAMS[REFUSED].x + TEAMS[REFUSED].width / 2, y: TEAMS[REFUSED].y }} text={teams[REFUSED].detail} delay={s1 + 6} danger />
      )}
      {load && teams[PRIORITY].detail && (
        <Tag at={{ x: TEAMS[PRIORITY].x + TEAMS[PRIORITY].width / 2, y: TEAMS[PRIORITY].y + TEAMS[PRIORITY].height }} text={teams[PRIORITY].detail} delay={s2 + 4} />
      )}
      {load && teams[LIMITED].detail && (
        <Tag at={{ x: TEAMS[LIMITED].x + TEAMS[LIMITED].width / 2, y: TEAMS[LIMITED].y + TEAMS[LIMITED].height }} text={teams[LIMITED].detail} delay={s2 + 10} />
      )}
    </>
  );
};
