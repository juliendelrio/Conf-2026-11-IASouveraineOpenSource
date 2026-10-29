# 3. Le matériel (8 min)

## rent-first
type : tableau
rubrique : Le matériel
titre : Louer avant d'acheter
largeurs : 1.2fr 1fr 1.4fr 1.2fr
taille : 36
clics : 3, 6
pied : Tarifs publics OVH et Scaleway, hors taxes, octobre 2026 : de quoi tester toute la stack sans immobiliser de budget

| Machine | Mémoire | Prix par mois | |
|---|---|---|---|
| 1 × L4 | 24 Go | 500 – 600 € | {testé: Testé} |
| 1 × L40S | 48 Go | 1 000 – 1 100 € | {testé: Testé} |
| 1 × H100 | 80 Go | 1 900 – 2 100 € | {extrapolé: Catalogue} |
| 4 × L40S | 192 Go | 4 000 – 4 300 € | {extrapolé: Catalogue} |
| 8 × H200 | 8 × 141 Go | ~30 700 € | {extrapolé: Catalogue} |

#### Progression

arrivée : L4 et L40S (testées) s'enchaînent ; clic 1 : H100, 4 × L40S et 8 × H200 (catalogue) ; clic 2 : le pied de slide

#### À l'oral

on a commencé par louer des L4 et des L40S chez des hébergeurs français, donc déjà dans l'esprit souverain. Excellente façon de tester toute la stack (moteur, plateforme, interface) malgré les limites de ces cartes, sans immobiliser de budget

#### Compléments

- Prix exacts OVH (forfaits mensuels) : L4 540 €, L40S 1 008 €, A100 1 100 €, H100 1 940 €, 2 × H100 3 880 €, 4 × L40S 4 032 €, 4 × H100 7 770 €, 8 × H200 30 660 €
- Prix exacts Scaleway (730 h) : L4 575 €, L40S 1 073 €, H100 PCIe 2 093 €, 2 × H100 PCIe 4 185 €, 2 × H100 SXM 4 832 €, 4 × L40S 4 292 €, 4 × H100 SXM 9 323 €, 8 × B300 43 800 €. Pas de RTX PRO 6000 au catalogue
- Fourchettes intermédiaires : A100 ~1 100 € (OVH seulement), 2 × L40S 2 000 – 2 100 €, 2 × H100 3 900 – 4 800 €, 4 × H100 7 800 – 9 300 €, 8 × B300 ~43 800 €

## five-questions
type : tableau
rubrique : Le matériel
titre : 5 questions avant d'acheter
largeurs : 1fr 1.3fr
taille : 36

| La question | Ce qui joue |
|---|---|
| Est-ce que ça tourne ? | Les pilotes et l’écosystème : CUDA, ROCm, Metal |
| Est-ce que ça tient ? | La VRAM : le modèle et le KV cache |
| Est-ce que ça écrit vite ? | La bande passante mémoire |
| Est-ce que ça lit vite ? | La puissance de calcul : lire un long prompt |
| Les cartes se parlent-elles bien ? | NVLink, PCIe ou réseau : répartir un modèle |

#### Progression

arrivée : est-ce que ça tourne ? ; clics 1 à 4 : ça tient, ça écrit vite, ça lit vite, les cartes se parlent

#### À l'oral

la grille de lecture pour comparer des machines. Expliquer bande passante mémoire, lecture du prompt / génération et NVLink en une phrase chacun

#### Compléments

« est-ce que ça tourne » demande parfois une compilation dédiée du modèle pour la carte. La lecture du prompt est là où les Mac et les petites machines décrochent le plus. Les RTX PRO 6000 n'ont pas de NVLink, et passer d'un serveur à l'autre par le réseau est lent

## speed-formula
type : formule
rubrique : Le matériel
titre : Le réflexe à retenir
pied : Pour chaque token généré, la carte relit tous les poids utiles : un bon moteur atteint environ 80 % de ce plafond

### Bande passante mémoire
exemple : ex. 1,6 To/s

### Poids lus par token
exemple : ex. 16 Go

### Plafond de vitesse
exemple : ~100 tokens/s, un utilisateur seul

#### Progression

arrivée : la bande passante mémoire ; clic 1 : ÷ poids lus par token ; clic 2 : = plafond de vitesse ; clic 3 : le pied de slide

#### À l'oral

la formule à retenir pour estimer une machine avant de l'acheter. Seul le décodage spéculatif permet de dépasser ce plafond

#### Compléments

