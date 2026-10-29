import { Fragment } from 'react';
import { COLORS } from '../theme';
import { fr } from './typography';

/** Renders `**gras**` and `==accent==` inside a line of slide text, with French typography. */
export const inline = (text: string): React.ReactNode =>
  fr(text)
    .split(/(\*\*.+?\*\*|==.+?==)/)
    .map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
      if (part.startsWith('==') && part.endsWith('==')) {
        return (
          <span key={index} style={{ color: COLORS.accent }}>
            {part.slice(2, -2)}
          </span>
        );
      }
      return <Fragment key={index}>{part}</Fragment>;
    });

/** A line written entirely as `==…==` is an emphasized line (larger, accent color). */
export const emphasized = (text: string) => /^==((?:(?!==).)*)==$/.exec(text)?.[1];
