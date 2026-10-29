import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart, progress } from '../components/animation';
import { Badge, type Status } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

export type Machine = { name: string; tokensPerSecond: number; ours?: boolean; group: number };

// Stagger inside a click group; a group of five bars must still fit in ITEM_DELAY
const BAR_DELAY = 3;
const BAR_GROW = 16;

type SpeedCeilingSlideProps = {
  kicker: string;
  title: string;
  subtitle: string;
  status: Status[];
  /** Bars in display order; `group` is the click group the bar enters with. */
  machines: Machine[];
};

// Theoretical single-user speed ceilings, one model on several machines
export const SpeedCeilingSlide: React.FC<SpeedCeilingSlideProps> = ({ kicker, title, subtitle, status, machines }) => {
  const frame = useCurrentFrame();
  const max = Math.max(...machines.map((machine) => machine.tokensPerSecond));

  return (
    <SlideLayout kicker={kicker} title={title}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 30, color: COLORS.muted, marginTop: -24, ...fadeUp(frame, 0) }}>
        {fr(subtitle)}
        {status.map((item) => (
          <Badge key={item.label} kind={item.kind}>
            {fr(item.label)}
          </Badge>
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 48 }}>
        {machines.map((machine, index) => {
          const indexInGroup = machines.filter((other, otherIndex) => other.group === machine.group && otherIndex < index).length;
          const grow = progress(frame, itemStart(machine.group) + indexInGroup * BAR_DELAY, BAR_GROW);
          return (
            <div key={machine.name} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
              <div style={{ width: 400, fontSize: 32, textAlign: 'right', fontWeight: machine.ours ? 700 : 400 }}>
                {machine.name}
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 20 }}>
                <div
                  style={{
                    height: 48,
                    width: `${(machine.tokensPerSecond / max) * 85 * grow}%`,
                    backgroundColor: machine.ours ? COLORS.chartHighlight : COLORS.chartBar,
                    borderRadius: '0 4px 4px 0',
                  }}
                />
                <span style={{ fontSize: 32, fontWeight: 600, opacity: grow, whiteSpace: 'nowrap' }}>
                  ~{machine.tokensPerSecond} tok/s
                </span>
                {machine.ours && (
                  <span style={{ opacity: grow }}>
                    <Badge kind="tested">Nos cartes</Badge>
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
};
