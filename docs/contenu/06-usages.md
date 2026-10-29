# 6. Les usages (10 min)

## usage-types
type : tableau
rubrique : Les usages
titre : Trois types d'usages
badges : {testé: Tout est testé}
largeurs : 1fr 1.2fr 1.8fr
taille : 34
pied : Dès le 27B et le Flash-Next, ça devient intéressant. Les développeurs sont les plus exigeants ; le chat et les intégrations impressionnent déjà

| Type | Pour qui | Par quoi |
|---|---|---|
| Généraliste | Tous les utilisateurs | Un outil de chat : LibreChat |
| Développeurs | Les équipes de développement | Des agents de code : OpenCode, DeepSeek Harness |
| Intégrations | Les applications | Le modèle dans un outil existant, par API |

#### Progression

arrivée : généraliste ; clics 1 et 2 : développeurs, intégrations ; clic 3 : le constat

#### À l'oral

les besoins les plus intenses sont ceux des développeurs, c'est là qu'il faut le plus de compromis. Pour le chat et les intégrations, on fait déjà des choses vraiment très impressionnantes

#### Compléments

—

## internal-chat
type : cartes
rubrique : Usages · le chat
titre : Un ChatGPT interne

### Open WebUI
- Le candidat naturel
- La main sur énormément de paramètres
- Trop complexe pour des utilisateurs standards
- Gardé pour l’équipe IA

### LibreChat
surligné : oui
- Ergonomique
- Pensé pour les utilisateurs standards

#### Progression

arrivée : la carte Open WebUI ; clic 1 : la carte LibreChat

#### À l'oral

Open WebUI, anciennement Ollama WebUI, était le candidat naturel. On est parti sur LibreChat pour son côté ergonomique. L'équipe IA garde Open WebUI pour pousser certains tests très loin

#### Compléments

—

## chat-trio
type : trio
rubrique : Usages · le chat
objectif : Proposer un ChatGPT interne
piège : Partir sur le candidat naturel, Open WebUI, trop complexe pour des utilisateurs standards
leçon : Pour les utilisateurs finaux, il faut faire simple et ergonomique

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

_à compléter_

#### Compléments

—

## dev-levers
type : étapes
rubrique : Usages · les développeurs
titre : Deux leviers, un palier net

### Avant août
texte : La capacité minimale des modèles coinçait

### DeepSeek-V4-Flash-0731
texte : Le premier levier

### Qwen3.8-Flash-Next
texte : Le second levier
surligné : oui

#### Progression

arrivée : avant août ; clic 1 : DeepSeek-V4-Flash-0731 ; clic 2 : Qwen3.8-Flash-Next

#### À l'oral

on note clairement un palier avec les modèles d'août

#### Compléments

voir les slides 8 et 12

## harness
type : liste
rubrique : Usages · les développeurs
titre : Le harness, un vrai levier
- Le harness, c’est l’application autour du modèle : outils, skills, prompts système
- C’est souvent lui qui pousse le modèle dans ses retranchements
- Quand on ne compte plus au jeton, il peut faire plus d’itérations pour arriver au résultat
- Ça consomme un peu plus d’électricité, mais c’est négligeable sur l’ensemble

#### Progression

arrivée : ce qu'est le harness ; clics 1 à 3 : il pousse le modèle, plus d'itérations, l'électricité

#### À l'oral

le harness compte autant que le modèle. En auto-hébergé, on n'est plus limité à compter les tokens dont on a besoin

#### Compléments

lecture du prompt observée en production : 1 300 à 2 000 tok/s en usage courant, pics à 14 000 tok/s grâce au cache de préfixes. Pour un agent qui lit 6 tokens pour 1 écrit, c'est cette vitesse qui compte

## two-harnesses
type : cartes
rubrique : Usages · les développeurs
titre : Deux harness open source
pied : En proposer deux permet de s'adapter aux limites de chacun

### OpenCode
- Licence MIT
- Gère encore mal l’arrivée en limite de contexte

