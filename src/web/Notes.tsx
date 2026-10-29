import { Fragment } from 'react';
import type { Note } from '../content/parse';

// Just enough Markdown for speaker notes: paragraphs, `- ` lists, **bold** and `code`
const renderInline = (text: string) =>
  text.split(/(\*\*.+?\*\*|`[^`]+`)/).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    return <Fragment key={index}>{part}</Fragment>;
  });

const NoteText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text
      .split(/\n\s*\n/)
      .filter((block) => block.trim() !== '')
      .map((block, index) => {
        const lines = block.split('\n').map((line) => line.trim());
        if (lines.every((line) => line.startsWith('- '))) {
          return (
            <ul key={index} style={{ margin: '0 0 8px', paddingLeft: 22 }}>
              {lines.map((line) => (
                <li key={line} style={{ marginBottom: 6 }}>
                  {renderInline(line.slice(2))}
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={index} style={{ margin: '0 0 8px' }}>
            {renderInline(lines.join(' '))}
          </p>
        );
      })}
  </>
);

/** The `#### …` notes of a slide; « À l'oral » first and larger, since it is what to say. */
export const Notes: React.FC<{ notes: Note[] }> = ({ notes }) => {
  if (notes.length === 0) return <p style={{ opacity: 0.6 }}>Pas de notes pour cette slide.</p>;
  const isOral = (note: Note) => note.title.startsWith("À l'oral");
  const ordered = [...notes.filter(isOral), ...notes.filter((note) => !isOral(note))];

  return (
    <>
      {ordered.map((note) => (
        <section key={note.title} style={{ marginBottom: 20, fontSize: isOral(note) ? 24 : 18, lineHeight: 1.45 }}>
          <h3 style={{ margin: '0 0 6px', fontSize: 13, letterSpacing: 2, textTransform: 'uppercase', color: '#93c5fd' }}>
            {note.title}
          </h3>
          <NoteText text={note.text} />
        </section>
      ))}
    </>
  );
};
