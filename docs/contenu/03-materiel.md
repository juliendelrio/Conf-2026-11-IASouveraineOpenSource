# 3. Le matériel (5 min 45)

## chapter-hardware
type : intercalaire
chiffre : 2
titre : Le matériel
- Les modèles
- ==Le matériel==
- Les moteurs
- La plateforme
- Les usages

#### Progression

pas de clic : l'intercalaire s'affiche puis on passe

#### À l'oral

rien, ou juste le nom du chapitre

## rent-first
type : échelle
rubrique : Le matériel
titre : Louer avant d'acheter
badges : {testé: Testé} {extrapolé: Catalogue}
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

arrivée : les barres de la L4 et de la L40S (pleines : testées) s'enchaînent ; clic 1 : H100, 4 × L40S et 8 × H200 (en pointillé : catalogue), la dernière barre sort de l'échelle ; clic 2 : le pied de slide

#### À l'oral

on a commencé par louer des L4 et des L40S chez des hébergeurs français, donc déjà dans l'esprit souverain. Excellente façon de tester toute la stack (moteur, plateforme, interface) malgré les limites de ces cartes, sans immobiliser de budget

#### Compléments

- Prix exacts OVH (forfaits mensuels) : L4 540 €, L40S 1 008 €, A100 1 100 €, H100 1 940 €, 2 × H100 3 880 €, 4 × L40S 4 032 €, 4 × H100 7 770 €, 8 × H200 30 660 €
- Prix exacts Scaleway (730 h) : L4 575 €, L40S 1 073 €, H100 PCIe 2 093 €, 2 × H100 PCIe 4 185 €, 2 × H100 SXM 4 832 €, 4 × L40S 4 292 €, 4 × H100 SXM 9 323 €, 8 × B300 43 800 €. Pas de RTX PRO 6000 au catalogue
- Fourchettes intermédiaires : A100 ~1 100 € (OVH seulement), 2 × L40S 2 000 – 2 100 €, 2 × H100 3 900 – 4 800 €, 4 × H100 7 800 – 9 300 €, 8 × B300 ~43 800 €

## five-questions
type : animation
scène : cinq questions
rubrique : Le matériel
titre : 5 questions avant d'acheter
- Est-ce que ça tourne ? Les pilotes et l'écosystème décident
- Est-ce que ça tient ? Le modèle et le contexte doivent loger en VRAM
- Est-ce que ça lit vite ? Tout le prompt d'un coup : du calcul
- Est-ce que ça écrit vite ? Un token à la fois : de la bande passante
- Les cartes se parlent-elles bien ? Pour répartir un modèle sur plusieurs

### Une carte graphique
détail : Pilotes : CUDA, ROCm, Metal

### VRAM
texte : le modèle, le contexte
détail : La taille de la VRAM

### Puce
texte : le calcul
détail : Puissance de calcul

### De la mémoire à la puce
détail : Bande passante mémoire
mesure : À chaque token, tous les poids repassent

### Une autre carte
détail : NVLink, PCIe ou réseau

#### Progression

arrivée : une carte graphique, sa puce et sa VRAM, « est-ce que ça tourne ? » ; clic 1 : la VRAM s'allume, ça tient ; clic 2 : le prompt entre d'un bloc dans la puce, ça lit vite ; clic 3 : les poids défilent de la VRAM à la puce (en boucle tant qu'on n'a pas cliqué), ça écrit vite ; clic 4 : une seconde carte et la liaison entre les deux. Les étiquettes restent : au repos, le dessin porte les cinq réponses

#### À l'oral

la grille de lecture pour comparer des machines, sur un seul dessin : une question par clic, la partie concernée s'allume. Ce que chaque point détermine se dit à l'oral : si le modèle et le moteur fonctionnent sur la carte ; la taille du modèle et du contexte qu'on peut loger ; le délai avant le début de la réponse ; la vitesse de génération ; la possibilité de répartir un modèle sur plusieurs cartes sans trop perdre en vitesse. Expliquer bande passante mémoire, lecture du prompt / génération et NVLink en une phrase chacun. Contexte : tout ce que le modèle a sous les yeux. Le KV cache garde en mémoire la conversation déjà lue : plus elle est longue, plus elle consomme de VRAM. Sur « est-ce que ça tourne ? » : AMD et Huawei commencent à sortir des puces pour l'IA. Le souci, c'est le manque de compatibilité CUDA ; mais la concurrence commence à grignoter l'hégémonie de NVIDIA. Lire et écrire, c'est contre-intuitif : lire, c'est tout le prompt d'un coup, traité en parallèle en une seule relecture des poids, donc du calcul ; écrire, c'est un token à la fois en relisant tous les poids, donc de la bande passante. Réfléchir, c'est écrire (les tokens de réflexion). Chez nous, sur les mêmes cartes : 1 300 à 2 000 tok/s en lecture, ~127 tok/s en écriture

