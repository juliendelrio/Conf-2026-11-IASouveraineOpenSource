import { Img, useCurrentFrame } from 'remotion';
import { BODY_START, fadeUp } from '../components/animation';
import { Qr } from '../components/Qr';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

type MentionSlideProps = {
  kicker: string;
  /** The talk being mentioned. */
  title: string;
  photo?: string;
  name: string;
  affiliation?: string;
  text?: string;
  /** The address the QR code opens (without the scheme), and its caption. */
  qr?: { url: string; label?: string };
};

const PHOTO = 340;

// A mention of someone else's talk: their photo, name and affiliation on the left, where to watch it on the right
export const MentionSlide: React.FC<MentionSlideProps> = ({ kicker, title, photo, name, affiliation, text, qr }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout kicker={kicker} title={title}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 64, ...fadeUp(frame, BODY_START) }}>
        {photo && (
          <Img
            src={photo}
            style={{ width: PHOTO, height: PHOTO, borderRadius: '50%', objectFit: 'cover', border: `6px solid ${COLORS.accent}`, flexShrink: 0 }}
          />
        )}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{fr(name)}</div>
          {affiliation && <div style={{ fontSize: 38, color: COLORS.muted, marginTop: 14 }}>{fr(affiliation)}</div>}
          {text && <p style={{ fontSize: 38, lineHeight: 1.35, margin: '44px 0 0' }}>{fr(text)}</p>}
        </div>
        {qr && (
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <Qr url={`https://${qr.url}`} size={320} />
            {qr.label && <p style={{ fontSize: 30, fontWeight: 600, margin: '14px 0 0' }}>{fr(qr.label)}</p>}
            <p style={{ fontSize: 28, color: COLORS.muted, margin: '6px 0 0' }}>{qr.url}</p>
          </div>
        )}
      </div>
    </SlideLayout>
  );
};
