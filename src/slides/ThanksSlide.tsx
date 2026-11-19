import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { Qr } from '../components/Qr';
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
  /** The QR codes, one above the other: the address each opens (without the scheme), and its caption. */
  qrs: { url: string; label?: string }[];
};

// Thanks and questions: the call for questions first, then the links one after the other, then the signature
export const ThanksSlide: React.FC<ThanksSlideProps> = ({ kicker, title, call, links, signature, qrs }) => {
  const frame = useCurrentFrame();
  const linksStart = call ? 18 : 10;

  return (
    <SlideLayout kicker={kicker} title={title}>
      {call && (
        <p style={{ fontSize: 120, fontWeight: 800, lineHeight: 1, color: COLORS.accent, margin: 0, ...fadeUp(frame, 6) }}>{fr(call)}</p>
      )}
      {qrs.length > 0 && (
        // One code is shown large; two share the height of the slide
        <div style={{ position: 'absolute', right: 120, top: qrs.length > 1 ? 210 : 250, display: 'flex', flexDirection: 'column', gap: 26, textAlign: 'center', ...fadeUp(frame, linksStart) }}>
          {qrs.map((qr) => (
            <div key={qr.url}>
              <Qr url={`https://${qr.url}`} size={qrs.length > 1 ? 290 : 340} />
              {qr.label && <p style={{ fontSize: 30, fontWeight: 600, margin: '10px 0 0' }}>{fr(qr.label)}</p>}
            </div>
          ))}
        </div>
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
