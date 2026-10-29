// Chapter 6: the usages (general chat, developers, custom integrations)
import { BulletsSlide, CompareSlide, StepsSlide, TableSlide, TrioSlide } from '../components/templates';

const KICKER = 'Les usages';
const KICKER_CHAT = 'Usages · le chat';
const KICKER_DEV = 'Usages · les développeurs';
const KICKER_INTEGRATIONS = 'Usages · les intégrations';

// 6.1 — Three kinds of usage
export const UsageTypesSlide: React.FC = () => (
  <TableSlide
    kicker={KICKER}
    title="Trois types d'usages"
    status={[{ kind: 'tested', label: 'Tout est testé' }]}
    columns={['Type', 'Pour qui', 'Par quoi']}
    widths="1fr 1.2fr 1.8fr"
    fontSize={34}
    rows={[
      ['Généraliste', 'Tous les utilisateurs', 'Un outil de chat : LibreChat'],
      ['Développeurs', 'Les équipes de développement', 'Des agents de code : OpenCode, DeepSeek Harness'],
      ['Intégrations', 'Les applications', 'Le modèle dans un outil existant, par API'],
    ]}
    footer="Dès le 27B et le Flash-Next, ça devient intéressant. Les développeurs sont les plus exigeants ; le chat et les intégrations impressionnent déjà"
  />
);

// 6a.1 — An internal ChatGPT
export const InternalChatSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER_CHAT}
    title="Un ChatGPT interne"
    cards={[
      {
        title: 'Open WebUI',
        items: ['Le candidat naturel', 'La main sur énormément de paramètres', 'Trop complexe pour des utilisateurs standards', 'Gardé pour l’équipe IA'],
      },
      {
        title: 'LibreChat',
        highlight: true,
        items: ['Ergonomique', 'Pensé pour les utilisateurs standards'],
      },
    ]}
  />
);

// 6a.2 — Goal, pitfall, lesson
export const ChatTrioSlide: React.FC = () => (
  <TrioSlide
    kicker={KICKER_CHAT}
    goal="Proposer un ChatGPT interne"
    pitfall="Partir sur le candidat naturel, Open WebUI, trop complexe pour des utilisateurs standards"
    lesson="Pour les utilisateurs finaux, il faut faire simple et ergonomique"
  />
);

// 6b.1 — Two levers
export const DevLeversSlide: React.FC = () => (
  <StepsSlide
    kicker={KICKER_DEV}
    title="Deux leviers, un palier net"
    steps={[
      { label: 'Avant août', text: 'La capacité minimale des modèles coinçait' },
      { label: 'DeepSeek-V4-Flash-0731', text: 'Le premier levier' },
      { label: 'Qwen3.8-Flash-Next', text: 'Le second levier', highlight: true },
    ]}
  />
);

// 6b.2 — The harness, a real lever
export const HarnessSlide: React.FC = () => (
  <BulletsSlide
    kicker={KICKER_DEV}
    title="Le harness, un vrai levier"
    items={[
      'Le harness, c’est l’application autour du modèle : outils, skills, prompts système',
      'C’est souvent lui qui pousse le modèle dans ses retranchements',
      'Quand on ne compte plus au jeton, il peut faire plus d’itérations pour arriver au résultat',
      'Ça consomme un peu plus d’électricité, mais c’est négligeable sur l’ensemble',
    ]}
  />
);

// 6b.3 — Two open source harnesses
export const TwoHarnessesSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER_DEV}
    title="Deux harness open source"
    cards={[
      {
        title: 'OpenCode',
        items: ['Licence MIT', 'Gère encore mal l’arrivée en limite de contexte'],
      },
      {
        title: 'DeepSeek Harness',
        items: ['Licence MIT, août 2026', 'Approche web only, système jeune', 'Mais des promesses très belles'],
      },
    ]}
    footer="En proposer deux permet de s'adapter aux limites de chacun"
  />
);

// 6b.4 — Vision
export const VisionSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER_DEV}
    title="Et les images ?"
    cards={[
      {
        title: 'Avant : deux modèles',
        items: ['DeepSeek-V4-Flash ne lit que du texte', 'Qwen3.8-27B décrivait les captures à sa place'],
      },
      {
        title: 'Depuis Flash-Next',
        highlight: true,
        items: ['Un vrai modèle multimodal', 'Il lit lui-même captures et maquettes', 'La qualité a progressé en développement'],
      },
    ]}
  />
);

// 6b.5 — Goal, pitfall, lesson
export const DevTrioSlide: React.FC = () => (
  <TrioSlide
    kicker={KICKER_DEV}
    goal="Un agent de code assez bon pour que le gain soit significatif"
    pitfall="La capacité des modèles : on garde Claude pour les profils architecte et lead"
    lesson="Le harness est un levier aussi important que le modèle ; en proposer deux contourne les limites de chacun"
  />
);

// 6c.1 — Three integrations, three maturity levels
export const IntegrationsSlide: React.FC = () => (
  <TableSlide
    kicker={KICKER_INTEGRATIONS}
    title="Trois intégrations, trois maturités"
    columns={['Intégration', 'Maturité']}
    widths="1fr 1.5fr"
    fontSize={34}
    rows={[
      ['Assistant de compte rendu de réunions (transcription)', 'Utilisé tous les jours, même avant la v1'],
      ['RAG dans la gestion documentaire', 'En test : pas magique, il faut aussi retravailler la documentation'],
      ['Modèle « System One » pour trier les tickets', 'Preuve de concept'],
    ]}
    footer="Surtout des modèles de catégorie 1, qui tiennent sur une L4 dans un serveur classique"
  />
);

// 6c.2 — Goal, pitfall, lesson
export const IntegrationsTrioSlide: React.FC = () => (
  <TrioSlide
    kicker={KICKER_INTEGRATIONS}
    goal="Des outils pour augmenter la productivité : d'où l'assistant de réunion en premier"
    pitfall="Penser que l'IA est magique : en souverain, ça demande de la veille et de l'adaptation"
    lesson="Malgré tout, on peut faire des choses impressionnantes en souverain"
  />
);
