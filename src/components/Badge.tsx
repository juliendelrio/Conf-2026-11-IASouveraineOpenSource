import { COLORS } from '../theme';

type BadgeProps = {
  /** Tested in our own setup (filled) or extrapolated from specs and public prices (dashed outline). */
  kind: 'tested' | 'extrapolated';
  children: React.ReactNode;
};

/** Marks a figure as tested or extrapolated; the label text carries the meaning, not only the style. */
export const Badge: React.FC<BadgeProps> = ({ kind, children }) => (
  <span
    style={{
      display: 'inline-block',
      padding: '6px 18px',
      borderRadius: 999,
      fontSize: 26,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      ...(kind === 'tested'
        ? { backgroundColor: COLORS.accent, color: COLORS.background, border: `2px solid ${COLORS.accent}` }
        : { color: COLORS.muted, border: `2px dashed ${COLORS.muted}` }),
    }}
  >
    {children}
  </span>
);
