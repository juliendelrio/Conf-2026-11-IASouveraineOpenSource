# 4. Les moteurs d'inférence (4 min)

## our-engines
type : cartes
rubrique : Les moteurs
titre : Nos moteurs d'inférence
pied : Le modèle et le matériel orientent le choix du moteur

### vLLM
surligné : oui
badges : {testé: Testé}
- Notre moteur principal

### SGLang
badges : {testé: Testé}
- Ponctuellement : certains modèles y sont mieux servis

### MLX
badges : {extrapolé: Extrapolé}
- Sur Mac, un moteur dédié

#### Progression

arrivée : vLLM ; clic 1 : SGLang ; clic 2 : MLX ; clic 3 : le pied de slide

#### À l'oral

certains modèles sont mieux optimisés sur un moteur que sur l'autre, et le matériel joue aussi

#### Compléments

sur Mac, la vidéo citée à la slide 18 présente aussi Lithos et OMLX

## engine-cycle
type : étapes
rubrique : Les moteurs
titre : Un paysage qui bouge vite
pied : D'autres moteurs à suivre : llama.cpp, Ollama, TensorRT-LLM, MLX…

### Une optimisation apparaît
texte : Souvent sous la forme d’un nouveau moteur

### Les moteurs leaders l’intègrent
texte : Rapidement
surligné : oui

#### Progression

arrivée : une optimisation apparaît ; clic 1 : les moteurs leaders l'intègrent ; clic 2 : les autres moteurs à suivre

#### À l'oral

le cycle observé, d'où l'intérêt de la veille (slide suivante)

#### Compléments

le même cycle vaut pour les modèles : Flash-Next a d'abord tourné sur une image vLLM dédiée au modèle, avant que son support arrive dans une version stable (vLLM 0.30.0, adoptée le 25/09)

## engine-watch
type : chiffre
rubrique : Les moteurs
titre : La veille paie
badges : {testé: Mesuré}
chiffre : +11 %
légende : de vitesse de génération sur Qwen3.8-Flash-Next (180 → 200 tok/s), juste en passant à vLLM 0.30.0
pied : Même matériel, même modèle : seule la version du moteur a changé

#### Progression

arrivée : « +11 % » et sa légende ; clic 1 : le pied de slide

#### À l'oral

une simple mise à jour du moteur peut apporter un gain notable

#### Compléments (le vécu sur Blackwell, pour les questions)

- Fork ou upstream : avant Qwen, un autre gros MoE tournait sur ces cartes ; un fork communautaire de vLLM optimisé Blackwell a été essayé, puis un retour à vLLM 0.26, qui échouait faute de kernel
- Les cartes récentes sont moins bien servies : pas de réglages MoE fournis pour la RTX PRO 6000, compilations à la volée au premier passage de certaines formes de calcul
- Sans NVLink, un réglage par défaut ne convient pas : depuis vLLM 0.29, un nouvel algorithme d'échange entre cartes est actif par défaut ; il a fallu revenir à NCCL seul
- Décodage spéculatif MTP : 3 tokens proposés, 61 % d'acceptation, 2,8 tokens produits par passe

## engines-trio
type : trio
rubrique : Les moteurs
objectif : Tout simplement tester les modèles
piège : L'inférence, c'est très technique : se plonger dans la documentation devient utile pour tirer le meilleur de nos cartes
leçon : Faire de la veille : une mise à jour peut rapporter autant qu'un changement de matériel

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

_à compléter_

#### Compléments

voir les compléments de la slide 26
