import { StepsSlide } from '../components/templates';

// 2.5 — What we went through: timeline of the models we tested
export const ModelTimelineSlide: React.FC = () => (
  <StepsSlide
    kicker="Les modèles"
    title="Ce qu'on a vécu"
    status={[{ kind: 'tested', label: 'Testé' }]}
    numbered={false}
    steps={[
      { label: 'Fin 2025', text: 'Premiers tests, dont Chocolatine (affiné pour le français)' },
      { label: 'Février 2026', text: 'Qwen 3.5 : le 35B et le 27B', sub: 'L40S louées' },
      { label: 'Avril 2026', text: 'Qwen 3.6 : chaque modèle progresse' },
      { label: 'Juin 2026', text: 'Qwen 3.6 en FP8', sub: 'RTX PRO 6000' },
      { label: 'Août 2026', text: 'Qwen 3.8 et Flash-Next : le cap', sub: 'RTX PRO 6000', highlight: true },
    ]}
    footer="En parallèle : des modèles de transcription (STT), avec ou sans identification des locuteurs"
  />
);
