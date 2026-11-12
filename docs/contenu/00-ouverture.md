# 0. Ouverture (3 min 45)

## title
type : titre
titre : Une plateforme IA à la demande, ==100 % souveraine==, avec des outils open source
sous-titre : Du GPU local au cloud français
signature : Julien Del Rio · Capitole du Libre 2026

#### Progression

pas de clic, tout apparaît à l'arrivée

#### À l'oral

présentation rapide de l'orateur. « À la demande », c'est la traduction de « as a Service » : les modèles servis comme un service

#### Compléments

choisir le thème avant de commencer (touche `d` ou bouton), plein écran avec `f`

## confession
type : aveu
- Un talk sur une IA ==100 % souveraine==, avec des outils open source…
- entièrement conçu avec l'aide de **Claude**, ces slides comprises.
- ==Cynique, mais opérationnel et efficace.==

#### Progression

arrivée : « Un talk sur une IA 100 % souveraine, avec des outils open source… » ; clic 1 : « entièrement conçu avec l'aide de Claude, ces slides comprises. » ; clic 2 : « Cynique, mais opérationnel et efficace. »

#### À l'oral

l'aveu, sur un ton léger et honnête, en ménageant l'effet à chaque clic. Ce n'est pas un running gag : on n'y revient qu'une fois, en conclusion (slide 57)

#### Compléments

la conclusion explique pourquoi ce n'est pas contradictoire (Claude = palier 3)

## dependency
type : animation
scène : coupure
rubrique : L'enjeu
titre : Tout passe par un seul fournisseur
- Chat, code, intégrations : tout part vers une API américaine
- Et si demain on vous coupe l'accès ?
- Et si demain on vous coupe l'accès, ou si les prix doublent ?

### Nos usages
texte : Chat, code, intégrations

### Un cloud US
texte : Une API, un fournisseur
détail : Prix × 2

#### Progression

arrivée : les requêtes partent vers le cloud US ; clic 1 : « Et si demain on vous coupe l'accès ? », l'accès est coupé ; clic 2 : la question complète, « … ou si les prix doublent ? », le prix double

#### À l'oral

la situation de beaucoup d'équipes aujourd'hui. Laisser l'animation parler, et poser la question au public : laisser un temps. Tout le talk y répond ; la même scène revient en conclusion, avec la réponse (slide 58)

#### Compléments

Illustration en motion design, pas une mesure ni un incident vécu. Issue #6

## promise
type : cartes
rubrique : La promesse
titre : Une IA 100 % souveraine, c'est possible dès maintenant
pied : Pas le très haut de gamme, mais on fait déjà des choses très bien : c'est le sujet du talk

### En interne
valeur : 50 – 70 k€
légende : d'investissement

### En location
valeur : 0,5 – 9 k€ / mois
légende : chez OVH ou Scaleway

#### Progression

arrivée : la carte « En interne » ; clic 1 : la carte « En location » ; clic 2 : le pied de slide

#### À l'oral

l'objectif du talk, démontrer qu'on peut dès maintenant avoir une IA 100 % souveraine et faire des choses vraiment bien avec. « Possible à 100 % » : le palier 3 (clouds US) reste un choix, pas une dépendance. Dire une fois ce qu'on entend par souveraineté : les données et les modèles restent chez nous ou chez des hébergeurs français, et on peut continuer à fonctionner seuls. Ce qui reste une dépendance : NVIDIA pour les cartes, et des modèles publiés par des éditeurs chinois. Donner les ordres de grandeur du budget dès le départ : en location, on commence petit, une L4 suffit pour du RAG ou de la transcription (500 – 600 €), une L40S fait tourner le 27B (1 000 – 1 100 €) ; pour Flash-Next, il faut l'équivalent de nos 2 RTX PRO 6000 (3 900 – 9 300 €). En interne, les 50 – 70 k€ correspondent à ces 2 RTX PRO 6000

#### Compléments

le détail par catégorie de modèles est à la slide 26. Location : L4 500 – 600 €, L40S 1 000 – 1 100 € ; pas de RTX PRO 6000 au catalogue d'OVH ni de Scaleway, l'équivalent pour Flash-Next va de 2 × H100 (3 900 – 4 800 €, très peu de KV cache) à 4 × H100 (7 800 – 9 300 €), extrapolé

## august
type : étapes
rubrique : Pourquoi maintenant
titre : Août 2026, le cap franchi
badges : {testé: Testé} {extrapolé: Niveau Opus : selon les éditeurs}
numérotées : non
pied : Les premiers modèles utilisables en entreprise, codage compris, sans cluster de H200

### 31 juillet
texte : DeepSeek-V4-Flash-0731
détail : Sur 2 cartes, niveau Opus

### 5 août
texte : Qwen3.8-27B
détail : Plus petit, niveau Haiku à Sonnet

### 13 août
texte : DeepSeek Harness
détail : Les outils suivent

### 24 août
texte : Qwen3.8-Flash-Next
détail : Sur 2 cartes, lui aussi
surligné : oui

#### Progression

frise : arrivée sur le 31 juillet ; clics 1 à 3 : le 5 août (Qwen3.8-27B), le 13 août (DeepSeek Harness), puis le 24 août ; clic 4 : le pied de slide

#### À l'oral

c'est l'accroche du talk, à placer tôt. Plus besoin d'un cluster de H200 pour des tâches générales. Août, ce n'est pas seulement de meilleurs modèles, ce sont aussi les outils pour les exploiter. Le « niveau Opus » vient des comparaisons des éditeurs et de notre ressenti d'usage ; sur les tâches les plus exigeantes, Claude reste utilisé (slide 51). Le harness, c'est l'application autour du modèle (ses outils, ses prompts) : on y revient au chapitre usages

#### Compléments

- Comparaisons publiées par les éditeurs, à présenter comme telles : DeepSeek-V4-Flash-0731, Terminal Bench 2.1 82,7 contre 85,0 pour Opus 4.8 ; Flash-Next comparé à Opus 4.6 Max dans sa fiche
- DeepSeek Harness a été publié dans la foulée de DeepSeek-V4-Flash-0731 comme démonstrateur de code (dépôt créé le 13 août 2026)
- Également sortis en août : Qwen3.8-27B (le 5 ; Terminal Bench 2.1 : 73,0 contre 78,2 pour Opus 4.6 Max selon la fiche) et Qwen3.8-2.4T-A95B (le 8)

## thread
type : étapes
rubrique : Le fil rouge
titre : Dans l'ordre où il faut se poser les questions
pied : Pour chaque étape : ce qu'on voulait faire, le piège, ce qu'on en retient

### Les modèles
texte : La finalité : ce qu’on veut faire tourner
surligné : oui

### Le matériel
texte : Ce que le budget permet

### Les moteurs
texte : Comment faire tourner les modèles

### La plateforme
texte : Comment les partager

### Les usages
texte : Ce que les gens en font

#### Progression

arrivée : les modèles ; clics 1 à 4 : le matériel, les moteurs, la plateforme, les usages ; clic 5 : le pied de slide

#### À l'oral

on avance dans l'ordre où il faut se poser les questions. On commence par la finalité, les modèles : on fixe un budget, on le met en rapport avec les catégories de modèles, et on regarde quel matériel ce budget permet. Ensuite on remonte la stack jusqu'aux utilisateurs. Chaque chapitre se termine par le même trio

#### Compléments

premiers essais fin 2025, puis 4 mois de POC, puis 2 mois de production auprès d'early adopters ; retour d'expérience générique, sans nommer l'entreprise
