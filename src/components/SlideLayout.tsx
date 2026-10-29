import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { COLORS, FONT_FAMILY } from '../theme';
import { fadeUp } from './animation';
import { Badge, type Status } from './Badge';
import { fr } from './typography';

type SlideLayoutProps = {
  /** Small label above the title, e.g. the chapter name. */
  kicker: string;
  title: string;
  /** Tested / extrapolated badges shown next to the kicker. */
  status?: Status[];
  /** Closing line at the bottom of the slide, entering after the body. */
  footer?: string;
  /** Frame at which the footer enters. */
  footerDelay?: number;
  children: React.ReactNode;
};

/** Common frame for content slides: kicker and title enter first, then the body, then the footer. */
export const SlideLayout: React.FC<SlideLayoutProps> = ({ kicker, title, status, footer, footerDelay = 40, children }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        color: COLORS.foreground,
        fontFamily: FONT_FAMILY,
        padding: '90px 120px',
      }}
    >
      <div style={fadeUp(frame, 0)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <span
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: COLORS.accent,
            }}
          >
            {fr(kicker)}
          </span>
          {status?.map((item) => (
            <Badge key={item.label} kind={item.kind}>
              {fr(item.label)}
            </Badge>
          ))}
        </div>
        <h1 style={{ fontSize: 68, margin: '16px 0 0', lineHeight: 1.1 }}>{fr(title)}</h1>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: 56 }}>{children}</div>
      {footer && (
        <p
          style={{
            fontSize: 34,
            lineHeight: 1.35,
            margin: '32px 0 0',
            paddingLeft: 28,
            borderLeft: `6px solid ${COLORS.accent}`,
            ...fadeUp(frame, footerDelay),
          }}
        >
          {fr(footer)}
        </p>
      )}
    </AbsoluteFill>
  );
};
