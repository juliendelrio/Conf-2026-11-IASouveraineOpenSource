/**
 * French typography for slide text: non-breaking space before « : ; ? ! » and inside guillemets,
 * and non-breaking hyphens inside names (Flash-Next, V4-Flash…) so they never split across lines.
 */
export const fr = (text: string) =>
  text
    .replace(/ ([:;?!»])/g, ' $1')
    .replace(/« /g, '« ')
    .replace(/(\w)-(\w)/g, '$1‑$2');
