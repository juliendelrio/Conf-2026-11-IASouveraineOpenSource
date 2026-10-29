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

type SpeedFormulaSlideProps = {
  kicker: string;
  title: string;
  /** The three terms of `a ÷ b = c`, each with an example under it. */
  terms: { label: string; sub: string }[];
  footer?: string;
};

// The rule of thumb: bandwidth ÷ weights read per token = single-user speed ceiling (one term per click)
export const SpeedFormulaSlide: React.FC<SpeedFormulaSlideProps> = ({ kicker, title, terms, footer }) => {
  const [bandwidth, weights, ceiling] = terms;
  return (
    <SlideLayout kicker={kicker} title={title} footer={footer} footerDelay={itemStart(3)}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 48 }}>
        <Term label={bandwidth.label} sub={bandwidth.sub} delay={itemStart(0)} />
        <Operator symbol="÷" delay={itemStart(1)} />
        <Term label={weights.label} sub={weights.sub} delay={itemStart(1) + 6} />
        <Operator symbol="=" delay={itemStart(2)} />
        <Term label={ceiling.label} sub={ceiling.sub} delay={itemStart(2) + 6} />
      </div>
    </SlideLayout>
  );
};
