import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

type ThanksSlideProps = {
  kicker: string;
  title: string;
  links: { label: string; url: string }[];
  signature: string;
};

// Thanks and questions: the links enter one after the other, then the signature
export const ThanksSlide: React.FC<ThanksSlideProps> = ({ kicker, title, links, signature }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout kicker={kicker} title={title}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 20 }}>
        {links.map((link, index) => (
          <div key={link.label} style={{ display: 'grid', gridTemplateColumns: '300px 1fr', fontSize: 40, ...fadeUp(frame, 10 + index * 8) }}>
            <span style={{ color: COLORS.muted }}>{fr(link.label)}</span>
            <span style={{ fontWeight: 600, color: COLORS.accent }}>{link.url}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 36, marginTop: 'auto', ...fadeUp(frame, itemStart(2)) }}>{fr(signature)}</p>
    </SlideLayout>
  );
};
