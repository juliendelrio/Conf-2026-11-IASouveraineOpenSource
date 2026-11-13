import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart, progress } from '../components/animation';
import type { Status } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

/** A machine: its memory as text and as a number (the bar), its price, and whether we tested it. */
export type Rung = { label: string; memory: string; amount: number; price: string; tested: boolean };

type ScaleSlideProps = {
  kicker: string;
  title: string;
  status: Status[];
  rungs: Rung[];
  /** The memory a full-width bar stands for; a bigger machine gets a full bar with a break mark. */
  scale: number;
  footer?: string;
};

// Memory against price: one bar per machine, as long as its memory. Filled when tested, dashed when it only comes from
// the catalogue (the header badges are the legend). The biggest machine does not fit the scale: its bar is broken.
export const ScaleSlide: React.FC<ScaleSlideProps> = ({ rungs, scale, ...common }) => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout {...common} footerDelay={itemStart(rungs.length)}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36, marginTop: 10 }}>
        {rungs.map((rung, index) => {
          const delay = itemStart(index);
          const grow = progress(frame, delay + 4, 18);
          const beyond = rung.amount > scale;
          const width = Math.min(rung.amount / scale, 1) * 100 * grow;
          return (
            <div key={rung.label} style={{ display: 'grid', gridTemplateColumns: '230px 210px 1fr 340px', alignItems: 'center', gap: 20, ...fadeUp(frame, delay) }}>
              <span style={{ fontSize: 38, fontWeight: 700 }}>{fr(rung.label)}</span>
              <span style={{ fontSize: 34, color: COLORS.muted }}>{fr(rung.memory)}</span>
              <div style={{ position: 'relative', height: 66 }}>
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: `${width}%`,
                    boxSizing: 'border-box',
                    borderRadius: '0 6px 6px 0',
                    ...(rung.tested
                      ? { backgroundColor: COLORS.chartBar }
                      : { backgroundColor: COLORS.surface, border: `3px dashed ${COLORS.muted}` }),
                  }}
                />
                {beyond && (
                  <span style={{ position: 'absolute', left: '82%', top: -2, fontSize: 50, fontWeight: 800, color: COLORS.muted, backgroundColor: COLORS.background, padding: '0 8px', opacity: grow }}>
                    //
                  </span>
                )}
              </div>
              <span style={{ fontSize: 38, fontWeight: 700, textAlign: 'right', whiteSpace: 'nowrap' }}>{fr(rung.price)}</span>
            </div>
          );
        })}
      </div>
    </SlideLayout>
  );
};
