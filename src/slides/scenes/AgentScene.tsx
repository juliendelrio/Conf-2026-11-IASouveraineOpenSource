import { useCurrentFrame } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';
import { along, Box, Stream, type Point, Tag } from './kit';
import type { SceneProps } from './types';

const NODE = { width: 280, height: 110 };
const CENTERS: Point[] = [
  { x: 330, y: 75 },
  { x: 560, y: 450 },
  { x: 100, y: 450 },
];
const HUB = { x: 330, y: 330 };
const ITERATIONS = 4;
const EDGE = 12;
const SLOTS = { cols: 4, rows: 3, width: 150, height: 86, gap: 20, x: 900, y: 80 };
/** One developer workstation per row of slots: its harness runs `SLOTS.cols` sub-agents in parallel. */
const STATION = { x: 60, width: 400, height: 90 };
const FILL_EVERY = 6;
/** The slots drawn: fewer than the grid, the last workstation does not get all the conversations it asks for. */
const SLOT_COUNT = 10;

const node = (center: Point) => ({ x: center.x - NODE.width / 2, y: center.y - NODE.height / 2, ...NODE });
const rowCenter = (row: number) => SLOTS.y + row * (SLOTS.height + SLOTS.gap) + SLOTS.height / 2;

/**
 * Agentic development, seen from our cards. Sections: the three steps of the loop (the last one's `détail` is the
 * success tag), the iteration counter, the concurrent conversations (`texte`: the maximum, `détail`: the queued one),
 * the developer workstation (`texte`: what runs on it). Beats: a request goes round the loop until the check passes;
 * the harness on a developer's workstation runs sub-agents in parallel, each taking a conversation slot; a few more
 * developers fill every slot and the next request waits. The second beat loops while waiting for the click.
 */
