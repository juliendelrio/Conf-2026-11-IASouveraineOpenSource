export const VIDEO = {
  width: 1920,
  height: 1080,
  fps: 30,
} as const;

export const COLORS = {
  background: '#0f172a',
  foreground: '#f8fafc',
  accent: '#38bdf8',
  muted: '#94a3b8',
  surface: '#1e293b',
  border: '#334155',
  // Chart marks, validated against the background (dataviz palette check, dark mode)
  chartBar: '#0284c7',
  chartHighlight: '#d97706',
} as const;

export const FONT_FAMILY = 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
