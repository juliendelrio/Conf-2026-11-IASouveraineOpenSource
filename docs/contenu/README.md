# Contenu des slides

Les slides sont écrites ici, en Markdown. Le code (`src/`) ne contient plus de texte : il lit ces fichiers et applique la mise en page. Modifier un fichier suffit pour changer les slides, le présentateur web et le PPTX.

## Les fichiers

| Fichier | Contenu |
|---|---|
| `00-ouverture.md` | Titre, aveu, promesse, fil rouge |
| `01-lexique.md` | Les deux slides de lexique (choix et ordre des termes) |
| `02-modeles.md` … `07-conclusion.md` | Un fichier par chapitre |
| `lexique.md` | Toutes les définitions : celles des slides, celles à dire à l'oral, la réserve pour les questions |

L'ordre du deck est celui des fichiers (`00` à `07`), puis celui des slides dans chaque fichier. Pour déplacer une slide, on déplace sa section ; pour en ajouter une, on ajoute une section `## identifiant`. Ajouter un fichier demande une ligne dans `src/content/index.ts`.

## Pendant la présentation

- Chaque clic (flèche droite, Espace, Entrée, Page suivante, télécommande ou clic de souris) fait apparaître l'élément suivant ; quand tout est affiché, le clic suivant passe à la slide suivante. La flèche gauche retire le dernier élément affiché, ou revient à la slide précédente complète. Le PPTX et Remotion Studio montrent toujours la slide complète
- `f` : plein écran ; `d` : thème clair ou sombre (aussi un bouton sur la première slide) ; l'adresse `#n` ouvre la slide n
- Toutes les slides sauf la première affichent « n / total » en bas à droite, y compris dans le PPTX
- Badges : **testé** (plein) = vécu sur notre infrastructure ; **extrapolé** (pointillés) = calculé à partir des fiches constructeurs, de la documentation ou des prix publics
- Notes de chaque slide : sous `#### Progression`, `#### À l'oral` et `#### Compléments` (chiffres, sources et détails pour les questions, la plupart venant de l'annexe du storyline)

## Vérifier après une modification

```sh
npm run check   # vérifie le contenu et liste les slides avec leurs clics
npm run dev     # présentateur dans le navigateur, mis à jour à chaque sauvegarde
npm run pptx    # PPTX de secours, avec les images dans out/stills/
```

Une erreur indique le fichier, la slide et ce qui ne va pas, par exemple `02-modeles.md › august : clé inconnue « titr »`.

## Une slide

```md
## identifiant-de-la-slide
type : liste
rubrique : Les modèles
titre : Août 2026, le cap franchi
badges : {testé: Testé} {extrapolé: Niveau Opus : selon les éditeurs}
pied : Plus besoin d'un cluster de H200 pour des tâches générales
- Premier point
- Deuxième point

#### À l'oral

Ce que je raconte : ignoré par les slides.
```

- `## identifiant` ouvre une slide : en minuscules avec des tirets, unique dans tout le deck. C'est aussi le nom de l'image dans `out/stills/`.
- Une ligne `clé : valeur` remplit un champ. Les clés sont en minuscules ; une clé inconnue est une erreur (faute de frappe).
- Une ligne `- …` ajoute un élément (point de liste, ligne de déclaration, terme de lexique).
- `### Titre` ouvre une section : une carte, une étape, un terme de formule, un groupe de barres.
- Un tableau Markdown classique (`| … |` avec la ligne `|---|`) remplit un tableau.
- **Tout ce qui suit un `####`** (jusqu'à la slide ou la section suivante) est une note pour toi : progression, oral, compléments. Les paragraphes libres et les titres `#` sont aussi ignorés.

### Mise en forme dans le texte

- `**gras**` et `==couleur d'accent==` dans les titres, l'aveu et les déclarations
- Une ligne entièrement entre `==…==` dans une déclaration ou l'aveu est la phrase mise en avant (plus grande, en couleur)
- Les espaces insécables du français (avant `:`, `;`, `?`, `!`, dans les guillemets) et les tirets insécables des noms (`Flash-Next`) sont ajoutés automatiquement

### Badges testé / extrapolé

`{testé: Libellé}` (badge plein) et `{extrapolé: Libellé}` (badge en pointillés), dans le champ `badges` ou dans une cellule de tableau. Plusieurs badges se mettent à la suite.

### Clics

Les éléments du corps de la slide sont numérotés à partir de 1, dans l'ordre d'affichage : points, lignes, étapes, cartes… puis le pied de slide. L'élément 1 apparaît à l'arrivée sur la slide.

- `clics : tous` (valeur par défaut) : un clic pour chaque élément après le premier
- `clics : aucun` : tout apparaît d'un coup (valeur par défaut des types `titre` et `merci`)
- `clics : 4, 5, 6` : un clic avant les éléments 4, 5 et 6 ; les autres s'enchaînent seuls

`npm run check` affiche le nombre de clics de chaque slide.

## Les types de slides

| Type | Champs | Corps | Éléments (pour les clics) |
|---|---|---|---|
| `titre` | `titre`, `sous-titre`, `signature` | — | 1 |
| `aveu` | — | une ligne `- …` par phrase | une par phrase |
| `liste` | `rubrique`, `titre`, `badges`, `pied` | une ligne `- …` par point | les points, puis le pied |
| `tableau` | `rubrique`, `titre`, `badges`, `pied`, `largeurs` (ex. `1fr 2fr`), `taille` (police, 32 par défaut), `ligne-surlignée` (numéro de ligne) | un tableau | les lignes, puis le pied |
| `étapes` | `rubrique`, `titre`, `badges`, `pied`, `numérotées : non` (frise sans numéros) | une section `### Étape` par étape, avec `texte`, `détail` (ligne grise), `surligné : oui` | les étapes, puis le pied |
| `cartes` | `rubrique`, `titre`, `badges`, `pied` | une section `### Carte` par carte, avec `valeur` (grand chiffre), `légende`, `badges`, `surligné : oui` et des points `- …` | les cartes, puis le pied |
| `chiffre` | `rubrique`, `titre`, `badges`, `chiffre`, `légende`, `pied` | — | le chiffre, puis le pied |
| `trio` | `rubrique`, `objectif`, `piège`, `leçon` | — | 3 |
| `déclaration` | `rubrique` (facultatif) | une ligne `- …` par phrase | une par phrase |
| `lexique` | `rubrique`, `titre` | une ligne `- Terme` par terme, défini dans `lexique.md` | un par terme |
| `formule` | `rubrique`, `titre`, `pied` | exactement 3 sections `### Terme` avec `exemple` : a ÷ b = c | 3, puis le pied |
| `plafonds` | `rubrique`, `titre`, `sous-titre`, `badges` | un tableau `Machine \| tok/s \| Élément \| Nos cartes` | la colonne « Élément » regroupe les barres |
| `moe` | `rubrique`, `titre`, `badges`, `mesure`, `pied` | une section `### Groupe` par groupe de barres, chacune avec un tableau `Libellé \| Go \| Note \| Surligné` | les groupes, la mesure, puis le pied |
| `merci` | `rubrique`, `titre`, `signature` | un tableau `Libellé \| Lien` | les liens, puis la signature |

Les mises en page elles-mêmes (couleurs, tailles, animations) restent dans le code : `src/components/templates.tsx` pour les types courants, `src/slides/` pour les slides graphiques.
