// Chapter 4: the inference engines
import { CompareSlide, KeyFigureSlide, StepsSlide, TrioSlide } from '../components/templates';

const KICKER = 'Les moteurs';

// 4.1 — Our engines
export const OurEnginesSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER}
    title="Nos moteurs d'inférence"
    cards={[
      {
        title: 'vLLM',
        highlight: true,
        status: [{ kind: 'tested', label: 'Testé' }],
        items: ['Notre moteur principal'],
      },
      {
        title: 'SGLang',
        status: [{ kind: 'tested', label: 'Testé' }],
        items: ['Ponctuellement : certains modèles y sont mieux servis'],
      },
      {
        title: 'MLX',
        status: [{ kind: 'extrapolated', label: 'Extrapolé' }],
        items: ['Sur Mac, un moteur dédié'],
      },
    ]}
    footer="Le modèle et le matériel orientent le choix du moteur"
  />
);

// 4.2 — A fast-moving landscape
export const EngineCycleSlide: React.FC = () => (
  <StepsSlide
    kicker={KICKER}
    title="Un paysage qui bouge vite"
    steps={[
      { label: 'Une optimisation apparaît', text: 'Souvent sous la forme d’un nouveau moteur' },
      { label: 'Les moteurs leaders l’intègrent', text: 'Rapidement', highlight: true },
    ]}
    footer="D'autres moteurs à suivre : llama.cpp, Ollama, TensorRT-LLM, MLX…"
  />
);

// 4.3 — Keeping watch pays off
export const EngineWatchSlide: React.FC = () => (
  <KeyFigureSlide
    kicker={KICKER}
    title="La veille paie"
    status={[{ kind: 'tested', label: 'Mesuré' }]}
    figure="+11 %"
    caption="de vitesse de génération sur Qwen3.8-Flash-Next (180 → 200 tok/s), juste en passant à vLLM 0.30.0"
    footer="Même matériel, même modèle : seule la version du moteur a changé"
  />
);

// 4.4 — Goal, pitfall, lesson
export const EnginesTrioSlide: React.FC = () => (
  <TrioSlide
    kicker={KICKER}
    goal="Tout simplement tester les modèles"
    pitfall="L'inférence, c'est très technique : se plonger dans la documentation devient utile pour tirer le meilleur de nos cartes"
    lesson="Faire de la veille : une mise à jour peut rapporter autant qu'un changement de matériel"
  />
);
