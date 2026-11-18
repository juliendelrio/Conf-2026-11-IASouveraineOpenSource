// An edition is the same talk given elsewhere: a file in docs/contenu/editions/ that holds only what changes.
// A slide whose id exists in the deck overrides it, field by field; a new one says where it goes with `après : id`.
import { ContentError, type SlideContent } from './parse';

export const applyEdition = (base: SlideContent[], edition: SlideContent[]): SlideContent[] => {
  const slides = [...base];
  for (const change of edition) {
    const index = slides.findIndex((slide) => slide.id === change.id);
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
