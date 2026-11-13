import QRCode from 'qrcode';
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

/** The QR code of a URL as SVG, computed locally (no network): the first link, so the room can open the slides. */
const Qr: React.FC<{ url: string; size: number }> = ({ url, size }) => {
  const { modules } = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const cells = modules.size;
  const dark: { x: number; y: number }[] = [];
  for (let y = 0; y < cells; y++) for (let x = 0; x < cells; x++) if (modules.get(y, x)) dark.push({ x, y });
  return (
    <svg viewBox={`-2 -2 ${cells + 4} ${cells + 4}`} width={size} height={size} shapeRendering="crispEdges">
      <rect x={-2} y={-2} width={cells + 4} height={cells + 4} style={{ fill: '#ffffff' }} />
      {dark.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} style={{ fill: '#000000' }} />
      ))}
    </svg>
  );
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
      {links.length > 0 && (
        <div style={{ position: 'absolute', right: 120, top: 250, textAlign: 'center', ...fadeUp(frame, linksStart) }}>
          <Qr url={`https://${links[0].url}`} size={340} />
          <p style={{ fontSize: 30, fontWeight: 600, margin: '12px 0 0' }}>{fr(links[0].label)}</p>
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
