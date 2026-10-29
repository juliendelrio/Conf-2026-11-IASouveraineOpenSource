// Chapter 7: conclusion
import { useCurrentFrame } from 'remotion';
import { fadeUp, itemStart } from '../components/animation';
import { SlideLayout } from '../components/SlideLayout';
import { StatementSlide, TableSlide } from '../components/templates';
import { fr } from '../components/typography';
import { COLORS } from '../theme';

const KICKER = 'Conclusion';

// 7.1 — What to remember: one lesson per chapter
export const LessonsSlide: React.FC = () => (
  <TableSlide
    kicker={KICKER}
    title="Ce qu'on retient"
    columns={['Chapitre', 'La leçon']}
    widths="0.9fr 3fr"
    fontSize={30}
    rows={[
      ['Modèles', "Un saut tous les 3 mois : l'obsolescence des GPU est compensée par les modèles"],
      ['Matériel', "La location permet d'y aller petit à petit"],
      ['Moteurs', 'Faire de la veille : une mise à jour vaut parfois un changement de matériel'],
      ['Plateforme', 'Avec une passerelle centralisée, les paliers deviennent de la gouvernance'],
      ['Chat', 'Pour les utilisateurs finaux, simple et ergonomique'],
      ['Développeurs', 'Le harness compte autant que le modèle'],
      ['Intégrations', 'On fait déjà des choses impressionnantes en souverain'],
    ]}
  />
);

// 7.2 — Back to the confession
export const ConfessionCallbackSlide: React.FC = () => (
  <StatementSlide
    kicker="Retour à l'aveu"
    lines={[
      { text: 'Claude, c’est notre palier 3 :' },
      { text: 'utilisé là où il apporte le plus, aujourd’hui pour les profils architecte et lead.' },
      { text: 'Se faire aider par Claude pour construire son IA souveraine n’a rien de contradictoire.', emphasis: true },
    ]}
  />
);

// 7.3 — The final message
export const FinalMessageSlide: React.FC = () => (
  <StatementSlide
    lines={[
      { text: 'La preuve est là : c’est possible.', emphasis: true },
      { text: 'Les modèles déjà disponibles permettent de faire des choses incroyables…' },
      { text: '… même si demain les Américains et les Chinois arrêtent de partager.' },
    ]}
  />
);

const LINKS = [
  { label: 'Les slides', url: 'juliendelrio.github.io/Conf-2026-11-IASouveraineOpenSource' },
  { label: 'Site', url: 'juliendelrio.fr' },
  { label: 'LinkedIn', url: 'linkedin.com/in/juliendelrio' },
  { label: 'X', url: 'x.com/juliendelrio' },
];

// 7.4 — Thanks and questions
export const ThanksSlide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout kicker={KICKER} title="Merci ! Des questions ?">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 30, marginTop: 20 }}>
        {LINKS.map((link, index) => (
          <div key={link.label} style={{ display: 'grid', gridTemplateColumns: '300px 1fr', fontSize: 40, ...fadeUp(frame, 10 + index * 8) }}>
            <span style={{ color: COLORS.muted }}>{fr(link.label)}</span>
            <span style={{ fontWeight: 600, color: COLORS.accent }}>{link.url}</span>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 36, marginTop: 'auto', ...fadeUp(frame, itemStart(2)) }}>Julien Del Rio · Capitole du Libre 2026</p>
    </SlideLayout>
  );
};
