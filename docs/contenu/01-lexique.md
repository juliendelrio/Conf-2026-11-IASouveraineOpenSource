# 1. Petit lexique (4 min)

Un mot par slide, chacun illustré par une animation (des illustrations, pas des mesures). Les définitions de référence sont dans `lexique.md`. Ordre : poids, open weights, token, VRAM, puis la quantization, qui s'appuie sur la VRAM.

## chapter-glossary
type : intercalaire
titre : Petit lexique
- ==Poids==
- ==Open weights==
- ==Token==
- ==VRAM==
- ==Quantization==

#### Progression

aucun clic : les cinq mots apparaissent l'un après l'autre

#### À l'oral

« Avant d'entrer dans le vif du sujet, cinq mots qui vont revenir tout le long. »

## weights
type : animation
scène : réseau
rubrique : Petit lexique
titre : Paramètres, poids
- Un réseau de neurones : chaque connexion porte un poids, réglé pendant l’entraînement
- Les poids sont rangés en couches : pour écrire, le modèle les traverse toutes
- Leur nombre donne la taille du modèle, en milliards (B)

### 7B
texte : petit

### 32B
texte : moyen

### 400B
texte : très gros

### Un poids
détail : 0,73

#### Progression

arrivée : un petit réseau, un poids épinglé sur une connexion ; clic 1 : un signal traverse les couches ; clic 2 : des réseaux plus gros à côté, avec leur taille

#### À l'oral

une métaphore, pas de maths : le comportement est appris, pas programmé ; l'entraînement règle des milliards de petits boutons. Les couches : des dizaines, empilées ; pour chaque token écrit, le modèle les traverse toutes, l'une après l'autre (on y revient au MoE, slide 18)

#### Compléments

- Illustration en motion design : un vrai modèle a des milliards de poids et des dizaines de couches
- Les tailles 7B, 32B, 400B sont des ordres de grandeur, pas des modèles précis

## open-weights
type : animation
scène : boîte noire
rubrique : Petit lexique
titre : Open weights
- Entraîner un modèle : des données et du code produisent les poids, sur beaucoup de GPU
- Un modèle open weights garde tout l’entraînement dans une boîte noire
- Il ne reste que le résultat : les poids, pour exécuter le modèle

### Les données
texte : textes, code, images…

### L’entraînement
texte : code et beaucoup de GPU

### Les poids
texte : le modèle entraîné
détail : Téléchargeable

### Boîte noire
texte : ni les données, ni le code

#### Progression

arrivée : données → entraînement → poids, le flux tourne ; clic 1 : la boîte noire recouvre les données et l’entraînement ; clic 2 : il ne reste que les poids, téléchargeables

#### À l'oral

on récupère les poids, pas forcément les données ni le code d'entraînement : on peut exécuter le modèle, pas le reproduire. Ce n'est donc pas de l'open source (repris à la slide 20)

#### Compléments

