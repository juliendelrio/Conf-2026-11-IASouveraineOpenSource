// Chapter 3: the hardware (ceilings, MoE and category table live in their own files)
import { CompareSlide, TableSlide, TrioSlide } from '../components/templates';

const KICKER = 'Le matériel';

// 3.1 — Rent before buying
export const RentFirstSlide: React.FC = () => (
  <TableSlide
    kicker={KICKER}
    title="Louer avant d'acheter"
    columns={['Machine', 'Mémoire', 'Prix par mois', '']}
    widths="1.2fr 1fr 1.4fr 1.2fr"
    fontSize={36}
    rows={[
      ['1 × L4', '24 Go', '500 – 600 €', { status: [{ kind: 'tested', label: 'Testé' }] }],
      ['1 × L40S', '48 Go', '1 000 – 1 100 €', { status: [{ kind: 'tested', label: 'Testé' }] }],
      ['1 × H100', '80 Go', '1 900 – 2 100 €', { status: [{ kind: 'extrapolated', label: 'Catalogue' }] }],
      ['4 × L40S', '192 Go', '4 000 – 4 300 €', { status: [{ kind: 'extrapolated', label: 'Catalogue' }] }],
      ['8 × H200', '8 × 141 Go', '~30 700 €', { status: [{ kind: 'extrapolated', label: 'Catalogue' }] }],
    ]}
    footer="Tarifs publics OVH et Scaleway, hors taxes, octobre 2026 : de quoi tester toute la stack sans immobiliser de budget"
  />
);

// 3.2 — Five questions before buying
export const FiveQuestionsSlide: React.FC = () => (
  <TableSlide
    kicker={KICKER}
    title="5 questions avant d'acheter"
    columns={['La question', 'Ce qui joue']}
    widths="1fr 1.3fr"
    fontSize={36}
    rows={[
      ['Est-ce que ça tourne ?', 'Les pilotes et l’écosystème : CUDA, ROCm, Metal'],
      ['Est-ce que ça tient ?', 'La VRAM : le modèle et le KV cache'],
      ['Est-ce que ça écrit vite ?', 'La bande passante mémoire'],
      ['Est-ce que ça lit vite ?', 'La puissance de calcul : lire un long prompt'],
      ['Les cartes se parlent-elles bien ?', 'NVLink, PCIe ou réseau : répartir un modèle'],
    ]}
  />
);

// 3.7 — Two ways to host in-house
export const TwoApproachesSlide: React.FC = () => (
  <CompareSlide
    kicker={KICKER}
    title="Deux approches pour héberger en interne"
    cards={[
      {
        title: 'Salle serveur',
        items: [
          'Non industrialisée',
          'Mac Studio, DGX Spark, cartes non Server Edition',
          'Pour l’interne et les labs',
          'Attention à l’électricité et à la chaleur',
        ],
      },
      {
        title: 'Datacenter',
        highlight: true,
        items: [
          'Une vraie industrialisation',
          'Cartes Server Edition et datacenter',
          'Obligatoire pour une offre aux clients',
          'Coût et délai de mise en place',
        ],
      },
    ]}
    footer="Certaines cartes rentrent dans un serveur classique : L4, RTX PRO 4500 Server Edition"
  />
);

// 3.8 — Goal, pitfall, lesson
export const HardwareTrioSlide: React.FC = () => (
  <TrioSlide
    kicker={KICKER}
    goal="Des preuves de faisabilité à moindre coût, pour convaincre d'investir plus"
    pitfall="Obtenir de petits volumes de cartes est compliqué : un fournisseur nous a aidés avec son offre « try and buy »"
    lesson="Passer par la location permet d'y aller petit à petit"
  />
);
