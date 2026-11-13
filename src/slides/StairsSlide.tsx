import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { Badge, type Status } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

/** A step of the staircase: what it is, then either a plain line and a muted one, or a figure and its caption. */
export type Stair = {
  title: string;
  text?: string;
  detail?: string;
  value?: string;
  caption?: string;
  status: Status[];
  highlight?: boolean;
};

type StairsSlideProps = {
  kicker: string;
  title: string;
  status: Status[];
  stairs: Stair[];
  footer?: string;
};

/** Height of the lowest step, and what each next step adds (% of the body): the climb is qualitative, not a scale. */
const LOWEST = 58;
const CLIMB = 14;

// The model categories as a staircase: one step per click, each higher than the one before. The same picture comes
// back in the hardware chapter with the hardware and the budgets on the steps, so the audience only reads what is new.
export const StairsSlide: React.FC<StairsSlideProps> = ({ stairs, ...common }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout {...common} footerDelay={itemStart(stairs.length)}>
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
        {stairs.map((stair, index) => (
          <div
            key={stair.title}
            style={{
              flex: 1,
              height: `${LOWEST + index * CLIMB}%`,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              padding: '22px 24px',
              borderRadius: '16px 16px 0 0',
              backgroundColor: COLORS.surface,
              borderTop: `8px solid ${stair.highlight ? COLORS.accent : COLORS.border}`,
              ...fadeUp(frame, itemStart(index)),
            }}
          >
            <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.15, color: stair.highlight ? COLORS.accent : COLORS.foreground }}>
              {fr(stair.title)}
            </span>
            {stair.text && <span style={{ fontSize: 30, lineHeight: 1.25 }}>{fr(stair.text)}</span>}
            {stair.value && <span style={{ fontSize: 46, fontWeight: 800, lineHeight: 1.1, marginTop: 6 }}>{fr(stair.value)}</span>}
            {stair.caption && <span style={{ fontSize: 30, lineHeight: 1.25 }}>{fr(stair.caption)}</span>}
            {stair.detail && <span style={{ fontSize: 28, lineHeight: 1.25, color: COLORS.muted }}>{fr(stair.detail)}</span>}
            {stair.status.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'auto' }}>
                {stair.status.map((item) => (
                  <Badge key={item.label} kind={item.kind}>
                    {fr(item.label)}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </SlideLayout>
  );
};