- Illustration en motion design
- Nuance possible aux questions (issue #13) : les poids eux-mêmes peuvent s'inspecter avec des outils d'interprétabilité ; ce sont les données et l'entraînement qu'on ne peut pas auditer

## token
type : animation
scène : tokens
rubrique : Petit lexique
titre : Token
- Le texte est découpé en tokens : des morceaux de mots, environ 3/4 d’un mot
- Le modèle lit ces tokens et les fait passer dans toutes ses couches
- Il répond token par token : l’unité des vitesses et des prix

### La question
texte : Où| se| tient| le| Capit|ole| du| Libre| ?

### Le modèle
texte : ses couches

### La réponse
texte : À| Toul|ouse| !

#### Progression

arrivée : la question découpée en tokens ; clic 1 : les tokens entrent dans le modèle, le signal traverse les couches ; clic 2 : la réponse sort token par token

#### À l'oral

un token, c'est environ 3/4 d'un mot ; les vitesses se comptent en tokens par seconde et les prix en euros par million de tokens. Le modèle écrit un token à la fois : c'est pour ça que la réponse s'affiche au fil de l'eau

#### Compléments

- Illustration en motion design : le découpage est inventé, chaque modèle a son propre découpage (son tokenizer)

## vram
type : animation
scène : vram
rubrique : Petit lexique
titre : VRAM
- Dans l’ordinateur, le processeur (CPU) a sa mémoire : la RAM
- La carte graphique (GPU) a la sienne : la VRAM, collée à ses calculs
- Le modèle doit tenir en entier dans la VRAM : la vraie ressource rare

### CPU
texte : le processeur

### RAM
texte : sa mémoire

### GPU
texte : la carte graphique

### VRAM
texte : sa mémoire à elle

### Le modèle
texte : chargé en entier

#### Progression

arrivée : la carte mère, le CPU et sa RAM ; clic 1 : la carte graphique arrive avec sa VRAM ; clic 2 : le modèle se charge dans la VRAM, puce après puce

#### À l'oral

la RAM de l'ordinateur et la VRAM de la carte graphique sont deux mémoires séparées. Le modèle doit tenir en entier dans la VRAM, avec en plus la place pour les conversations en cours : c'est la vraie ressource rare, et ce qui fixe le prix des cartes

#### Compléments

- Illustration en motion design, vue simplifiée (la carte graphique est dessinée à plat)
- Exception : sur les Mac et le DGX Spark, CPU et GPU partagent la même mémoire (mémoire unifiée)

## rounding
type : animation
scène : arrondi
rubrique : Petit lexique
titre : Quantization : arrondir les poids
- En 16 bits, un poids s’écrit avec beaucoup de précision
- En 8 bits, moins de graduations : il s’arrondit à la plus proche
- En 4 bits, encore moins : le modèle est 4 fois plus léger, un peu moins précis

### 16 bits
détail : 0,7342

### 8 bits
détail : 0,73

### 4 bits
détail : 0,75

#### Progression

arrivée : 16 bits, le poids sur une règle très fine ; clic 1 : 8 bits, il s'arrondit à la graduation la plus proche ; clic 2 : 4 bits, l'écart avec la valeur exacte grandit

#### À l'oral

le principe de l'arrondi : moins de bits, c'est moins de graduations sur la règle ; chaque poids prend la graduation la plus proche. L'écart, c'est la précision perdue. La slide suivante montre ce qu'on y gagne

#### Compléments

- Illustration en motion design : les graduations sont décimales pour être lisibles, un vrai format 8 ou 4 bits n'arrondit pas en décimal

## quantization
type : animation
scène : quantification
rubrique : Petit lexique
titre : La quantization en image
- En 16 bits, Qwen3.8-27B pèse ~54 Go : il ne tient pas sur une carte de 24 Go
- En 8 bits, ~31 Go : toujours trop
- En 4 bits, ~16 Go : il tient, au prix d'un peu de précision

### 16 bits
texte : ~54 Go
détail : 0,7342

### 8 bits
texte : ~31 Go
détail : 0,73

### 4 bits
texte : ~16 Go
détail : 0,75

### Une L4
texte : 24 Go

#### Progression

arrivée : 16 bits, le modèle déborde de la carte ; clic 1 : 8 bits, toujours trop ; clic 2 : 4 bits, il tient

#### À l'oral

le même poids, écrit avec de moins en moins de bits : il s'arrondit, et le modèle rétrécit jusqu'à tenir sur une seule carte. On perd un peu de précision ; c'est ce qui permet de faire tourner un 27B sur une L4 louée

#### Compléments

- Illustration en motion design, pas une mesure. Issue #6. Les valeurs du poids sont illustratives (un vrai format 8 ou 4 bits n'arrondit pas en décimal)
- ~54 Go calculé (27 milliards de paramètres × 2 octets) ; ~31 Go en FP8 et ~16 Go en 4 bits repris du chapitre matériel (slide 26) ; L4 : 24 Go, louée et testée (slide 23). Il faut encore loger le KV cache

