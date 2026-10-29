// Chapter 5: the LLM platform
import { BulletsSlide, CompareSlide, StepsSlide, TrioSlide } from '../components/templates';

const KICKER = 'La plateforme';

// 5.1 — The path in three steps
export const PlatformPathSlide: React.FC = () => (
  <StepsSlide
    kicker={KICKER}
    title="Le chemin en trois étapes"
    status={[{ kind: 'tested', label: 'Testé' }]}
    steps={[
      { label: 'Le moteur en direct', text: 'Vite limité pour diversifier les usages' },
      { label: 'Une passerelle maison', text: 'Devant chaque moteur : autant de points d’accès' },
      { label: 'LiteLLM', text: 'Une passerelle centralisée, open source', highlight: true },
    ]}
    footer="LiteLLM, c'est l'industrialisation de ce qu'on avait commencé avec la passerelle maison"
  />
);

// 5.2 — The core: tokens
export const TokensSlide: React.FC = () => (
  <BulletsSlide
    kicker={KICKER}
    title="Le cœur : les jetons et leur suivi"
    status={[{ kind: 'tested', label: 'Testé' }]}
    items={[
      'Des droits fins sur les modèles : par équipe, par utilisateur, par clé d’API',
      'Un suivi natif de la consommation',
      'OpenTelemetry pour aller plus loin dans les métriques',
      'Autour : une centaine de types d’API en entrée, une quarantaine de formats en sortie',
    ]}
  />
);

// 5.3 — Community or enterprise
export const EditionsSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER}
    title="Communautaire ou entreprise ?"
    cards={[
      {
        title: 'Communautaire',
        highlight: true,
        status: [{ kind: 'tested', label: 'Testé' }],
        items: ['Très permissive', 'Suffit largement en interne'],
      },
      {
        title: 'Entreprise',
        status: [{ kind: 'extrapolated', label: 'D’après la doc' }],
        items: ['Organisations', 'Monitoring plus fin', 'Refacturation', 'SSO'],
      },
    ]}
    footer="Comme pour l'hébergement et les licences : une offre aux clients change les exigences"
  />
);

// 5.4 — Tiers become a governance question
export const TiersSlide: React.FC = () => (
  <StepsSlide
    kicker={KICKER}
    title="Les paliers, une question de gouvernance"
    status={[{ kind: 'tested', label: 'Testé' }]}
    steps={[
      { label: 'Palier 1 : en interne', text: 'Nos modèles, sur nos cartes', highlight: true },
      { label: 'Palier 2 : en France', text: 'Les gros modèles chez des hébergeurs français' },
      { label: 'Palier 3 : clouds US', text: 'Seulement quand il le faut' },
    ]}
    footer="Une fois la passerelle en place, tout est possible : qui accède à quel modèle, quand on bascule, avec quelles données"
  />
);

// 5.5 — Goal, pitfall, lesson
export const PlatformTrioSlide: React.FC = () => (
  <TrioSlide
    kicker={KICKER}
    goal="Délivrer les modèles sur un point unique, avec une gestion fine des droits et un bon suivi"
    pitfall="Partir en direct sur les moteurs, ou sur une passerelle maison"
    lesson="Avec une passerelle centralisée, le routage par paliers n'est plus technique : c'est de la gouvernance"
  />
);
