# Édition DevFest Toulouse 2026

Jeudi 19 novembre 2026, 12:00 – 12:45, salle Agora, en remplacement de la conférence de Julien Briault. Ce fichier ne contient que ce qui change par rapport au deck de `docs/contenu/` (syntaxe dans `docs/contenu/README.md`, « Les éditions »).

## title
rubrique : Changement de programme
annonce : Cette conférence remplace **« CoeurIA : Refaire ChatGPT au service de la SolidarIT ? »** de Julien Briault, qui n'a pas pu venir
signature : Julien Del Rio · DevFest Toulouse 2026

#### Progression

pas de clic, tout apparaît à l'arrivée ; c'est la slide d'attente, affichée pendant que la salle s'installe : l'annonce du remplacement est au-dessus du titre

## replaced-talk
type : mention
après : title
rubrique : Initialement prévu sur ce créneau
titre : CoeurIA : Refaire ChatGPT au service de la SolidarIT ?
photo : julien-briault
signature : Julien Briault
sous-titre : Deezer & Restos du Cœur
texte : Julien n'a pas pu être là aujourd'hui. Sa conférence est à voir en vidéo.
qr : youtu.be/SKuumwWmIfA
légende : La vidéo de sa conférence

#### Progression

pas de clic, tout apparaît à l'arrivée

#### À l'oral

Julien Briault devait donner ici « CoeurIA : Refaire ChatGPT au service de la SolidarIT ? ». Il a dû annuler sa venue : on pense à lui. Sa conférence existe en vidéo sur YouTube, le QR code y mène ; je la recommande. Je le remplace avec un sujet voisin : une plateforme IA souveraine, avec des outils open source

#### Compléments

- la vidéo est l'enregistrement de PlatformCon Live Day Paris 2026, publié par WeScale : « CoeurIA : Et si on refaisait ChatGPT au service de la SolidarIT ? - Julien Briault, Deezer »
- Julien Briault : ingénieur réseau / SRE chez Deezer, et responsable bénévole de l'infrastructure aux Restos du Cœur (fiche DevFest Toulouse et bio Voxxed Days Luxembourg 2026)

<!-- Créneau de 45 minutes : onze slides retirées pour viser 32 à 34 minutes (décidé les 18 et 19/11/2026) -->

## chapter-glossary
- ==Poids==
- ==Open weights==
- ==Token==
- ==VRAM==
- ==Quantization==

#### Progression

aucun clic : les cinq mots apparaissent l'un après l'autre

#### À l'oral

« Avant d'entrer dans le vif du sujet, cinq mots qui vont revenir tout le long. »

## rounding
retirer : oui

## experts
retirer : oui

## out-of-reach
retirer : oui

## code-versions
retirer : oui

## rent-first
titre : Louer, ou acheter un poste IA
clics : 3, 5, 7
pied : Location au mois : tarifs publics OVH et Scaleway, hors taxes, octobre 2026. Postes IA : mémoire unifiée, mais plus lents que les GPU de datacenter

| Machine | Mémoire | Prix par mois | | Achat |
|---|---|---|---|---|
| 1 × L4 | 24 Go | 500 – 600 € | {testé: Testé} | |
| 1 × L40S | 48 Go | 1 000 – 1 100 € | {testé: Testé} | |
| 4 × L40S | 192 Go | 4 000 – 4 300 € | {extrapolé: Catalogue} | |
| 8 × H200 | 8 × 141 Go | ~30 700 € | {extrapolé: Catalogue} | |
| DGX Spark | 128 Go | À l'achat | {extrapolé: Catalogue} | oui |
| Mac Studio | ≤ 512 Go | À l'achat | {testé: Testé} | oui |

#### Progression

arrivée : les barres de la L4 et de la L40S (pleines : testées) s'enchaînent ; clic 1 : 4 × L40S et 8 × H200 (en pointillé : catalogue), la dernière barre sort de l'échelle ; clic 2 : les deux postes IA, en orange (à l'achat) ; clic 3 : le pied de slide

#### À l'oral

on a commencé par louer des L4 et des L40S chez des hébergeurs français, donc déjà dans l'esprit souverain. Excellente façon de tester toute la stack (moteur, plateforme, interface) malgré les limites de ces cartes, sans immobiliser de budget. L'autre porte d'entrée, c'est le poste IA qu'on achète : DGX Spark ou Mac Studio. CPU et GPU y partagent la même mémoire, donc beaucoup de place pour le modèle, mais c'est plus lent que des GPU de datacenter : pour l'interne et les labs, pas pour une offre aux clients. Testé sur Mac Studio : ça marche, mais l'écosystème NVIDIA reste le plus simple à exploiter. Les slides « matériel par catégorie » et « deux approches » sont retirées dans cette édition : donner ici, à l'oral, l'ordre de grandeur à l'achat de notre catégorie

## moe
retirer : oui

## hardware-by-category
retirer : oui

## two-approaches
retirer : oui

## teams
retirer : oui

## editions
retirer : oui

## harness
pied : Nous en proposons deux, open source : OpenCode et DeepSeek Harness. Chacun a ses limites

#### Progression

arrivée : ce qu'est le harness ; clics 1 à 4 : il pousse le modèle, plus d'itérations, la capacité, l'électricité ; clic 5 : le pied, nos deux harness

#### À l'oral

le harness compte autant que le modèle. En auto-hébergé, on n'est plus limité à compter les tokens dont on a besoin : la limite devient la capacité des cartes. Les slides ne chiffrent que l'écriture, mais pour un agent, c'est la lecture du prompt qui compte le plus : 1 300 à 2 000 tok/s chez nous en usage courant. Au pied de slide, nos deux harness, tous deux sous licence MIT (la slide « Deux harness open source » est retirée dans cette édition) : OpenCode gère encore mal l'arrivée en limite de contexte ; DeepSeek Harness, sorti en août 2026, est jeune et tout en web, mais avec de très belles promesses. En proposer deux permet de s'adapter aux limites de chacun

## two-harnesses
retirer : oui

## vision
retirer : oui

## thanks
signature : Julien Del Rio · DevFest Toulouse 2026
qr : juliendelrio.github.io/Conf-2026-11-IASouveraineOpenSource/?edition=devfest
