import { useCurrentFrame } from 'remotion';
import { fadeUp, progress } from '../components/animation';
import { Badge } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { COLORS } from '../theme';

type Machine = { name: string; tokensPerSecond: number; ours?: boolean };

// Theoretical ceiling = memory bandwidth ÷ 16 GB read per token (Qwen3.8-27B in 4 bits), see docs/storyline.md
const MACHINES: Machine[] = [
  { name: 'DGX Spark', tokensPerSecond: 17 },
  { name: 'L4', tokensPerSecond: 19 },
  { name: 'Mac M5 Max', tokensPerSecond: 38 },
  { name: 'L40S', tokensPerSecond: 54 },
  { name: 'Mac Studio M5 Ultra', tokensPerSecond: 75 },
  { name: 'RTX PRO 6000', tokensPerSecond: 100, ours: true },
  { name: 'H100 SXM', tokensPerSecond: 210 },
  { name: 'H200', tokensPerSecond: 300 },
];

const MAX = 300;
const BAR_DELAY = 6;

// 3.4 — Theoretical single-user speed ceilings, one model on several machines
export const SpeedCeilingSlide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout kicker="Le matériel" title="Plafond de vitesse, un utilisateur seul">
      <div style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 30, color: COLORS.muted, marginTop: -24, ...fadeUp(frame, 5) }}>
        Qwen3.8-27B en 4 bits · bande passante ÷ 16 Go lus par token
        <Badge kind="extrapolated">Extrapolé</Badge>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 48 }}>
        {MACHINES.map((machine, index) => {
          const grow = progress(frame, 15 + index * BAR_DELAY, 25);
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
