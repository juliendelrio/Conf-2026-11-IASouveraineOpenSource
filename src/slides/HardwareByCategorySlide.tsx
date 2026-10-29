import { useCurrentFrame } from 'remotion';
import { fadeUp } from '../components/animation';
import { Badge } from '../components/Badge';
import { SlideLayout } from '../components/SlideLayout';
import { COLORS } from '../theme';

type Row = {
  category: string;
  hardware: string;
  inHouse: string;
  rental: string;
  status: { kind: 'tested' | 'extrapolated'; label: string }[];
};

const ROWS: Row[] = [
  {
    category: '1. Petits modèles',
    hardware: 'L4, RTX PRO 4500',
    inHouse: '< 100 k€',
    rental: '500 – 600 €',
    status: [{ kind: 'tested', label: 'L4 testée' }],
  },
  {
    category: '2. Milieu de gamme',
    hardware: '1 RTX PRO 6000, L40S, H100',
    inHouse: '< 100 k€',
    rental: '1 000 – 2 100 €',
    status: [{ kind: 'tested', label: 'Testé' }],
  },
  {
    category: "3. Le cap d'août",
    hardware: '2 RTX PRO 6000',
    inHouse: '50 – 70 k€',
    rental: '4 000 – 9 300 €',
    status: [
      { kind: 'tested', label: 'Interne testé' },
      { kind: 'extrapolated', label: 'Location extrapolée' },
    ],
  },
  {
    category: '4. Hors de portée',
    hardware: '8 H200 et plus',
    inHouse: '> 1 M€',
    rental: '30 700 – 43 800 €',
    status: [{ kind: 'extrapolated', label: 'Extrapolé' }],
  },
];

const COLUMNS = '1.3fr 1.5fr 0.9fr 1.1fr 1.4fr';
const cellStyle: React.CSSProperties = { padding: '28px 20px', fontSize: 32 };

// 3.6 — Hardware, in-house budget and rental cost for each model category
export const HardwareByCategorySlide: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SlideLayout kicker="Le matériel" title="Le matériel par catégorie de modèles">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: COLUMNS,
          fontSize: 26,
          fontWeight: 600,
          color: COLORS.muted,
          textTransform: 'uppercase',
          letterSpacing: 2,
          borderBottom: `2px solid ${COLORS.border}`,
          ...fadeUp(frame, 8),
        }}
      >
        <div style={{ padding: '0 20px 16px' }}>Catégorie</div>
        <div style={{ padding: '0 20px 16px' }}>Matériel</div>
        <div style={{ padding: '0 20px 16px' }}>Interne</div>
        <div style={{ padding: '0 20px 16px' }}>Location / mois</div>
        <div style={{ padding: '0 20px 16px' }} />
      </div>
      {ROWS.map((row, index) => (
        <div
          key={row.category}
          style={{
            display: 'grid',
            gridTemplateColumns: COLUMNS,
            alignItems: 'center',
            borderBottom: `1px solid ${COLORS.border}`,
            ...fadeUp(frame, 18 + index * 10),
          }}
        >
          <div style={{ ...cellStyle, fontWeight: 700 }}>{row.category}</div>
          <div style={cellStyle}>{row.hardware}</div>
          <div style={cellStyle}>{row.inHouse}</div>
          <div style={cellStyle}>{row.rental}</div>
          <div style={{ ...cellStyle, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {row.status.map((status) => (
              <Badge key={status.label} kind={status.kind}>
                {status.label}
              </Badge>
            ))}
          </div>
        </div>
      ))}
    </SlideLayout>
  );
};
