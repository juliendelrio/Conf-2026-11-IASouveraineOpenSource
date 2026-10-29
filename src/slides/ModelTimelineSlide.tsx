import { useCurrentFrame } from 'remotion';
import { fadeUp, progress } from '../components/animation';
import { SlideLayout } from '../components/SlideLayout';
import { COLORS } from '../theme';

type Step = { when: string; what: string; where?: string; highlight?: boolean };

const STEPS: Step[] = [
  { when: 'Fin 2025', what: 'Premiers tests, dont Chocolatine' },
  { when: 'Février 2026', what: 'Qwen 3.5 : le 35B et le 27B', where: 'L40S louées' },
  { when: 'Avril 2026', what: 'Qwen 3.6 : chaque modèle progresse' },
  { when: 'Juin 2026', what: 'Qwen 3.6 en FP8', where: 'RTX PRO 6000' },
  { when: 'Août 2026', what: 'Qwen 3.8 et Flash‑Next : le cap', where: 'RTX PRO 6000', highlight: true },
];

const STEP_DELAY = 12;

// 2.5 — What we went through: timeline of the models we tested
export const ModelTimelineSlide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout kicker="Les modèles · testé" title="Ce qu'on a vécu">
      <div style={{ position: 'relative', marginTop: 120 }}>
        <div
          style={{
            position: 'absolute',
            top: 18,
            left: 0,
            height: 4,
            width: `${progress(frame, 10, STEPS.length * STEP_DELAY) * 100}%`,
            backgroundColor: COLORS.border,
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 32 }}>
          {STEPS.map((step, index) => (
            <div key={step.when} style={{ flex: 1, ...fadeUp(frame, 10 + index * STEP_DELAY) }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: step.highlight ? COLORS.accent : COLORS.surface,
                  border: `4px solid ${step.highlight ? COLORS.accent : COLORS.muted}`,
                }}
              />
              <div style={{ fontSize: 32, fontWeight: 700, marginTop: 32, color: step.highlight ? COLORS.accent : COLORS.foreground }}>
                {step.when}
              </div>
              <div style={{ fontSize: 30, lineHeight: 1.3, marginTop: 16 }}>{step.what}</div>
              {step.where && <div style={{ fontSize: 26, marginTop: 12, color: COLORS.muted }}>{step.where}</div>}
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontSize: 30, color: COLORS.muted, marginTop: 'auto', ...fadeUp(frame, 10 + STEPS.length * STEP_DELAY) }}>
        En parallèle{' '}: des modèles de transcription (STT)
      </p>
    </SlideLayout>
  );
};
