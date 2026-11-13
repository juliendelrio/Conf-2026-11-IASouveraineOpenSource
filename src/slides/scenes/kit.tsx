// Building blocks of the motion-design scenes: boxes, links and request streams drawn in one SVG.
// Everything is a pure function of the frame, so renders stay deterministic.
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { progress } from '../../components/animation';
import { fr } from '../../components/typography';
import { COLORS } from '../../theme';

/** Size of the scene drawing (SVG user units), scaled to the slide body. */
export const SCENE = { width: 1680, height: 560 } as const;

export type Point = { x: number; y: number };

// --- Timeline ------------------------------------------------------------------------------------------------

/** Start frame of each beat (one per click), given the length of every beat, from `first`. */
export const beatStarts = (lengths: number[], first: number) =>
  lengths.reduce<number[]>((starts, _, index) => [...starts, index === 0 ? first : starts[index - 1] + lengths[index - 1]], []);

/** Pop-in scale (0 → 1 with a small overshoot) starting at `delay`. */
export const usePop = (delay: number) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const value = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 160 } });
  // Snap to 1 once settled, so a looping scene renders the exact same frame each period
  return Math.abs(value - 1) < 0.005 ? 1 : value;
};

// --- Geometry ------------------------------------------------------------------------------------------------

const length = (a: Point, b: Point) => Math.hypot(b.x - a.x, b.y - a.y);

/** Point at fraction `t` (0 → 1) of the polyline's length. */
export const along = (path: Point[], t: number): Point => {
  const total = path.slice(1).reduce((sum, point, index) => sum + length(path[index], point), 0);
  let rest = Math.min(Math.max(t, 0), 1) * total;
  for (let index = 1; index < path.length; index++) {
    const segment = length(path[index - 1], path[index]);
    if (rest <= segment || index === path.length - 1) {
      const k = segment === 0 ? 0 : rest / segment;
      return { x: path[index - 1].x + (path[index].x - path[index - 1].x) * k, y: path[index - 1].y + (path[index].y - path[index - 1].y) * k };
    }
    rest -= segment;
  }
  return path[path.length - 1];
};

/** Deterministic pseudo-random number in [0, 1) for an integer seed. */
export const random = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// --- Drawing -------------------------------------------------------------------------------------------------

type BoxProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  text?: string;
  /** Accent border (the part of the scene that matters right now). */
  highlight?: boolean;
  /** Danger border (what breaks). */
  danger?: boolean;
  /** Faded: out of service. */
  dim?: boolean;
  /** Frame at which the box enters. */
  delay: number;
  /** Frame after which the box fades out. */
  hide?: number;
};

/** 1 → 0 over 10 frames after `hide` (1 when there is no `hide`). */
const remaining = (frame: number, hide?: number) => (hide === undefined ? 1 : 1 - progress(frame, hide, 10));

export const Box: React.FC<BoxProps> = ({ x, y, width, height, title, text, highlight, danger, dim, delay, hide }) => {
  const frame = useCurrentFrame();
  const enter = progress(frame, delay) * remaining(frame, hide);
  const border = danger ? COLORS.danger : highlight ? COLORS.accent : COLORS.border;
  return (
    <g style={{ opacity: enter * (dim ? 0.45 : 1) }} transform={`translate(0 ${(1 - enter) * 20})`}>
      <rect x={x} y={y} width={width} height={height} rx={18} style={{ fill: COLORS.surface, stroke: border, strokeWidth: highlight || danger ? 5 : 3 }} />
      <text
        x={x + width / 2}
        y={y + (text ? height / 2 - 8 : height / 2 + 12)}
        textAnchor="middle"
        style={{ fontSize: 36, fontWeight: 700, fill: highlight ? COLORS.accent : COLORS.foreground }}
      >
        {fr(title)}
      </text>
      {text && (
        <text x={x + width / 2} y={y + height / 2 + 36} textAnchor="middle" style={{ fontSize: 29, fill: COLORS.muted }}>
          {fr(text)}
        </text>
      )}
    </g>
  );
};

/** Center of a box's left or right edge, where links attach. */
export const edge = (box: { x: number; y: number; width: number; height: number }, side: 'left' | 'right'): Point => ({
  x: side === 'left' ? box.x : box.x + box.width,
  y: box.y + box.height / 2,
});

type LinkProps = { path: Point[]; delay: number; danger?: boolean; active?: boolean; hide?: number };

