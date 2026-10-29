// Chapters 0 and 1: opening and glossary
import { CompareSlide, GlossarySlide, StepsSlide } from '../components/templates';

// 0.3 — The promise and the budget orders of magnitude
export const PromiseSlide: React.FC = () => (
  <CompareSlide
    kicker="La promesse"
    title="Une IA 100 % souveraine, dès maintenant"
    cards={[
      { title: 'En interne', value: '50 – 70 k€', caption: "d'investissement" },
      { title: 'En location', value: '2 – 5 k€ / mois', caption: 'chez OVH ou Scaleway' },
    ]}
    footer="Pas le très haut de gamme, mais on fait déjà des choses très bien : c'est le sujet du talk"
  />
);

// 0.4 — The common thread: the order in which to ask the questions
export const ThreadSlide: React.FC = () => (
  <StepsSlide
    kicker="Le fil rouge"
    title="Dans l'ordre où il faut se poser les questions"
    steps={[
      { label: 'Les modèles', text: 'La finalité : ce qu’on veut faire tourner', highlight: true },
      { label: 'Le matériel', text: 'Ce que le budget permet' },
      { label: 'Les moteurs', text: 'Comment faire tourner les modèles' },
      { label: 'La plateforme', text: 'Comment les partager' },
      { label: 'Les usages', text: 'Ce que les gens en font' },
    ]}
    footer="Pour chaque étape : ce qu'on voulait faire, le piège, ce qu'on en retient"
  />
);

// 1.1 — Glossary, part 1
export const GlossaryOneSlide: React.FC = () => (
  <GlossarySlide
    kicker="Petit lexique"
    title="Les mots pour suivre (1/2)"
    terms={[
      { term: 'Inférence', definition: "Utiliser un modèle déjà entraîné, par opposition à l'entraînement" },
      { term: 'Paramètres, poids', definition: "Ce qu'un modèle « sait », sous forme de nombres : sa taille (27B, 125B…)" },
      { term: 'Open weights', definition: 'On récupère les poids, pas forcément les données ni le code : ce n’est pas de l’open source' },
      { term: 'Quantization', definition: 'Compresser les poids (16, 8, 4 bits) pour tenir en mémoire, au prix d’un peu de qualité' },
      { term: 'Token', definition: 'Le morceau de texte que le modèle lit et produit : l’unité des vitesses et des prix' },
    ]}
  />
);

// 1.2 — Glossary, part 2
export const GlossaryTwoSlide: React.FC = () => (
  <GlossarySlide
    kicker="Petit lexique"
    title="Les mots pour suivre (2/2)"
    terms={[
      { term: 'VRAM', definition: 'La mémoire de la carte graphique : la vraie ressource rare' },
      { term: 'Contexte, KV cache', definition: 'Plus la conversation est longue, plus elle consomme de mémoire' },
      { term: 'MoE', definition: 'Mixture of Experts : un gros modèle dont seule une partie travaille à chaque token' },
      { term: 'Agentique', definition: 'Un modèle qui enchaîne des actions (lire, exécuter, corriger) au lieu de répondre une fois' },
      { term: 'Harness', definition: 'L’application autour du modèle : ses outils, ses skills, ses prompts système' },
    ]}
  />
);
