import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

const Term: React.FC<{ label: string; sub: string; delay: number }> = ({ label, sub, delay }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ textAlign: 'center', ...fadeUp(frame, delay) }}>
      <div
        style={{
          fontSize: 52,
          fontWeight: 700,
          padding: '28px 40px',
          borderRadius: 16,
          backgroundColor: COLORS.surface,
        }}
      >
        {fr(label)}
      </div>
      <div style={{ fontSize: 28, color: COLORS.muted, marginTop: 20 }}>{fr(sub)}</div>
    </div>
  );
};

const Operator: React.FC<{ symbol: string; delay: number }> = ({ symbol, delay }) => {
  const frame = useCurrentFrame();
  return <div style={{ fontSize: 80, fontWeight: 300, color: COLORS.accent, marginTop: -50, ...fadeUp(frame, delay) }}>{symbol}</div>;
};

// 3.3 — The rule of thumb: bandwidth ÷ weights read per token = single-user speed ceiling
export const SpeedFormulaSlide: React.FC = () => (
  <SlideLayout
    kicker="Le matériel"
    title="Le réflexe à retenir"
    footer="Pour chaque token généré, la carte relit tous les poids utiles : un bon moteur atteint environ 80 % de ce plafond"
    footerDelay={itemStart(3)}
  >
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
      <Term label="Bande passante mémoire" sub="ex. 1,6 To/s" delay={itemStart(0)} />
      <Operator symbol="÷" delay={itemStart(1)} />
      <Term label="Poids lus par token" sub="ex. 16 Go" delay={itemStart(1) + 6} />
      <Operator symbol="=" delay={itemStart(2)} />
      <Term label="Plafond de vitesse" sub="~100 tokens/s, un utilisateur seul" delay={itemStart(2) + 6} />
    </div>
  </SlideLayout>
);
