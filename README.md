# Une plateforme IA à la demande, 100 % open source : du GPU local au cloud souverain

Slides de la conférence de Julien Del Rio au [Capitole du Libre 2026](https://capitoledulibre.org/programme/talk/LSBRQY/) — samedi 14 novembre 2026, 15h00, salle A202.

- **En ligne** : https://juliendelrio.github.io/Conf-2026-11-IASouveraineOpenSource/
- **Hors ligne** : `out/slides.pptx`, généré via `npm run pptx`

## Stack

Slides animées en React avec [Remotion](https://www.remotion.dev/), présentées dans le navigateur via `@remotion/player` (Vite), déployées sur GitHub Pages. Une version PPTX de secours est générée à partir d'une image par slide.

## Utilisation

```bash
npm install
npm run dev      # présentation dans le navigateur
npm run studio   # Remotion Studio pour concevoir les slides
npm run build    # build de production (dist/)
npm run pptx     # PPTX hors ligne (out/slides.pptx)
```

Navigation : `→` / `Espace` / `PageDown` pour avancer, `←` / `PageUp` pour reculer, `Début` / `Fin`, `f` pour le plein écran.

## Licence

Voir [LICENSE](LICENSE).