export const AgentScene: React.FC<SceneProps> = ({ sections, starts: [s0, s1, s2] }) => {
  const frame = useCurrentFrame();
  const steps = sections.slice(0, 3);
  const [iterations, capacity, station] = sections.slice(3);

  // The pulse goes read → act → check, ITERATIONS times, coming back to read between two iterations
  const edges = ITERATIONS * 3 - 1;
  const start = s0 + 20;
  const elapsed = Math.min(Math.max(frame - start, 0), edges * EDGE);
  const edgeIndex = Math.min(Math.floor(elapsed / EDGE), edges - 1);
  const pulse = along([CENTERS[edgeIndex % 3], CENTERS[(edgeIndex + 1) % 3]], elapsed / EDGE - edgeIndex);
  const done = frame >= start + edges * EDGE;
  const iteration = frame < start ? 0 : Math.min(Math.floor(elapsed / (3 * EDGE)) + 1, ITERATIONS);
  const at = done ? 2 : elapsed % EDGE > EDGE - 3 ? (edgeIndex + 1) % 3 : -1;
  const loopShown = progress(frame, s0) * (1 - progress(frame, s1, 10));

  // Slots fill row by row: the first workstation on the second beat, the two others on the third
  const slotCount = SLOT_COUNT;
  const fillsAt = (index: number) =>
    index < SLOTS.cols ? s1 + 15 + index * FILL_EVERY : s2 + 10 + (index - SLOTS.cols) * FILL_EVERY;
  const stationAt = (row: number) => (row === 0 ? s1 + 4 : s2 + 2 + (row - 1) * 4 * FILL_EVERY);
  const queuedAt = fillsAt(slotCount - 1) + 14;
  const slot = (index: number) => ({
    x: SLOTS.x + (index % SLOTS.cols) * (SLOTS.width + SLOTS.gap),
    y: SLOTS.y + Math.floor(index / SLOTS.cols) * (SLOTS.height + SLOTS.gap),
  });
  const gridWidth = SLOTS.cols * (SLOTS.width + SLOTS.gap) - SLOTS.gap;
  const gridBottom = SLOTS.y + SLOTS.rows * (SLOTS.height + SLOTS.gap) - SLOTS.gap;
  const capacityIn = progress(frame, s1 + 2);

  return (
    <>
      {/* The loop of one agent */}
      <g style={{ opacity: loopShown }}>
        {CENTERS.map((center, index) => {
          const next = CENTERS[(index + 1) % 3];
          return <line key={index} x1={center.x} y1={center.y} x2={next.x} y2={next.y} style={{ stroke: COLORS.border, strokeWidth: 6 }} />;
        })}
        <text x={HUB.x} y={HUB.y + 10} textAnchor="middle" style={{ fontSize: 96, fontWeight: 800, fill: done ? COLORS.accent : COLORS.foreground }}>
          {iteration}
        </text>
        <text x={HUB.x} y={HUB.y + 56} textAnchor="middle" style={{ fontSize: 28, fill: COLORS.muted }}>
          {fr(iterations.title)}
        </text>
      </g>
      {CENTERS.map((center, index) => (
        <Box key={index} {...node(center)} title={steps[index].title} text={steps[index].text} delay={s0 + index * 3} hide={s1} highlight={at === index} />
      ))}
      {frame >= start && !done && <circle cx={pulse.x} cy={pulse.y} r={16} style={{ fill: COLORS.chartHighlight }} />}
      {done && frame <= s1 + 10 && steps[2].detail && (
        <g style={{ opacity: 1 - progress(frame, s1, 10) }}>
          <Tag at={{ x: CENTERS[2].x, y: CENTERS[2].y + NODE.height / 2 + 30 }} text={steps[2].detail} delay={start + edges * EDGE} />
        </g>
      )}

      {/* Developer workstations: the harness runs there and sends its sub-agents' requests in parallel */}
      {Array.from({ length: SLOTS.rows }, (_, row) =>
        frame > stationAt(row) ? (
          <g key={`station${row}`}>
            <Stream
              path={[
                { x: STATION.x + STATION.width, y: rowCenter(row) },
                { x: SLOTS.x, y: rowCenter(row) },
              ]}
              start={stationAt(row) + 10}
              gap={10}
              travel={30}
            />
            <Box
              x={STATION.x}
              y={rowCenter(row) - STATION.height / 2}
              width={STATION.width}
              height={STATION.height}
              title={`${station.title} ${row + 1}`}
              text={station.text}
              delay={stationAt(row)}
            />
          </g>
        ) : null,
      )}

      {/* The capacity of our cards */}
      <g style={{ opacity: capacityIn }}>
        <text x={SLOTS.x + gridWidth / 2} y={SLOTS.y - 34} textAnchor="middle" style={{ fontSize: 32, fontWeight: 700, fill: COLORS.foreground }}>
          {fr(capacity.text ? `${capacity.title} : ${capacity.text}` : capacity.title)}
        </text>
        {Array.from({ length: slotCount }, (_, index) => {
          const { x, y } = slot(index);
          const busy = frame > fillsAt(index);
          // A small loop turning in each busy slot: 12° per frame, so it repeats every 30 frames
          const angle = ((frame * 12 + index * 40) * Math.PI) / 180;
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={SLOTS.width}
                height={SLOTS.height}
                rx={14}
                style={{ fill: busy ? COLORS.surface : 'none', stroke: busy ? COLORS.accent : COLORS.border, strokeWidth: 3 }}
              />
              {busy && (
                <>
                  <circle cx={x + SLOTS.width / 2} cy={y + SLOTS.height / 2} r={22} style={{ fill: 'none', stroke: COLORS.border, strokeWidth: 4 }} />
                  <circle cx={x + SLOTS.width / 2 + Math.cos(angle) * 22} cy={y + SLOTS.height / 2 + Math.sin(angle) * 22} r={8} style={{ fill: COLORS.chartHighlight }} />
                </>
              )}
            </g>
          );
        })}
        {frame > queuedAt && (
          <g style={{ opacity: progress(frame, queuedAt) }}>
            <rect
              x={SLOTS.x + gridWidth / 2 - SLOTS.width / 2}
              y={gridBottom + 40}
              width={SLOTS.width}
              height={SLOTS.height}
              rx={14}
              style={{ fill: 'none', stroke: COLORS.danger, strokeWidth: 3, strokeDasharray: '10 8' }}
            />
            {capacity.detail && (
              <text x={SLOTS.x + gridWidth / 2 + SLOTS.width / 2 + 24} y={gridBottom + 40 + SLOTS.height / 2 + 10} style={{ fontSize: 30, fontWeight: 700, fill: COLORS.danger }}>
                {fr(capacity.detail)}
              </text>
            )}
          </g>
        )}
      </g>
    </>
  );
};
