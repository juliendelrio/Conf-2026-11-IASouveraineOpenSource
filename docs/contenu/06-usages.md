# 6. Les usages (10 min 15)

## chapter-usages
type : intercalaire
chiffre : 5
titre : Les usages
- Les modèles
- Le matériel
- Les moteurs
- La plateforme
- ==Les usages==

#### Progression

pas de clic : l'intercalaire s'affiche puis on passe

#### À l'oral

rien, ou juste le nom du chapitre

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

les besoins les plus intenses sont ceux des développeurs, c'est là qu'il faut le plus de compromis. Pour le chat et les intégrations, on fait déjà des choses vraiment très impressionnantes. Agentique : un modèle qui enchaîne des actions (lire, exécuter, corriger) au lieu de répondre une fois

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
- Plus sous licence open source (OSI) depuis la v0.6.6

### LibreChat
surligné : oui
- Ergonomique
- Pensé pour les utilisateurs standards

#### Progression

arrivée : la carte Open WebUI ; clic 1 : la carte LibreChat

#### À l'oral

Open WebUI, anciennement Ollama WebUI, était le candidat naturel. On est parti sur LibreChat pour son côté ergonomique. L'équipe IA garde Open WebUI pour pousser certains tests très loin : c'est l'exception de la stack, sa licence n'est plus open source. L'abstract annonçait Open WebUI : depuis, les utilisateurs sont passés à LibreChat

#### Compléments

—

## chat-trio
type : trio
rubrique : Usages · le chat
fil : Chat
objectif : Proposer un ChatGPT interne
piège : Partir sur le candidat naturel, Open WebUI, trop complexe pour des utilisateurs standards
leçon : Pour les utilisateurs finaux, il faut faire simple et ergonomique

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

un retour d'expérience des utilisateurs : ils étaient perdus par l'ergonomie d'Open WebUI. C'est ce qui a motivé le passage à LibreChat

#### Compléments

—

## agent-loop
type : animation
scène : boucle agent
rubrique : Usages · les développeurs
titre : Le développement agentique, vu de nos cartes
- Un agent lit, agit, vérifie, et recommence jusqu'à ce que ça passe
- Le harness tourne sur le poste du développeur et lance des sous-agents en parallèle
- Quelques développeurs suffisent à remplir nos cartes : les requêtes suivantes attendent

### Lire
texte : le code, l'erreur

### Agir
texte : écrire, lancer un outil

### Vérifier
texte : les tests
détail : Tests au vert

### Itérations

### Conversations simultanées
texte : 6 à 10 selon leur longueur
détail : En attente

### Poste
texte : harness et sous-agents

#### Progression

arrivée : la boucle d'un agent tourne quatre fois, jusqu'aux tests au vert ; clic 1 : un poste de développeur, son harness lance 4 sous-agents qui prennent 4 conversations (en boucle tant qu'on n'a pas cliqué) ; clic 2 : deux autres postes remplissent les 10 conversations, la suivante attend

#### À l'oral

ce que veut dire « agentique » en image : l'agent ne répond pas une fois, il boucle jusqu'au résultat. Chaque boucle consomme des tokens ; en auto-hébergé, on ne compte plus au jeton, la limite devient le nombre de conversations que nos cartes tiennent en même temps. Spécificité des environnements de développement : le harness tourne sur le poste du développeur, pas chez nous ; et tous les harness ont maintenant des stratégies multi-sous-agents, qui lancent autant de requêtes en parallèle. Un seul développeur peut donc occuper plusieurs conversations à la fois, et quelques-uns suffisent à remplir nos cartes. C'est là que le pilotage par équipe (slide 35) et le débord vers le palier 2 (slide 38) prennent tout leur sens

#### Compléments

- Illustration en motion design, pas une mesure. Issue #6. Le nombre d'itérations, de sous-agents par poste (4) et de postes (3) est illustratif
- 6 à 10 conversations simultanées sur Flash-Next : ~6 au contexte maximal de 196k tokens, davantage quand elles sont courtes (slide 24) ; au-delà, les requêtes attendent leur tour. L'animation dessine 10 emplacements

## harness
type : liste
rubrique : Usages · les développeurs
titre : Le harness, un vrai levier
- Le harness, c’est l’application autour du modèle : outils, skills, prompts système
- C’est souvent lui qui pousse le modèle dans ses retranchements
- Quand on ne compte plus au jeton, il peut faire plus d’itérations pour arriver au résultat
- La limite devient la capacité : 6 à 10 conversations simultanées sur Flash-Next
- Un peu plus d’électricité, mais bornée : 600 W par carte au maximum

#### Progression

arrivée : ce qu'est le harness ; clics 1 à 4 : il pousse le modèle, plus d'itérations, la capacité, l'électricité

#### À l'oral

le harness compte autant que le modèle. En auto-hébergé, on n'est plus limité à compter les tokens dont on a besoin : la limite devient la capacité des cartes. Les slides ne chiffrent que l'écriture, mais pour un agent, c'est la lecture du prompt qui compte le plus : 1 300 à 2 000 tok/s chez nous en usage courant

#### Compléments

- Lecture du prompt observée en production : 1 300 à 2 000 tok/s en usage courant, pics à 14 000 tok/s grâce au cache de préfixes. Pour un agent qui lit 6 tokens pour 1 écrit, c'est cette vitesse qui compte
- Capacité : 6 à 10 conversations simultanées sur Flash-Next (~6 au contexte maximal, slide 24) ; 19 à 48 sur le 27B (19 aujourd'hui, jusqu'à 48 avec toute la carte, estimation)
- Électricité : 600 W par RTX PRO 6000 Server Edition au maximum (fiche constructeur), soit 1,2 kW pour les 2 cartes du Flash-Next, hors serveur ; pas mesurée chez nous

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
fil : Développeurs
objectif : Un agent de code assez bon pour que le gain soit significatif
piège : La capacité des modèles : on garde Claude pour les profils architecte et lead
leçon : Le harness est un levier aussi important que le modèle ; en proposer deux contourne les limites de chacun

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

le piège rappelle l'aveu du début : Claude reste notre palier 3 (repris en conclusion, slide 55). Les comparaisons à Opus des modèles d'août viennent des éditeurs et de notre ressenti : c'est sur les tâches les plus exigeantes, architecture et lead, que Claude reste utilisé. Par confort, pas par nécessité : les gros modèles du palier 2 s'en approchent (GLM d'Opus 5.0, DeepSeek-V4.1-Flash-1017 d'Opus 5.5), on pourrait tout basculer (repris slide 56)

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
fil : Intégrations
objectif : Des outils pour augmenter la productivité : d'où l'assistant de réunion en premier
piège : Penser que l'IA est magique : en souverain, ça demande de la veille et de l'adaptation
leçon : Malgré tout, on peut faire des choses impressionnantes en souverain

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

cette leçon reprend l'objectif annoncé à l'ouverture (slide 4) et prépare le message final

#### Compléments

—
