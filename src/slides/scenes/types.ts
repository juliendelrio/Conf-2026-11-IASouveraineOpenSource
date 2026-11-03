/** A labelled element of a scene, from a `### Titre` section with its `texte` and `détail`. */
export type SceneSection = { title: string; text?: string; detail?: string };

export type SceneProps = {
  sections: SceneSection[];
  /** Start frame of each beat (one per caption, one per click). */
  starts: number[];
};
