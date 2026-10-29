export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

type Palette = {
  background: string;
  foreground: string;
  accent: string;
  muted: string;
  surface: string;
  border: string;
  // Chart marks, validated against both backgrounds (dataviz palette check)
  chartBar: string;
  chartHighlight: string;
};

const LIGHT: Palette = {
  background: '#f8fafc',
  foreground: '#0f172a',
  accent: '#0369a1',
  muted: '#475569',
  surface: '#e2e8f0',
  border: '#cbd5e1',
  chartBar: '#0284c7',
  chartHighlight: '#d97706',
};

const DARK: Palette = {
  background: '#0f172a',
  foreground: '#f8fafc',
  accent: '#38bdf8',
  muted: '#94a3b8',
  surface: '#1e293b',
  border: '#334155',
  chartBar: '#0284c7',
  chartHighlight: '#d97706',
};

export type ThemeName = 'light' | 'dark';

const PALETTES: Record<ThemeName, Palette> = { light: LIGHT, dark: DARK };

const variableName = (key: string) => `--color-${key}`;

/**
 * Slide colors as CSS variables with the light palette as fallback: Remotion Studio and the PPTX render in light,
 * the web presenter switches theme by setting the variables on a parent element (see themeVariables).
 */
export const COLORS = Object.fromEntries(
  Object.entries(LIGHT).map(([key, value]) => [key, `var(${variableName(key)}, ${value})`]),
) as Palette;

/** CSS custom properties to set on a parent element to apply a theme to the slides below it. */
export const themeVariables = (theme: ThemeName): React.CSSProperties =>
  Object.fromEntries(Object.entries(PALETTES[theme]).map(([key, value]) => [variableName(key), value]));

export const FONT_FAMILY = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
