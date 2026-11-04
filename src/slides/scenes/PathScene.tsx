import { useCurrentFrame } from 'remotion';
import { Box, edge, Link, type Point, Stream } from './kit';
import type { SceneProps } from './types';

const SERVICES = [30, 225, 420].map((y) => ({ x: 30, y, width: 300, height: 110 }));
const ENGINES = [80, 330].map((y) => ({ x: 1340, y, width: 300, height: 150 }));
const HOMEMADE = [100, 350].map((y) => ({ x: 1040, y, width: 240, height: 110 }));
const GATEWAY = { x: 640, y: 205, width: 340, height: 150 };

/** Every service × engine pair, for the request streams. */
const PAIRS = SERVICES.flatMap((_, service) => ENGINES.map((__, engine) => ({ service, engine, offset: (service * 2 + engine) * 5 })));

/**
 * From the engine used directly to a single gateway. Sections: three services, two engines, the homemade gateway,
 * then LiteLLM. Beats: every service wired to every engine; a homemade gateway in front of each engine (as many
 * entry points); LiteLLM in the middle, a single entry point. Streams repeat every 30 frames, so the first two
 * beats can loop while waiting for the click.
 */
export const PathScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const services = sections.slice(0, 3);
  const engines = sections.slice(3, 5);
  const [homemade, gateway] = sections.slice(5);
  const gateway2 = frame > s2;

  const direct = (service: number, engine: number): Point[] => [edge(SERVICES[service], 'right'), edge(ENGINES[engine], 'left')];
  const viaHomemade = (service: number, engine: number): Point[] => [
    edge(SERVICES[service], 'right'),
    edge(HOMEMADE[engine], 'left'),
    edge(HOMEMADE[engine], 'right'),
    edge(ENGINES[engine], 'left'),
  ];
  const viaGateway = (service: number, engine: number): Point[] => [
    edge(SERVICES[service], 'right'),
    edge(GATEWAY, 'left'),
    edge(GATEWAY, 'right'),
    edge(ENGINES[engine], 'left'),
  ];

  return (
    <>
      {/* Step 1: the engines used directly */}
      {PAIRS.map(({ service, engine }) => (
        <Link key={`d${service}${engine}`} path={direct(service, engine)} delay={s0 + 10} hide={s1} />
      ))}
      {PAIRS.map(({ service, engine, offset }) => (
        <Stream key={`ds${service}${engine}`} path={direct(service, engine)} start={s0 + 20 + offset} stop={s1} vanish={s1} gap={30} travel={40} />
      ))}

      {/* Step 2: a homemade gateway in front of each engine */}
      {PAIRS.map(({ service, engine }) => (
        <Link key={`h${service}${engine}`} path={viaHomemade(service, engine).slice(0, 2)} delay={s1 + 8} hide={s2} />
      ))}
      {ENGINES.map((_, engine) => (
        <Link key={`he${engine}`} path={viaHomemade(0, engine).slice(2)} delay={s1 + 8} hide={s2} />
      ))}
      {PAIRS.map(({ service, engine, offset }) => (
        <Stream key={`hs${service}${engine}`} path={viaHomemade(service, engine)} start={s1 + 15 + offset} stop={s2} vanish={s2} gap={30} travel={40} />
      ))}
      {frame > s1 &&
        HOMEMADE.map((box, engine) => <Box key={`hb${engine}`} {...box} title={homemade.title} text={homemade.text} delay={s1 + 2} hide={s2} />)}

      {/* Step 3: LiteLLM, a single entry point */}
      {SERVICES.map((_, service) => (
        <Link key={`g${service}`} path={viaGateway(service, 0).slice(0, 2)} delay={s2 + 8} active={gateway2} />
      ))}
      {ENGINES.map((_, engine) => (
        <Link key={`ge${engine}`} path={viaGateway(0, engine).slice(2)} delay={s2 + 8} active={gateway2} />
      ))}
      {PAIRS.map(({ service, engine, offset }) => (
        <Stream key={`gs${service}${engine}`} path={viaGateway(service, engine)} start={s2 + 15 + offset} gap={30} travel={50} />
      ))}
      {gateway2 && <Box {...GATEWAY} title={gateway.title} text={gateway.text} delay={s2 + 2} highlight />}

      {SERVICES.map((box, index) => (
        <Box key={`s${index}`} {...box} title={services[index].title} text={services[index].text} delay={s0} />
      ))}
      {ENGINES.map((box, index) => (
        <Box key={`e${index}`} {...box} title={engines[index].title} text={engines[index].text} delay={s0 + 4} />
      ))}
    </>
  );
};