### DeepSeek Harness
- Licence MIT, août 2026
- Approche web only, système jeune
- Mais des promesses très belles

#### Progression

arrivée : la carte OpenCode ; clic 1 : la carte DeepSeek Harness ; clic 2 : le pied de slide

#### À l'oral

chaque harness a ses limites ; en proposer deux permet de les contourner

#### Compléments

- OpenCode : https://github.com/sst/opencode
- DeepSeek Harness (`dsh`) : architecture « tout est plugin » (basée sur Cordis), en developer preview (changements incompatibles annoncés). L'interface web est servie en local (`dsh web`, port 3080) ; l'application de bureau n'est qu'une coquille Electron autour de cette même interface. Accès à distance par un reverse proxy. Versions encore en alpha / rc fin octobre 2026. https://github.com/deepseek-ai/deepseek-harness
- La configuration d'un endpoint auto-hébergé n'est pas documentée

## vision
type : cartes
rubrique : Usages · les développeurs
titre : Et les images ?

### Avant : deux modèles
- DeepSeek-V4-Flash ne lit que du texte
- Qwen3.8-27B décrivait les captures à sa place

### Depuis Flash-Next
surligné : oui
- Un vrai modèle multimodal
- Il lit lui-même captures et maquettes
- La qualité a progressé en développement

#### Progression

arrivée : la carte « avant » ; clic 1 : la carte « depuis Flash-Next »

#### À l'oral

simuler un modèle multimodal en combinant deux modèles, ça dépanne ; un vrai modèle multimodal reste bien plus performant sur la vision

#### Compléments

expliquer « multimodal » en une phrase : un modèle qui comprend aussi les images

## dev-trio
type : trio
rubrique : Usages · les développeurs
objectif : Un agent de code assez bon pour que le gain soit significatif
piège : La capacité des modèles : on garde Claude pour les profils architecte et lead
leçon : Le harness est un levier aussi important que le modèle ; en proposer deux contourne les limites de chacun

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

le piège rappelle l'aveu du début : Claude reste notre palier 3 (repris en conclusion, slide 44)

#### Compléments

—

## integrations
type : tableau
rubrique : Usages · les intégrations
titre : Trois intégrations, trois maturités
largeurs : 1fr 1.5fr
taille : 34
pied : Surtout des modèles de catégorie 1, qui tiennent sur une L4 dans un serveur classique

| Intégration | Maturité |
|---|---|
| Assistant de compte rendu de réunions (transcription) | Utilisé tous les jours, même avant la v1 |
| RAG dans la gestion documentaire | En test : pas magique, il faut aussi retravailler la documentation |
| Modèle « System One » pour trier les tickets | Preuve de concept |

#### Progression

arrivée : l'assistant de réunion ; clics 1 et 2 : le RAG, le System One ; clic 3 : le pied de slide

#### À l'oral

la maturité n'est pas la même. L'assistant de réunion est le plus mature. Le RAG est en test auprès des premiers utilisateurs : on se rend compte qu'il faut retravailler la documentation pour que sa qualité permette une remontée pertinente

#### Compléments

- Expliquer « STT » (transcription) en une phrase
- Modèle « System One » : réponses typées (choix, oui / non, score) avec une probabilité par réponse, sans générer de texte ; tri, routage, modération. Exemple open source auto-hébergeable : Decision 2.0 de vLLM Semantic Router (Apache 2.0, de 0,6B à 27B, ~7 ms par question pour le 2B), https://hf.co/collections/vllm-sr/decision-20-6ab7cf7bdfb506bf8269cb00

## integrations-trio
type : trio
rubrique : Usages · les intégrations
objectif : Des outils pour augmenter la productivité : d'où l'assistant de réunion en premier
piège : Penser que l'IA est magique : en souverain, ça demande de la veille et de l'adaptation
leçon : Malgré tout, on peut faire des choses impressionnantes en souverain

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

cette leçon reprend l'objectif annoncé à l'ouverture (slide 3) et prépare le message final

#### Compléments

—