#### Compléments

« est-ce que ça tourne » demande parfois une compilation dédiée du modèle pour la carte. La lecture du prompt est là où les Mac et les petites machines décrochent le plus. Les Mac M5 ont beaucoup de bande passante mais peu de calcul : ils écrivent correctement mais lisent lentement les longs prompts. Nuances pour les questions : avec beaucoup d'utilisateurs simultanés, une même relecture des poids sert plusieurs conversations et l'écriture se rapproche d'une limite de calcul ; avec un très long contexte, l'écriture relit aussi le KV cache à chaque token, encore de la bande passante. Les RTX PRO 6000 n'ont pas de NVLink, et passer d'un serveur à l'autre par le réseau est lent

Illustration en motion design, pas une mesure. Issues #11 et #25

## moe
type : moe
rubrique : Le matériel
titre : Le MoE : moins à relire, autant à loger
badges : {testé: 2 RTX PRO 6000 testées} {extrapolé: H100 extrapolé}
mesure : ~200 tok/s pour un utilisateur, aidé par le décodage spéculatif ; ~127 tok/s par requête en production
pied : Moins à relire, mais il faut pouvoir le loger : la mémoire compte autant que la vitesse

### Lu à chaque token : la vitesse

| Libellé | Go | Note | Surligné |
|---|---|---|---|
| Qwen3.8-27B (4 bits) | 16 | | |
| Qwen3.8-Flash-Next | 6 | seuls les paramètres actifs | oui |

### À loger en mémoire : la capacité

| Libellé | Go | Note | Surligné |
|---|---|---|---|
| Flash-Next en VRAM | 139 | embeddings en RAM CPU | oui |
| 2 RTX PRO 6000 | 192 | ça tient | |
| 2 H100 | 160 | tout juste | |

#### Progression

arrivée : « lu à chaque token » ; clic 1 : « à loger en mémoire » ; clic 2 : le chiffre mesuré ; clic 3 : le pied de slide

#### À l'oral

un modèle 5 fois plus gros que le 27B relit 6 Go par token au lieu de 16 : comme écrire, c'est relire les poids (slide 23), il peut aller plus vite. Comment il tient sur nos deux cartes : vLLM coupe chaque couche en deux, experts compris (tensor parallelism) ; chaque carte garde sa moitié des poids, calcule sa part, et les deux cartes échangent leurs résultats à chaque couche, par PCIe faute de NVLink. Et les 51B d'embeddings n-gram, de simples consultations de table, restent en RAM CPU : il reste ~65 Gio de poids par carte de 96 Go, et ~18 Gio pour le KV cache. Mais notre mesure doit beaucoup au décodage spéculatif : ne pas la comparer directement au 27B (sans décodage spéculatif, en 4 bits contre FP8). En contrepartie, il faut pouvoir le loger : la mémoire compte autant que la vitesse

#### Compléments

