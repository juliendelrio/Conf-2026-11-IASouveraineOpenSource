import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import type { Status } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

/** A component of the stack, with its licence shown as a tag. */
export type Brick = { name: string; licence?: string };

/** A layer of the diagram: a title, an optional one-line role and its components. */
export type Layer = { title: string; text?: string; bricks: Brick[]; highlight?: boolean };

type ArchitectureSlideProps = {
  kicker: string;
  title: string;
  status: Status[];
  /** Top band (who uses the platform). */
  top: Layer;
  /** Middle band (the gateway every request goes through). */
  middle: Layer;
  /** Bottom row, one column per tier. */
  bottom: Layer[];
  footer?: string;
};

const BrickTag: React.FC<{ brick: Brick }> = ({ brick }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '6px 12px',
      borderRadius: 8,
      backgroundColor: COLORS.background,
      fontSize: 28,
      whiteSpace: 'nowrap',
    }}
  >
    {fr(brick.name)}
    {brick.licence && (
      <span style={{ fontSize: 23, fontWeight: 700, color: COLORS.accent, border: `2px solid ${COLORS.accent}`, borderRadius: 999, padding: '0 9px' }}>
        {fr(brick.licence)}
      </span>
    )}
  </span>
);

const LayerBox: React.FC<{ layer: Layer; style?: React.CSSProperties }> = ({ layer, style }) => (
  <div
    style={{
      padding: '18px 28px',
      borderRadius: 14,
      backgroundColor: COLORS.surface,
      border: `3px solid ${layer.highlight ? COLORS.accent : 'transparent'}`,
      ...style,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 30, fontWeight: 700, color: layer.highlight ? COLORS.accent : COLORS.foreground }}>
        {fr(layer.title)}
      </span>
      {layer.text && <span style={{ fontSize: 28, color: COLORS.muted }}>{fr(layer.text)}</span>}
    </div>
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
      {layer.bricks.map((brick) => (
        <BrickTag key={brick.name} brick={brick} />
      ))}
    </div>
  </div>
);

const Arrow: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div style={{ textAlign: 'center', fontSize: 30, lineHeight: 1, color: COLORS.muted, margin: '6px 0', ...style }}>↓</div>
);

// The whole stack on one slide: users, the gateway, then the tiers; one band per click, licences as tags
export const ArchitectureSlide: React.FC<ArchitectureSlideProps> = ({ top, middle, bottom, ...common }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout {...common} footerDelay={itemStart(3)}>
      <LayerBox layer={top} style={fadeUp(frame, itemStart(0))} />
      <Arrow style={fadeUp(frame, itemStart(1))} />
      <LayerBox layer={middle} style={fadeUp(frame, itemStart(1))} />
      <Arrow style={fadeUp(frame, itemStart(2))} />
      <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', ...fadeUp(frame, itemStart(2)) }}>
        {bottom.map((layer) => (
          <LayerBox key={layer.title} layer={layer} style={{ flex: 1 }} />
        ))}
      </div>
    </SlideLayout>
  );
};