l'exemple est notre RTX PRO 6000 Server Edition (1 597 Go/s) avec Qwen3.8-27B en 4 bits. Source de la méthode : vidéo sur Lithos Metal et le plafond de bande passante, https://youtu.be/L7noXCBSObc

## speed-ceiling
type : plafonds
rubrique : Le matériel
titre : Plafond de vitesse, un utilisateur seul
sous-titre : Qwen3.8-27B en 4 bits · bande passante ÷ 16 Go lus par token
badges : {extrapolé: Extrapolé}

La colonne « Élément » regroupe les barres par clic (1 = à l'arrivée). « Nos cartes » met la barre en couleur avec un badge.

| Machine | tok/s | Élément | Nos cartes |
|---|---|---|---|
| DGX Spark | 17 | 1 | |
| L4 | 19 | 1 | |
| Mac M5 Max | 38 | 1 | |
| L40S | 54 | 1 | |
| Mac Studio M5 Ultra | 75 | 1 | |
| RTX PRO 6000 | 100 | 2 | oui |
| H100 SXM | 210 | 3 | |
| H200 | 300 | 3 | |

#### Progression

arrivée : le sous-titre et les 5 premières machines (DGX Spark à Mac Studio M5 Ultra) ; clic 1 : la RTX PRO 6000 ; clic 2 : H100 et H200

#### À l'oral

la bande passante varie d'un facteur 30 entre une machine de bureau et un GPU de datacenter. On ne maximise pas mémoire et vitesse à la fois sans payer cher : Mac et DGX Spark ont beaucoup de mémoire mais sont lents ; une 5090 est rapide mais tient peu ; la RTX PRO 6000 est le compromis

#### Compléments

- Tous ces chiffres sont des plafonds théoriques, y compris pour nos cartes (le badge « Nos cartes » ne signifie pas une mesure)
- Bandes passantes : DGX Spark 273 Go/s, L4 300 Go/s, M5 Max 614 Go/s, L40S 864 Go/s, M5 Ultra 1,2 To/s, RTX PRO 6000 Server Edition 1 597 Go/s (Workstation 1 792), H100 PCIe 2 To/s, H100 SXM 3,35 To/s, H200 4,8 To/s, B200 8 To/s
- Le M5 Max 32 cœurs GPU (460 Go/s) est limité à 36 Go ; il faut la version 40 cœurs pour 128 Go
- Les chiffres « AI TOPS » des fiches GeForce et RTX PRO sont en FP4 ou FP8 avec sparsité : 2 à 4 fois les chiffres utiles
- Tableau complet sur 17 machines, avec la puissance de calcul et les sources constructeurs, dans l'annexe du chapitre 3

## moe
type : moe
rubrique : Le matériel
titre : Le MoE change la donne
badges : {testé: 2 RTX PRO 6000 testées} {extrapolé: H100 extrapolé}
mesure : ~200 tok/s sur 2 RTX PRO 6000 avec un utilisateur, ~127 tok/s par requête en production
pied : Le Flash-Next va plus vite que le 27B, mais il faut pouvoir le loger en entier : la mémoire compte autant que la vitesse

### Lu à chaque token : la vitesse

| Libellé | Go | Note | Surligné |
|---|---|---|---|
| Qwen3.8-27B (4 bits) | 16 | | |
| Qwen3.8-Flash-Next | 6 | seuls les paramètres actifs | oui |

### À loger en mémoire : la capacité

| Libellé | Go | Note | Surligné |
|---|---|---|---|
| Qwen3.8-Flash-Next | 186 | | oui |
| 2 RTX PRO 6000 | 192 | ça tient | |
| 2 H100 | 160 | ça ne tient pas | |

#### Progression

arrivée : « lu à chaque token » ; clic 1 : « à loger en mémoire » ; clic 2 : le chiffre mesuré ; clic 3 : le pied de slide

#### À l'oral

un modèle 5 fois plus gros que le 27B va presque 3 fois plus vite, parce qu'il relit 6 Go par token au lieu de 16. En contrepartie, il faut pouvoir le loger en entier : la mémoire compte autant que la vitesse

#### Compléments

- Comment on le fait tenir (pas de détail de configuration sur scène) : FP8 officiel réparti sur les 2 cartes ; les 51B d'embeddings n-gram déportés en RAM CPU ; 18,2 Gio de KV cache par carte, soit 1,17 million de tokens au total, environ 6 conversations simultanées au contexte maximal ; communication en PCIe, sans NVLink
- Plafond théorique sans décodage spéculatif : ~265 tok/s. Le MTP produit 2,8 tokens par passe (61 % d'acceptation) ; ce sont les surcoûts (échanges entre cartes sans NVLink, kernels MoE non optimisés pour la carte) qui dominent. La formule donne un plafond, pas une prévision
- Production sur 3 semaines : ~9 400 requêtes, premier token en 0,64 s en moyenne, 10,4 s de bout en bout
- En location, il faudrait 4 × L40S (non testé) ou 4 × H100
- Grâce à l'attention hybride, le KV cache de ces modèles est plusieurs fois plus petit qu'avec une attention classique

## hardware-by-category
type : tableau
rubrique : Le matériel
titre : Le matériel par catégorie de modèles
largeurs : 1.3fr 1.5fr 0.9fr 1.1fr 1.4fr

| Catégorie | Matériel | Interne | Location / mois | |
|---|---|---|---|---|
| 1. Petits modèles | L4, RTX PRO 4500 | < 100 k€ | 500 – 600 € | {testé: L4 testée} |
| 2. Milieu de gamme | 1 RTX PRO 6000, L40S, H100 | < 100 k€ | 1 000 – 2 100 € | {testé: Testé} |
| 3. Le cap d'août | 2 RTX PRO 6000 | 50 – 70 k€ | 4 000 – 9 300 € | {testé: Interne testé} {extrapolé: Location extrapolée} |
| 4. Hors de portée | 8 H200 et plus | > 1 M€ | 30 700 – 43 800 € | {extrapolé: Extrapolé} |

#### Progression

arrivée : l'en-tête et la catégorie 1 ; clics 1 à 3 : catégories 2, 3 et 4

#### À l'oral

la réponse à la démarche de la slide 7 : un budget, une catégorie, un matériel. Distinguer ce qu'on a testé de ce qui est extrapolé

#### Compléments

- Catégorie 1 : aussi RTX PRO 2000 / 4000 SFF ; des modèles ont bien tourné sur L4 en location
- Catégorie 2 : ~31 Go en FP8 (~16 Go en 4 bits) plus le KV cache ; RTX 5090 ou RTX PRO 4500 en 4 bits possibles
- Catégorie 3 : en location, 4 × L40S 4 000 – 4 300 €/mois ou 4 × H100 7 800 – 9 300 €/mois ; 2 H100 ne suffisent pas
- Nos cartes : 3 RTX PRO 6000 Blackwell Server Edition réparties sur 2 serveurs

## two-approaches
type : cartes
rubrique : Le matériel
titre : Deux approches pour héberger en interne
pied : Certaines cartes rentrent dans un serveur classique : L4, RTX PRO 4500 Server Edition

### Salle serveur
- Non industrialisée
- Mac Studio, DGX Spark, cartes non Server Edition
- Pour l’interne et les labs
- Attention à l’électricité et à la chaleur

### Datacenter
surligné : oui
- Une vraie industrialisation
- Cartes Server Edition et datacenter
- Obligatoire pour une offre aux clients
- Coût et délai de mise en place

#### Progression

arrivée : la carte salle serveur ; clic 1 : la carte datacenter ; clic 2 : le pied de slide

#### À l'oral

la première peut servir à l'interne et aux labs ; la seconde est obligatoire pour une offre aux clients. Une offre aux clients impose à la fois l'approche datacenter et une licence de modèle qui l'autorise (lien avec la slide 14)

#### Compléments

- Tests sur Mac Studio : ça marche, mais l'écosystème NVIDIA reste le plus simple à exploiter. Mac Studio M5 Ultra jusqu'à 512 Go de mémoire unifiée, DGX Spark 128 Go, mais plus lents que les GPU de datacenter
- L4 : 72 W, alimentée par le seul port PCIe, demi-hauteur, une seule largeur de slot, refroidissement passif. Vieillissante ; dire « remplacée par la RTX PRO 4500 Server Edition » plutôt que « plus produite »
- RTX PRO 4500 Server Edition : 32 Go, 800 Go/s, 165 W, une seule largeur de slot, passive
- Nos RTX PRO 6000 Server Edition : refroidissement passif, châssis serveur obligatoire, 11 % de bande passante en moins que l'édition Workstation

## hardware-trio
type : trio
rubrique : Le matériel
objectif : Des preuves de faisabilité à moindre coût, pour convaincre d'investir plus
piège : Obtenir de petits volumes de cartes est compliqué : un fournisseur nous a aidés avec son offre « try and buy »
leçon : Passer par la location permet d'y aller petit à petit

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

_à compléter_ (le trio se suffit à lui-même ; ajouter une anecdote si besoin)

#### Compléments

—
