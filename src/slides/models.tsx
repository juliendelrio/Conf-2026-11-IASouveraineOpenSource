// Chapter 2: the models
import { BulletsSlide, CompareSlide, StepsSlide, TableSlide, TrioSlide } from '../components/templates';

const KICKER = 'Les modèles';

// 2.1 — Why start with the models
export const ModelsWhySlide: React.FC = () => (
  <StepsSlide
    kicker={KICKER}
    title="Commencer par la finalité"
    steps={[
      { label: 'Fixer un budget', text: 'Interne ou location' },
      { label: 'Choisir une catégorie de modèles', text: 'Ce que ce budget permet de faire tourner', highlight: true },
      { label: 'En déduire le matériel', text: 'Le chapitre suivant' },
    ]}
    footer="Avant de parler cartes et serveurs, savoir ce qu'on veut faire tourner"
  />
);

// 2.2 — August 2026, the milestone
export const AugustSlide: React.FC = () => (
  <BulletsSlide
    kicker={KICKER}
    title="Août 2026, le cap franchi"
    status={[
      { kind: 'tested', label: 'Testé' },
      { kind: 'extrapolated', label: 'Niveau Opus : selon les éditeurs' },
    ]}
    items={[
      'DeepSeek-V4-Flash-0731 (31 juillet) et Qwen3.8-Flash-Next (24 août)',
      'Sur 2 cartes, autour de Claude Opus 4.6 à 4.8',
      'Les premiers modèles vraiment utilisables en entreprise, codage compris',
      'Et les outils arrivent en même temps : DeepSeek Harness',
    ]}
    footer="Plus besoin d'un cluster de H200 pour des tâches générales"
  />
);

// 2.3 — Four categories to help decide
export const CategoriesSlide: React.FC = () => (
  <TableSlide
    kicker={KICKER}
    title="Quatre catégories pour décider"
    columns={['Catégorie', 'Pour quoi faire', 'Modèles', 'Chez nous']}
    widths="1.1fr 1.4fr 2fr 1.1fr"
    fontSize={28}
    highlightRow={2}
    rows={[
      [
        '1. Petits modèles',
        'RAG, transcription, résumé, traduction',
        'Qwen3.6-35B, Qwen3.5-9B, Gemma 4, gpt-oss-20b, Mistral Small 3.2',
        { status: [{ kind: 'tested', label: 'En partie' }] },
      ],
      ['2. Milieu de gamme', 'Un généraliste sur une seule carte', 'Qwen3.8-27B', { status: [{ kind: 'tested', label: 'Testé' }] }],
      [
        "3. Le cap d'août",
        'Tâches générales, codage compris',
        'Qwen3.8-Flash-Next, DeepSeek-V4-Flash-0731',
        { status: [{ kind: 'tested', label: 'Testé' }] },
      ],
      [
        '4. Hors de portée',
        'Les plus gros modèles open weights',
        'DeepSeek V4-Pro, Kimi K2.6, GLM-5.x, Mistral Large 4, Qwen3.8-2.4T, MiniMax M3…',
        { status: [{ kind: 'extrapolated', label: 'Non testé' }] },
      ],
    ]}
    footer="Catégorie 4 : plus d'un million d'euros. Les trois autres : moins de 100 k€ en interne, et une location accessible à une PME"
  />
);

// 2.4 — Out of reach, but not out of France
export const OutOfReachSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER}
    title="Hors de portée, mais pas hors de France"
    status={[{ kind: 'extrapolated', label: 'Tailles Hugging Face, catalogues publics' }]}
    cards={[
      {
        title: 'Catégorie 4',
        value: '444 Go – 2,5 To',
        items: ['de poids, avant même le KV cache', 'soit 2,3 à 13 fois nos 192 Go'],
      },
      {
        title: 'Le palier 2 : des hébergeurs français',
        highlight: true,
        items: ['Scaleway : par API (GLM, DeepSeek, Qwen)', 'OVHcloud : en louant les GPU', 'Mistral AI : par API (GLM-5.3)'],
      },
    ]}
  />
);

// 2.6 — Code, version by version
export const CodeVersionsSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER}
    title="Le code, version par version"
    status={[{ kind: 'tested', label: 'Testé' }]}
    cards={[
      {
        title: 'Qwen3.6-27B',
        items: ['Le premier à commencer à coder', 'Mais boucle et plante', 'Utile pour des actions ponctuelles'],
      },
      {
        title: 'Août : Qwen3.8-27B et Flash-Next',
        highlight: true,
        items: ['Enfin du vrai code', 'Le Flash-Next est autonome, comme Opus 4.6 / 4.7 quelques mois plus tôt'],
      },
    ]}
    footer="Capacité estimée (tests de charge pas complètement poussés) : 5 à 10 développeurs sur Flash-Next, 30 à 50 utilisateurs de chat sur le 27B"
  />
);

// 2.7 — The two August models side by side
export const AugustModelsSlide: React.FC = () => (
  <TableSlide
    kicker={KICKER}
    title="Les deux modèles d'août"
    status={[
      { kind: 'tested', label: 'Testés' },
      { kind: 'extrapolated', label: 'Chiffres des fiches' },
    ]}
    columns={['', 'DeepSeek-V4-Flash-0731', 'Qwen3.8-Flash-Next']}
    widths="1fr 1.4fr 1.4fr"
    fontSize={34}
    rows={[
      ['Sortie', '31 juillet 2026', '24 août 2026'],
      ['Taille', 'MoE 284B, 13B actifs', 'MoE 125B, 6B actifs'],
      ['Poids', '~167 Go', '~186 Go (FP8)'],
      ['Licence', 'MIT', 'Licence maison « Qwen Community 1.0 »'],
      ['Lit les images', 'Non, texte seul', 'Oui, multimodal'],
    ]}
    footer="Les deux tiennent tout juste dans nos 192 Go"
  />
);

// 2.8 — Open weights is not open source
export const LicenseSlide: React.FC = () => (
  <BulletsSlide
    kicker={KICKER}
    title="Open weights ≠ open source"
    items={[
      'Qwen était sous Apache 2.0 : 3.5, 3.6, et encore le 3.8-27B',
      'Flash-Next passe à une licence maison, « Qwen Community 1.0 »',
      'Usage interne libre, tant que rien n’est mis à disposition de tiers',
      'Licence séparée pour du Model as a Service ou un assistant de code, quelle que soit la taille',
      'Et Qwen 4, attendu dans quelques semaines ?',
    ]}
    footer="On lit la licence avant de choisir un modèle, comme pour toute dépendance (ce n'est pas un avis juridique)"
  />
);

// 2.9 — Goal, pitfall, lesson
export const ModelsTrioSlide: React.FC = () => (
  <TrioSlide
    kicker={KICKER}
    goal="Un modèle assez bon pour un usage quotidien, code compris, sur notre propre matériel"
    pitfall="Le rythme des sorties : déployer pour les utilisateurs tout en testant les nouveaux, c'est exigeant et chronophage"
    lesson="Un saut de version tous les 3 mois : l'obsolescence des GPU est compensée par les progrès des modèles"
  />
);
