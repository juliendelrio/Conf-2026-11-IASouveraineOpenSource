import { COLORS } from '../theme';

/** Tested in our own setup (filled) or extrapolated from specs, docs and public prices (dashed outline). */
export type StatusKind = 'tested' | 'extrapolated';

export type Status = { kind: StatusKind; label: string };

type BadgeProps = {
  kind: StatusKind;
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
