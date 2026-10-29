import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart, progress } from '../components/animation';
import { Badge } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { COLORS } from '../theme';

type Machine = { name: string; tokensPerSecond: number; ours?: boolean; group: number };

// Theoretical ceiling = memory bandwidth ÷ 16 GB read per token (Qwen3.8-27B in 4 bits), see docs/storyline.md
const MACHINES: Machine[] = [
  { name: 'DGX Spark', tokensPerSecond: 17, group: 0 },
  { name: 'L4', tokensPerSecond: 19, group: 0 },
  { name: 'Mac M5 Max', tokensPerSecond: 38, group: 0 },
  { name: 'L40S', tokensPerSecond: 54, group: 0 },
  { name: 'Mac Studio M5 Ultra', tokensPerSecond: 75, group: 0 },
  { name: 'RTX PRO 6000', tokensPerSecond: 100, ours: true, group: 1 },
  { name: 'H100 SXM', tokensPerSecond: 210, group: 2 },
  { name: 'H200', tokensPerSecond: 300, group: 2 },
];

const MAX = 300;
// Stagger inside a click group; a group of five bars must still fit in ITEM_DELAY
const BAR_DELAY = 3;
const BAR_GROW = 16;

// 3.4 — Theoretical single-user speed ceilings, one model on several machines
export const SpeedCeilingSlide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout kicker="Le matériel" title="Plafond de vitesse, un utilisateur seul">
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 30, color: COLORS.muted, marginTop: -24, ...fadeUp(frame, 0) }}>
        Qwen3.8-27B en 4 bits · bande passante ÷ 16 Go lus par token
        <Badge kind="extrapolated">Extrapolé</Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 48 }}>
        {MACHINES.map((machine, index) => {
          const indexInGroup = MACHINES.filter((other, otherIndex) => other.group === machine.group && otherIndex < index).length;
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
                    width: `${(machine.tokensPerSecond / MAX) * 85 * grow}%`,
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
