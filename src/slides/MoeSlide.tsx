import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart, progress } from '../components/animation';
import { Badge, type Status } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

export type Bar = { label: string; value: number; unit: string; note?: string; highlight?: boolean };

const BarGroup: React.FC<{ title: string; bars: Bar[]; max: number; delay: number }> = ({ title, bars, max, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ ...fadeUp(frame, delay) }}>
      <div style={{ fontSize: 30, fontWeight: 700, color: COLORS.muted, textTransform: 'uppercase', letterSpacing: 2 }}>
        {fr(title)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
        {bars.map((bar, index) => {
          const grow = progress(frame, delay + 4 + index * 4, 18);
          return (
            <div key={bar.label} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 360, fontSize: 32, textAlign: 'right' }}>{fr(bar.label)}</div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div
                  style={{
                    height: 46,
                    width: `${(bar.value / max) * 80 * grow}%`,
                    backgroundColor: bar.highlight ? COLORS.chartHighlight : COLORS.chartBar,
                    borderRadius: '0 4px 4px 0',
                  }}
                />
                <span style={{ fontSize: 32, fontWeight: 600, whiteSpace: 'nowrap', opacity: grow }}>
                  {fr(`${bar.value} ${bar.unit}`)}
                </span>
                {bar.note && <span style={{ fontSize: 28, color: COLORS.muted, opacity: grow }}>{fr(bar.note)}</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

type MoeSlideProps = {
  kicker: string;
  title: string;
  status: Status[];
  /** Bar groups, one per click; all bars share the same scale. */
  groups: { title: string; bars: Bar[] }[];
  /** Measured figure, shown with a « Mesuré » badge after the groups. */
  measure?: string;
  footer?: string;
};

// MoE: fewer weights read per token (faster), but the whole model must fit in VRAM
export const MoeSlide: React.FC<MoeSlideProps> = ({ kicker, title, status, groups, measure, footer }) => {
  const frame = useCurrentFrame();
  const max = Math.max(...groups.flatMap((group) => group.bars.map((bar) => bar.value)));
  const measureGroup = groups.length;

  return (
    <SlideLayout
      kicker={kicker}
      title={title}
      status={status}
      footer={footer}
      footerDelay={itemStart(measureGroup + (measure ? 1 : 0))}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
        {groups.map((group, index) => (
          <BarGroup key={group.title} title={group.title} bars={group.bars} max={max} delay={itemStart(index)} />
        ))}
        {measure && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 30, ...fadeUp(frame, itemStart(measureGroup)) }}>
            <Badge kind="tested">Mesuré</Badge>
            {fr(measure)}
          </div>
        )}
      </div>
    </SlideLayout>
  );
};
