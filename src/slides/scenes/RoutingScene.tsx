import { interpolate, useCurrentFrame } from 'remotion';
import { COLORS } from '../../theme';
import { Box, edge, Link, type Point, Stream, Tag } from './kit';
import type { SceneProps } from './types';

/**
 * The gateway at work. Sections: requests, gateway, then tiers 1, 2 and 3. Beats: everything goes to tier 1;
 * tier 1 fills up and the surplus overflows to tier 2; agentic development goes to tier 3.
 */
export const RoutingScene: React.FC<SceneProps> = ({ sections: [source, gateway, ...tiers], starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const sourceBox = { x: 30, y: 205, width: 320, height: 150 };
  const gatewayBox = { x: 500, y: 205, width: 340, height: 150 };
  const tierBoxes = [10, 205, 400].map((y) => ({ x: 1180, y, width: 460, height: 150 }));
  const inbound = [edge(sourceBox, 'right'), edge(gatewayBox, 'left')];
  const out = edge(gatewayBox, 'right');
  const toTier = tierBoxes.map((box): Point[] => [out, { x: 1010, y: out.y }, { x: 1010, y: edge(box, 'left').y }, edge(box, 'left')]);
  const active = [true, frame > s1, frame > s2];

  // Tier 1 load: fills up to 70 % on the first beat, then saturates
  const load = interpolate(frame, [s0 + 20, s1 - 10, s1, s1 + 40], [0, 0.7, 0.7, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const tier1 = tierBoxes[0];
  const full = load >= 0.99;

  return (
    <>
      <Link path={inbound} delay={s0 + 10} active />
      {toTier.map((path, index) => (
        <Link key={index} path={path} delay={s0 + 14} active={active[index]} />
      ))}
      <Stream path={[...inbound, ...toTier[0]]} start={s0 + 20} gap={12} travel={60} />
      <Stream path={[...inbound, ...toTier[1]]} start={s1 + 25} gap={12} travel={60} />
      <Stream path={[...inbound, ...toTier[2]]} start={s2 + 10} gap={20} travel={60} color={COLORS.chartHighlight} radius={12} />
      <Box {...sourceBox} title={source.title} text={source.text} delay={s0} />
      <Box {...gatewayBox} title={gateway.title} text={gateway.text} delay={s0 + 4} highlight />
      {tiers.map((tier, index) => (
        <Box key={tier.title} {...tierBoxes[index]} title={tier.title} text={tier.text} delay={s0 + 8 + index * 3} highlight={active[index] && !(index === 0 && full)} danger={index === 0 && full} />
      ))}
      <rect x={tier1.x + 30} y={tier1.y + tier1.height - 26} width={(tier1.width - 60) * load} height={12} rx={6} style={{ fill: full ? COLORS.danger : COLORS.chartBar }} />
      {tiers[0].detail && full && <Tag at={{ x: tier1.x + tier1.width / 2, y: tier1.y }} text={tiers[0].detail} delay={s1 + 40} danger />}
    </>
  );
};