/** The wire between two boxes: drawn in at `delay`, dashed in danger color once cut. */
export const Link: React.FC<LinkProps> = ({ path, delay, danger, active, hide }) => {
  const frame = useCurrentFrame();
  const draw = progress(frame, delay, 20);
  const points = path.map((point) => `${point.x},${point.y}`).join(' ');
  const total = path.slice(1).reduce((sum, point, index) => sum + length(path[index], point), 0);
  return (
    <polyline
      points={points}
      style={{
        fill: 'none',
        stroke: danger ? COLORS.danger : active ? COLORS.accent : COLORS.border,
        strokeWidth: 5,
        strokeLinejoin: 'round',
        strokeDasharray: danger ? '14 12' : `${total} ${total}`,
        strokeDashoffset: danger ? 0 : total * (1 - draw),
        opacity: remaining(frame, hide),
      }}
    />
  );
};

type StreamProps = {
  path: Point[];
  /** First request leaves at this frame. */
  start: number;
  /** No new request leaves after this frame. */
  stop?: number;
  /** Requests in flight vanish after this frame (a cut). */
  vanish?: number;
  /** Frames between two requests. */
  gap?: number;
  /** Frames for a request to travel the whole path. */
  travel?: number;
  color?: string;
  radius?: number;
};

/** Requests flowing along a path, as dots. */
export const Stream: React.FC<StreamProps> = ({ path, start, stop = Infinity, vanish = Infinity, gap = 10, travel = 45, color = COLORS.chartBar, radius = 10 }) => {
  const frame = useCurrentFrame();
  if (frame < start) return null;
  const fade = frame > vanish ? interpolate(frame, [vanish, vanish + 8], [1, 0], { extrapolateRight: 'clamp' }) : 1;
  if (fade === 0) return null;
  const dots: Point[] = [];
  const last = Math.floor((Math.min(frame, stop) - start) / gap);
  for (let index = Math.max(0, Math.ceil((frame - start - travel) / gap)); index <= last; index++) {
    const t = (frame - start - index * gap) / travel;
    if (t >= 0 && t <= 1) dots.push(along(path, t));
  }
  return (
    <g style={{ opacity: fade }}>
      {dots.map((dot, index) => (
        <circle key={index} cx={dot.x} cy={dot.y} r={radius} style={{ fill: color }} />
      ))}
    </g>
  );
};

/** A cross on a cut link. */
export const Cut: React.FC<{ at: Point; delay: number }> = ({ at, delay }) => {
  const scale = usePop(delay);
  return (
    <g transform={`translate(${at.x} ${at.y}) scale(${scale})`}>
      <circle r={38} style={{ fill: COLORS.background, stroke: COLORS.danger, strokeWidth: 5 }} />
      <path d="M -16 -16 L 16 16 M 16 -16 L -16 16" style={{ stroke: COLORS.danger, strokeWidth: 7, strokeLinecap: 'round' }} />
    </g>
  );
};

/** A pill label popping next to a box (a price tag, a load level…). */
export const Tag: React.FC<{ at: Point; text: string; delay: number; danger?: boolean }> = ({ at, text, delay, danger }) => {
  const scale = usePop(delay);
  const width = 40 + text.length * 19;
  return (
    <g transform={`translate(${at.x} ${at.y}) scale(${scale})`}>
      <rect x={-width / 2} y={-30} width={width} height={60} rx={30} style={{ fill: danger ? COLORS.danger : COLORS.accent }} />
      <text y={11} textAnchor="middle" style={{ fontSize: 32, fontWeight: 700, fill: COLORS.background }}>
        {fr(text)}
      </text>
    </g>
  );
};

// --- Scene frame ---------------------------------------------------------------------------------------------

type SceneFrameProps = {
  /** One caption per beat, shown under the drawing while its beat runs. */
  captions: string[];
  starts: number[];
  children: React.ReactNode;
};

/** The drawing on top, and the caption of the current beat below it (cross-fading from one beat to the next). */
export const SceneFrame: React.FC<SceneFrameProps> = ({ captions, starts, children }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <svg viewBox={`0 0 ${SCENE.width} ${SCENE.height}`} style={{ width: '100%', flex: 1, overflow: 'visible' }}>
        {children}
      </svg>
      <div style={{ position: 'relative', height: 60, marginTop: 24 }}>
        {captions.map((caption, index) => {
          const enter = progress(frame, starts[index] + 4);
          const leave = index + 1 < starts.length ? 1 - progress(frame, starts[index + 1], 8) : 1;
          return (
            <p
              key={caption}
              style={{
                position: 'absolute',
                inset: 0,
                margin: 0,
                fontSize: 38,
                fontWeight: 600,
                paddingLeft: 28,
                borderLeft: `6px solid ${COLORS.accent}`,
                opacity: Math.min(enter, leave),
              }}
            >
              {fr(caption)}
            </p>
          );
        })}
      </div>
    </div>
  );
};
