import { useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import { Stream, usePop } from './kit';
import { Network } from './NetworkScene';
import type { SceneProps } from './types';

const CHIP = { height: 44, gap: 10, char: 21, padding: 28 };
const INPUT_X = 80;
const OUTPUT_X = 1330;
const MODEL = { x: 560, y: 60, width: 560, height: 440 };
const OUTPUT_EVERY = 16;

/** « Où| se| tient » → ['Où', 'se', 'tient']: the tokens, cut where the `|` are. */
const tokens = (text?: string) => (text ?? '').split('|').map((token) => token.trim()).filter(Boolean);

const Chip: React.FC<{ x: number; y: number; text: string; index: number; delay: number }> = ({ x, y, text, index, delay }) => {
  const scale = usePop(delay);
  const width = CHIP.padding + text.length * CHIP.char;
  return (
    <g transform={`translate(${x} ${y + CHIP.height / 2}) scale(${scale}) translate(0 ${-CHIP.height / 2})`}>
      <rect width={width} height={CHIP.height} rx={10} style={{ fill: COLORS.chartBar, fillOpacity: index % 2 ? 0.35 : 0.18, stroke: COLORS.chartBar, strokeWidth: 2 }} />
      <text x={width / 2} y={CHIP.height / 2 + 11} textAnchor="middle" style={{ fontSize: 30, fontWeight: 600, fill: COLORS.foreground }}>
        {fr(text)}
      </text>
    </g>
  );
};

/**
 * Tokens. Sections: the question (`texte`, cut into tokens with `|`), the model, the answer (`texte`, cut the same
 * way). Beats: the question is cut into tokens; they go through the layers of the model; the answer comes out one
 * token at a time. The second beat loops while waiting for the click.
 */
export const TokenScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const [question, model, answer] = sections;
  const input = tokens(question.text);
  const output = tokens(answer.text);
  const row = (index: number, count: number) => MODEL.y + MODEL.height / 2 + (index - (count - 1) / 2) * (CHIP.height + CHIP.gap) - CHIP.height / 2;
  const middle = MODEL.y + MODEL.height / 2;

  return (
    <g>
      <text x={INPUT_X} y={20} style={{ fontSize: 30, fontWeight: 700, fill: COLORS.muted, opacity: progress(frame, s0) }}>
        {fr(question.title)}
      </text>
      {input.map((token, index) => (
        <Chip key={index} x={INPUT_X} y={row(index, input.length)} text={token} index={index} delay={s0 + 10 + index * 5} />
      ))}

      {frame > s1 && (
        <>
          <rect x={MODEL.x - 50} y={MODEL.y - 20} width={MODEL.width + 100} height={MODEL.height + 40} rx={24} style={{ fill: 'none', stroke: COLORS.border, strokeWidth: 3, opacity: progress(frame, s1) }} />
          <text x={MODEL.x + MODEL.width / 2} y={20} textAnchor="middle" style={{ fontSize: 30, fontWeight: 700, fill: COLORS.muted, opacity: progress(frame, s1) }}>
            {fr(model.text ? `${model.title} : ${model.text}` : model.title)}
          </text>
          <Network layers={[5, 7, 7, 7, 5]} area={MODEL} delay={s1} signal={s1 + 20} radius={14} maxGap={80} />
          <Stream path={[{ x: 380, y: middle }, { x: MODEL.x - 50, y: middle }]} start={s1 + 10} gap={10} travel={30} />
        </>
      )}

      {frame > s2 && (
        <>
          <text x={OUTPUT_X} y={20} style={{ fontSize: 30, fontWeight: 700, fill: COLORS.muted, opacity: progress(frame, s2) }}>
            {fr(answer.title)}
          </text>
          <Stream path={[{ x: MODEL.x + MODEL.width + 50, y: middle }, { x: OUTPUT_X - 20, y: middle }]} start={s2} stop={s2 + output.length * OUTPUT_EVERY} gap={OUTPUT_EVERY} travel={16} color={COLORS.chartHighlight} />
          {output.map((token, index) => (
            <Chip key={index} x={OUTPUT_X} y={row(index, output.length)} text={token} index={index} delay={s2 + 16 + index * OUTPUT_EVERY} />
          ))}
        </>
      )}
    </g>
  );
};