- Comment on le fait tenir (pas de détail de configuration sur scène) : FP8 officiel réparti sur les 2 cartes ; les 51B d'embeddings n-gram déportés en RAM CPU ; 18,2 Gio de KV cache par carte, soit 1,17 million de tokens au total, environ 6 conversations simultanées au contexte maximal ; communication en PCIe, sans NVLink
- Plafond théorique sans décodage spéculatif : ~265 tok/s. Le MTP produit 2,8 tokens par passe (61 % d'acceptation) ; ce sont les surcoûts (échanges entre cartes sans NVLink, kernels MoE non optimisés pour la carte) qui dominent. La formule donne un plafond, pas une prévision
- Pourquoi le découpage tient sans NVLink : avec 6B de paramètres actifs, ce qui transite entre les cartes à chaque couche, ce sont des résultats intermédiaires de petite taille, pas les poids ; les deux cartes sont dans le même serveur, sur le même nœud NUMA. Le prix : ces échanges à chaque couche font partie des surcoûts qui nous tiennent loin du plafond théorique, et l'algorithme d'échange par défaut de vLLM 0.29 a dû être désactivé au profit de NCCL (slide 31)
- Configuration en production : vLLM v0.30.0, les 2 cartes entièrement dédiées au Flash-Next, 90 % de leur VRAM réservée ; contexte maximal de 196 608 tokens par requête ; pool de KV cache de 1 175 552 tokens partagé entre les requêtes (relevé du 25/09/2026), soit ~6 requêtes au contexte maximal (5,95 selon vLLM). Le pool se remplit au nombre réel de tokens : des requêtes courtes passent bien au-delà de 6. Plafond de requêtes simultanées : non relevé
- Production sur 3 semaines : ~9 400 requêtes, premier token en 0,64 s en moyenne, 10,4 s de bout en bout
- 139 Go = 129 Gio de poids en VRAM, une fois les embeddings déportés ; le modèle complet fait ~186 Go
- En location : 2 × H100 tiendrait tout juste, avec environ 20 Gio de KV cache (calcul non testé) ; plus confortable : 4 × L40S (non testé) ou 4 × H100
- Grâce à l'attention hybride, le KV cache de ces modèles est plusieurs fois plus petit qu'avec une attention classique

## hardware-by-category
type : escalier
rubrique : Le matériel
titre : Le matériel par catégorie de modèles
pied : Interne : ordres de grandeur, carte et serveur compris ; seul le montant de la catégorie 3 est le nôtre

### 1. Petits modèles
texte : L4, RTX PRO 4500
valeur : ~10 – 20 k€
légende : ou 500 – 600 € / mois
badges : {testé: L4 testée}

### 2. Milieu de gamme
texte : 1 RTX PRO 6000, L40S, H100
valeur : ~25 – 35 k€
légende : ou 1 000 – 2 100 € / mois
badges : {testé: Testé}

### 3. Dev ready
texte : 2 RTX PRO 6000
valeur : 50 – 70 k€
légende : ou 3 900 – 9 300 € / mois
badges : {testé: Interne testé} {extrapolé: Location extrapolée}
surligné : oui

### 4. Hors de portée
texte : 8 RTX PRO 6000 à 8 H200 et plus
valeur : 200 k€ – 1 M€ et plus
légende : ou 30 700 – 43 800 € / mois
badges : {extrapolé: Extrapolé}

#### Progression

arrivée : la première marche, catégorie 1 ; clics 1 à 3 : les marches des catégories 2, 3 et 4 ; clic 4 : le pied de slide. Sur chaque marche : le matériel, le montant en interne, puis la location par mois

#### À l'oral

la réponse à la démarche annoncée au fil rouge : un budget, une catégorie, un matériel. Distinguer ce qu'on a testé de ce qui est extrapolé. Les montants internes des catégories 1, 2 et 4 sont des ordres de grandeur (carte et serveur, prix publics), seul celui de la catégorie 3 est le nôtre. Et sans matériel du tout, ces modèles se consomment à l'usage chez des hébergeurs français (le palier 2, slide 37)

#### Compléments

- Catégorie 1 : aussi RTX PRO 2000 / 4000 SFF ; des modèles ont bien tourné sur L4 en location
- Catégorie 2 : ~31 Go en FP8 (~16 Go en 4 bits) plus le KV cache ; RTX 5090 ou RTX PRO 4500 en 4 bits possibles
- Catégorie 3 : en location, 2 × H100 3 900 – 4 800 €/mois (tout juste, très peu de KV cache), 4 × L40S 4 000 – 4 300 €/mois ou 4 × H100 7 800 – 9 300 €/mois, tout extrapolé
- Montants internes, ordres de grandeur extrapolés des prix publics relevés le 02/11/2026 (HT ou TTC non précisé) : RTX PRO 4500 Server Edition ~3 700 – 7 000 €, RTX PRO 6000 Server Edition ~16 000 $ à ~20 000 €, plus le serveur. Catégorie 4 : 8 RTX PRO 6000 logeraient le bas de la catégorie (mais alimentation et refroidissement hors d'une salle serveur de PME), les plus gros modèles dépassent le million d'euros
- Nos cartes : 3 RTX PRO 6000 Blackwell Server Edition réparties sur 2 serveurs : 2 dédiées au Flash-Next (vLLM), la troisième au 27B (SGLang), qu'il partage avec la transcription, les embeddings, le reranker et la diarisation
- Les 50 – 70 k€ de la catégorie 3 : les 2 cartes du Flash-Next et leur serveur, pas la plateforme complète (troisième carte, second serveur) ; le temps humain n'est pas chiffré
- Pourquoi acheter plutôt que consommer à l'usage chez un hébergeur français (palier 2) : le coût marginal. Une fois l'usage principal rentabilisé (par exemple les développeurs de 9h à 17h), chaque usage en plus, léger ou hors des heures de bureau, ne coûte que l'électricité. Comparaison de coût chiffrée non faite

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

la première peut servir à l'interne et aux labs ; la seconde est obligatoire pour une offre aux clients. Une offre aux clients impose à la fois l'approche datacenter et une licence de modèle qui l'autorise (lien avec la slide 19)

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

le trio se suffit à lui-même

#### Compléments

—
