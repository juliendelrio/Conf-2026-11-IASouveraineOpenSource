import { interpolate, useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import { Box, edge, Stream, Tag } from './kit';
import type { SceneProps } from './types';

const CARD = { x: 60, y: 70, width: 920, height: 400 };
const CHIP = { x: 230, y: 220, width: 260, height: 160 };
const VRAM = { x: 640, y: 190, width: 300, height: 220 };
const OTHER = { x: 1200, y: 70, width: 420, height: 400 };
const OTHER_CHIP = { x: 1250, y: 220, width: 140, height: 160 };
const OTHER_VRAM = { x: 1430, y: 190, width: 150, height: 220 };
const TAGS_Y = 520;
/** The prompt read at once: a block of tokens entering the chip together. */
const PROMPT = { cols: 4, rows: 3, size: 26, gap: 8 };

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/**
 * The five questions to ask before buying, on one drawing of a graphics card. Sections: the card (`détail`: what
 * makes a model run on it), its memory, its chip, the path between the two (`mesure`: what goes through it), another
 * card; each `détail` is the tag of « what matters ». Beats, one per question: the whole card (does it run?); the
 * memory (does it fit?); the chip, which takes the whole prompt at once (does it read fast?); the path between memory
 * and chip, where every weight goes through again for each token written (does it write fast?); a second card and the
 * link between the two (do the cards talk well?). The part in question is outlined; the tags stay, so the drawing at
 * rest carries the five answers. The fourth beat loops while waiting for the click.
 */
export const HardwareScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2, s3, s4] }) => {
  const frame = useCurrentFrame();
  const [card, memory, chip, path, other] = sections;
  // A beat's state holds on the frame where the presenter waits for the next click (the start of the next beat)
  const during = (from: number, to = Infinity) => frame > from && frame <= to;

  const cardIn = progress(frame, s0);
  const otherIn = progress(frame, s4 + 2);
  const pipe = [edge(VRAM, 'left'), edge(CHIP, 'right')];
  const link = [edge(CARD, 'right'), edge(OTHER, 'left')];
  const pipeLit = during(s3, s4);
  const linkLit = frame > s4;

  // The prompt arrives in one block and docks against the chip; it leaves when the next question comes
  const promptWidth = PROMPT.cols * (PROMPT.size + PROMPT.gap) - PROMPT.gap;
  const promptHeight = PROMPT.rows * (PROMPT.size + PROMPT.gap) - PROMPT.gap;
  const promptX = interpolate(frame, [s2 + 8, s2 + 40], [-140, CHIP.x - promptWidth - 16], clamp);
  const promptOpacity = interpolate(frame, [s2 + 8, s2 + 12, s3 + 1, s3 + 10], [0, 1, 1, 0], clamp);

  return (
    <>
      {/* The card, outlined while the question is whether the model runs on it at all */}
      <g style={{ opacity: cardIn }}>
        <rect {...CARD} rx={28} style={{ fill: 'none', stroke: during(s0, s1) ? COLORS.accent : COLORS.border, strokeWidth: during(s0, s1) ? 6 : 4 }} />
        <text x={CARD.x} y={CARD.y - 22} style={{ fontSize: 32, fontWeight: 700, fill: COLORS.foreground }}>
          {fr(card.title)}
        </text>
      </g>

      {/* Memory → chip: every weight goes through here again for each token written */}
      <line
        x1={pipe[0].x}
        y1={pipe[0].y}
        x2={pipe[1].x}
        y2={pipe[1].y}
        style={{ stroke: pipeLit ? COLORS.accent : COLORS.border, strokeWidth: 34, opacity: progress(frame, s0 + 8) }}
      />
      <line x1={pipe[0].x} y1={pipe[0].y} x2={pipe[1].x} y2={pipe[1].y} style={{ stroke: COLORS.background, strokeWidth: 24, opacity: progress(frame, s0 + 8) }} />
      <Stream path={pipe} start={s3 + 6} gap={10} travel={30} radius={9} />
      {path.measure && (
        <text
          x={(pipe[0].x + pipe[1].x) / 2}
          y={CARD.y + CARD.height - 22}
          textAnchor="middle"
          style={{ fontSize: 28, fontWeight: 600, fill: COLORS.muted, opacity: progress(frame, s3 + 12) }}
        >
          {fr(path.measure)}
        </text>
      )}

      <Box {...CHIP} title={chip.title} text={chip.text} delay={s0 + 4} highlight={during(s2, s3)} />
      <Box {...VRAM} title={memory.title} text={memory.text} delay={s0 + 6} highlight={during(s1, s2)} />

      {/* The whole prompt, read at once */}
      <g style={{ opacity: promptOpacity }}>
        {Array.from({ length: PROMPT.cols * PROMPT.rows }, (_, index) => (
          <rect
            key={index}
            x={promptX + (index % PROMPT.cols) * (PROMPT.size + PROMPT.gap)}
            y={CHIP.y + (CHIP.height - promptHeight) / 2 + Math.floor(index / PROMPT.cols) * (PROMPT.size + PROMPT.gap)}
            width={PROMPT.size}
            height={PROMPT.size}
            rx={6}
            style={{ fill: COLORS.chartHighlight }}
          />
        ))}
      </g>

      {/* Another card, and the link a model split over both has to cross */}
      <g style={{ opacity: otherIn }}>
        <line x1={link[0].x} y1={link[0].y} x2={link[1].x} y2={link[1].y} style={{ stroke: linkLit ? COLORS.accent : COLORS.border, strokeWidth: 8 }} />
        <rect {...OTHER} rx={28} style={{ fill: 'none', stroke: COLORS.border, strokeWidth: 4 }} />
        <rect {...OTHER_CHIP} rx={18} style={{ fill: COLORS.surface, stroke: COLORS.border, strokeWidth: 3 }} />
        <rect {...OTHER_VRAM} rx={18} style={{ fill: COLORS.surface, stroke: COLORS.border, strokeWidth: 3 }} />
        <text x={OTHER.x} y={OTHER.y - 22} style={{ fontSize: 32, fontWeight: 700, fill: COLORS.foreground }}>
          {fr(other.title)}
        </text>
      </g>
      <Stream path={link} start={s4 + 14} gap={15} travel={30} radius={9} />
      <Stream path={[...link].reverse()} start={s4 + 21} gap={15} travel={30} radius={9} color={COLORS.chartHighlight} />

      {/* What matters, question after question: the tags stay */}
      {card.detail && frame > s0 && <Tag at={{ x: CARD.x + CARD.width * 0.7, y: CARD.y }} text={card.detail} delay={s0 + 14} />}
      {memory.detail && frame > s1 && <Tag at={{ x: VRAM.x + VRAM.width / 2, y: TAGS_Y }} text={memory.detail} delay={s1 + 6} />}
      {chip.detail && frame > s2 && <Tag at={{ x: CHIP.x + CHIP.width / 2 - 10, y: TAGS_Y }} text={chip.detail} delay={s2 + 6} />}
      {path.detail && frame > s3 && <Tag at={{ x: (pipe[0].x + pipe[1].x) / 2 + 10, y: 150 }} text={path.detail} delay={s3 + 6} />}
      {other.detail && frame > s4 && <Tag at={{ x: OTHER.x + OTHER.width / 2, y: TAGS_Y }} text={other.detail} delay={s4 + 10} />}
    </>
  );
};
