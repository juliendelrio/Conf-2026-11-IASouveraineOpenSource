import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import type { Point } from './kit';
import type { SceneProps, SceneSection } from './types';

// Isometric projection of the inside of a computer: x goes down-right, y goes down-left, z goes up
const K = 0.55;
const ORIGIN = { x: 385, y: 70 };
const project = (x: number, y: number, z: number): Point => ({
  x: ORIGIN.x + (x - y) * 0.866 * K,
  y: ORIGIN.y + ((x + y) * 0.5 - z) * K,
});
const polygon = (points: Point[]) => points.map((point) => `${point.x},${point.y}`).join(' ');

type CuboidProps = { x: number; y: number; z: number; w: number; d: number; h: number; fill: string; opacity?: number; stroke?: string };

/** A box seen in isometric view: its top and its two front faces, the sides shaded. */
const Cuboid: React.FC<CuboidProps> = ({ x, y, z, w, d, h, fill, opacity = 1, stroke = COLORS.muted }) => {
  const top = [project(x, y, z + h), project(x + w, y, z + h), project(x + w, y + d, z + h), project(x, y + d, z + h)];
  const right = [project(x + w, y, z), project(x + w, y + d, z), project(x + w, y + d, z + h), project(x + w, y, z + h)];
  const left = [project(x, y + d, z), project(x + w, y + d, z), project(x + w, y + d, z + h), project(x, y + d, z + h)];
  const face = (points: Point[], shade: number) => (
    <>
      <polygon points={polygon(points)} style={{ fill, stroke, strokeWidth: 1.5, strokeLinejoin: 'round' }} />
      {shade > 0 && <polygon points={polygon(points)} style={{ fill: '#000', opacity: shade }} />}
    </>
  );
  return (
    <g style={{ opacity }}>
      {face(right, 0.18)}
      {face(left, 0.32)}
      {face(top, 0)}
    </g>
  );
};

const BOARD = { x: 0, y: 0, w: 1000, h: 12, d: 640 };
const CPU = { x: 130, y: 90, w: 170, d: 170 };
const RAM = Array.from({ length: 4 }, (_, index) => ({ x: 390 + index * 48, y: 60, w: 22, d: 300 }));
const CARD = { x: 80, y: 420, w: 840, d: 170, z: 110 };
/** The graphics card's board, dark in both themes like a real one. */
const CARD_FILL = '#1e3a5f';
const DIE = { x: 420, y: 450, w: 160, d: 110 };
const VRAM = [150, 250, 650, 750].flatMap((x) => [{ x, y: 445, w: 70, d: 45 }, { x, y: 525, w: 70, d: 45 }]);
const LABEL_X = 1020;

type LabelProps = { section: SceneSection; anchor: Point; y: number; shown: number; accent?: boolean };

/** A label on the right of the drawing, with a leader line to the part it names. */
const Label: React.FC<LabelProps> = ({ section, anchor, y, shown, accent }) => (
  <g style={{ opacity: shown }}>
    <polyline points={polygon([anchor, { x: LABEL_X - 160, y: y - 12 }, { x: LABEL_X - 16, y: y - 12 }])} style={{ fill: 'none', stroke: accent ? COLORS.accent : COLORS.muted, strokeWidth: 3 }} />
    <circle cx={anchor.x} cy={anchor.y} r={7} style={{ fill: accent ? COLORS.accent : COLORS.muted }} />
    <text x={LABEL_X} y={y} style={{ fontSize: 38, fontWeight: 800, fill: accent ? COLORS.accent : COLORS.foreground }}>
      {fr(section.title)}
      {section.text && (
        <tspan style={{ fontSize: 30, fontWeight: 400, fill: COLORS.muted }}>{fr(` · ${section.text}`)}</tspan>
      )}
    </text>
  </g>
);

/**
 * VRAM, inside a computer. Sections: the CPU, the RAM, the GPU, the VRAM, the model (each with `texte`). Beats: the
 * motherboard with the processor and its memory; the graphics card comes in with its own memory; the model loads
 * into the VRAM, chip after chip.
 */
export const VramScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const [cpu, ram, gpu, vram, model] = sections;
  const board = progress(frame, s0);
  const cpuIn = progress(frame, s0 + 10);
  const cardIn = progress(frame, s1, 25);
  const drop = interpolate(cardIn, [0, 1], [260, 0]);
  const loaded = (index: number) => progress(frame, s2 + 10 + index * 6, 14);
  const cardHighlight = frame > s1 ? COLORS.accent : COLORS.muted;

  return (
    <g>
      <g style={{ opacity: board }}>
        <Cuboid {...BOARD} z={0} fill={COLORS.surface} />
      </g>
      <g style={{ opacity: cpuIn }}>
        <Cuboid {...CPU} z={12} h={30} fill={COLORS.muted} />
        {RAM.map((stick, index) => (
          <Cuboid key={index} {...stick} z={12} h={80} fill={COLORS.border} />
        ))}
      </g>

      {/* The graphics card, dropping into its slot */}
      {frame > s1 && (
        <g style={{ opacity: cardIn }} transform={`translate(0 ${-drop * K})`}>
          <Cuboid x={330} y={495} z={12} w={340} d={22} h={CARD.z - 12} fill={COLORS.border} />
          <Cuboid {...CARD} h={16} fill={CARD_FILL} stroke={cardHighlight} />
          <Cuboid {...DIE} z={CARD.z + 16} h={20} fill="#0b1120" stroke="#64748b" />
          {VRAM.map((chip, index) => (
            <g key={index}>
              <Cuboid {...chip} z={CARD.z + 16} h={10} fill="#334155" stroke={COLORS.accent} />
              <Cuboid {...chip} z={CARD.z + 16} h={10} fill={COLORS.chartBar} stroke={COLORS.accent} opacity={loaded(index)} />
            </g>
          ))}
        </g>
      )}

      {/* The model's weights fall into the VRAM chips */}
      {frame > s2 &&
        VRAM.map((chip, index) => {
          const fall = progress(frame, s2 + index * 6, 14);
          if (fall >= 1) return null;
          return <Cuboid key={index} x={chip.x + 15} y={chip.y + 5} w={40} d={35} h={30} z={interpolate(fall, [0, 1], [420, CARD.z + 26])} fill={COLORS.chartHighlight} opacity={fall > 0 ? 1 : 0} />;
        })}

      <Label section={cpu} anchor={project(CPU.x + CPU.w / 2, CPU.y + CPU.d / 2, 42)} y={70} shown={progress(frame, s0 + 20)} />
      <Label section={ram} anchor={project(RAM[3].x + 22, RAM[3].y + 60, 92)} y={150} shown={progress(frame, s0 + 30)} />
      <Label section={gpu} anchor={project(DIE.x + DIE.w / 2, DIE.y + DIE.d / 2, CARD.z + 36)} y={300} shown={progress(frame, s1 + 25)} accent />
      <Label section={vram} anchor={project(VRAM[6].x + 35, VRAM[6].y + 22, CARD.z + 26)} y={380} shown={progress(frame, s1 + 35)} accent />
      <Label section={model} anchor={project(VRAM[7].x + 35, VRAM[7].y + 22, CARD.z + 26)} y={480} shown={progress(frame, s2 + 40)} accent />
    </g>
  );
};
