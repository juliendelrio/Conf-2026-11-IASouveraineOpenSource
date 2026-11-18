// An edition is the same talk given elsewhere: a file in docs/contenu/editions/ that holds only what changes.
// A slide whose id exists in the deck overrides it, field by field, or removes it with `retirer : oui`; a new one
// says where it goes with `après : id`.
import { ContentError, type SlideContent } from './parse';

export const applyEdition = (base: SlideContent[], edition: SlideContent[]): SlideContent[] => {
  const slides = [...base];
  for (const change of edition) {
    const index = slides.findIndex((slide) => slide.id === change.id);
    const remove = change.fields.retirer?.trim().toLowerCase() === 'oui';
    if (remove && index === -1) throw new ContentError(`${change.file} › ${change.id} : « retirer : oui » sur une slide qui n'existe pas`);
    if (remove) {
      slides.splice(index, 1);
      continue;
    }
    if (index !== -1) {
      const slide = slides[index];
      const noteTitles = new Set(change.notes.map((note) => note.title));
      slides[index] = {
        ...slide,
        fields: { ...slide.fields, ...change.fields },
        items: change.items.length > 0 ? change.items : slide.items,
        sections: change.sections.length > 0 ? change.sections : slide.sections,
        table: change.table ?? slide.table,
        notes: [...slide.notes.filter((note) => !noteTitles.has(note.title)), ...change.notes],
      };
      continue;
    }
    const after = change.fields['après'];
    if (!after) throw new ContentError(`${change.file} › ${change.id} : nouvelle slide sans « après : identifiant » pour la placer`);
    const anchor = slides.findIndex((slide) => slide.id === after);
    if (anchor === -1) throw new ContentError(`${change.file} › ${change.id} : « après : ${after} » ne désigne aucune slide`);
    // The new slide joins the chapter of the slide it follows, whose duration it shares
    slides.splice(anchor + 1, 0, { ...change, file: slides[anchor].file });
  }
  return slides;
};
