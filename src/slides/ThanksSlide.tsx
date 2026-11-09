import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

type ThanksSlideProps = {
  kicker: string;
  title: string;
  /** The call for questions, shown large. */
  call?: string;
  links: { label: string; url: string }[];
  signature: string;
};

// Thanks and questions: the call for questions first, then the links one after the other, then the signature
export const ThanksSlide: React.FC<ThanksSlideProps> = ({ kicker, title, call, links, signature }) => {
  const frame = useCurrentFrame();
  const linksStart = call ? 18 : 10;

  return (
    <SlideLayout kicker={kicker} title={title}>
      {call && (
        <p style={{ fontSize: 120, fontWeight: 800, lineHeight: 1, color: COLORS.accent, margin: 0, ...fadeUp(frame, 6) }}>{fr(call)}</p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: call ? 60 : 20 }}>
        {links.map((link, index) => (
          <div key={link.label} style={{ display: 'grid', gridTemplateColumns: '240px 1fr', fontSize: 34, ...fadeUp(frame, linksStart + index * 6) }}>
            <span style={{ color: COLORS.muted }}>{fr(link.label)}</span>
            <span style={{ fontWeight: 600, color: COLORS.foreground }}>{link.url}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 32, marginTop: 'auto', ...fadeUp(frame, itemStart(2)) }}>{fr(signature)}</p>
    </SlideLayout>
  );
};
