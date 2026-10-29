import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart, progress } from '../components/animation';
import { Badge } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

type Bar = { label: string; value: number; unit: string; note?: string; highlight?: boolean };

const SCALE_MAX = 200;

const BarGroup: React.FC<{ title: string; bars: Bar[]; delay: number; children?: React.ReactNode }> = ({
  title,
  bars,
  delay,
  children,
}) => {
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
                    width: `${(bar.value / SCALE_MAX) * 80 * grow}%`,
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
      {children}
    </div>
  );
};

// 3.5 — MoE: fewer weights read per token (faster), but the whole model must fit in VRAM
export const MoeSlide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout
      kicker="Le matériel"
      title="Le MoE change la donne"
      status={[
        { kind: 'tested', label: '2 RTX PRO 6000 testées' },
        { kind: 'extrapolated', label: 'H100 extrapolé' },
      ]}
      footer="Le Flash-Next va plus vite que le 27B, mais il faut pouvoir le loger en entier : la mémoire compte autant que la vitesse"
      footerDelay={itemStart(3)}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
        <BarGroup
          title="Lu à chaque token : la vitesse"
          delay={itemStart(0)}
          bars={[
            { label: 'Qwen3.8-27B (4 bits)', value: 16, unit: 'Go' },
            { label: 'Qwen3.8-Flash-Next', value: 6, unit: 'Go', note: 'seuls les paramètres actifs', highlight: true },
          ]}
        />
        <BarGroup
          title="À loger en mémoire : la capacité"
          delay={itemStart(1)}
          bars={[
            { label: 'Qwen3.8-Flash-Next', value: 186, unit: 'Go', highlight: true },
            { label: '2 RTX PRO 6000', value: 192, unit: 'Go', note: 'ça tient' },
            { label: '2 H100', value: 160, unit: 'Go', note: 'ça ne tient pas' },
          ]}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 30, ...fadeUp(frame, itemStart(2)) }}>
          <Badge kind="tested">Mesuré</Badge>
          {fr('~200 tok/s sur 2 RTX PRO 6000 avec un utilisateur, ~127 tok/s par requête en production')}
        </div>
      </div>
    </SlideLayout>
  );
};
