import { useCurrentFrame } from 'remotion';
import { COLORS } from '../../theme';
import { Box, Cut, edge, Link, type Point, Stream, Tag } from './kit';
import type { SceneProps } from './types';

/** Opening: our uses → one provider, then the access is cut, or the price doubles. Two sections. */
const Dependency: React.FC<SceneProps> = ({ sections: [source, provider], starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const sourceBox = { x: 60, y: 195, width: 420, height: 170 };
  const providerBox = { x: 1200, y: 195, width: 420, height: 170 };
  const path = [edge(sourceBox, 'right'), edge(providerBox, 'left')];
  const back = [...path].reverse().map((point) => ({ x: point.x, y: point.y + 24 }));
  const middle = { x: (path[0].x + path[1].x) / 2, y: path[0].y };
  const cut = frame >= s1;

  return (
    <>
      <Link path={path} delay={s0 + 10} danger={cut} />
      <Stream path={path} start={s0 + 25} stop={s1} vanish={s1} />
      <Stream path={back} start={s0 + 50} stop={s1} vanish={s1} gap={17} travel={55} color={COLORS.accent} radius={7} />
      <Box {...sourceBox} title={source.title} text={source.text} delay={s0} dim={cut} />
      <Box {...providerBox} title={provider.title} text={provider.text} delay={s0 + 6} danger={frame >= s2} />
      {cut && <Cut at={middle} delay={s1} />}
      {provider.detail && frame >= s2 && <Tag at={{ x: providerBox.x + providerBox.width / 2, y: providerBox.y + providerBox.height + 70 }} text={provider.detail} delay={s2} danger />}
    </>
  );
};

/** Conclusion: the same cut, but the gateway switches to our models. Four sections. */
const Failover: React.FC<SceneProps> = ({ sections: [source, gateway, provider, fallback], starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const sourceBox = { x: 40, y: 195, width: 360, height: 170 };
  const gatewayBox = { x: 600, y: 210, width: 320, height: 140 };
  const providerBox = { x: 1240, y: 30, width: 400, height: 170 };
  const fallbackBox = { x: 1240, y: 360, width: 400, height: 170 };
  const out = edge(gatewayBox, 'right');
  const elbow = (to: Point): Point[] => [out, { x: 1080, y: out.y }, { x: 1080, y: to.y }, to];
  const toProvider = elbow(edge(providerBox, 'left'));
  const toFallback = elbow(edge(fallbackBox, 'left'));
  const inbound = [edge(sourceBox, 'right'), edge(gatewayBox, 'left')];
  const cut = frame >= s1;
  const switched = frame >= s2;

  return (
    <>
      <Link path={inbound} delay={s0 + 10} active />
      <Link path={toProvider} delay={s0 + 14} danger={cut} />
      <Link path={toFallback} delay={s0 + 14} active={switched} />
      <Stream path={[...inbound, ...toProvider]} start={s0 + 25} stop={s1} vanish={s1} travel={60} />
      <Stream path={[...inbound, ...toFallback]} start={s2 + 10} travel={60} />
      <Box {...sourceBox} title={source.title} text={source.text} delay={s0} dim={cut && !switched} />
      <Box {...gatewayBox} title={gateway.title} text={gateway.text} delay={s0 + 4} highlight />
      <Box {...providerBox} title={provider.title} text={provider.text} delay={s0 + 8} danger={cut} />
      <Box {...fallbackBox} title={fallback.title} text={fallback.text} delay={s0 + 8} highlight={switched} />
      {cut && <Cut at={{ x: 1160, y: toProvider[3].y }} delay={s1} />}
      {provider.detail && cut && <Tag at={{ x: providerBox.x + providerBox.width / 2, y: providerBox.y }} text={provider.detail} delay={s1 + 10} danger />}
    </>
  );
};

export const CutScene: React.FC<SceneProps> = (props) => (props.sections.length === 4 ? <Failover {...props} /> : <Dependency {...props} />);
