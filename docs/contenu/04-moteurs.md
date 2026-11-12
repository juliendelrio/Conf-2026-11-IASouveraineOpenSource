# 4. Les moteurs d'inférence (4 min)

## chapter-engines
type : intercalaire
chiffre : 3
titre : Les moteurs
- Les modèles
- Le matériel
- ==Les moteurs==
- La plateforme
- Les usages

#### Progression

pas de clic : l'intercalaire s'affiche puis on passe

#### À l'oral

rien, ou juste le nom du chapitre

## our-engines
type : cartes
rubrique : Les moteurs
titre : Nos moteurs d'inférence, et un petit nouveau
pied : Et aussi : llama.cpp, Ollama, LM Studio, TensorRT-LLM, LMDeploy…

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

### DeepInfer
badges : {extrapolé: Non testé}
- Le petit nouveau de DeepSeek, open source
- Nativement compatible Huawei Ascend

#### Progression

arrivée : vLLM ; clic 1 : SGLang ; clic 2 : MLX ; clic 3 : DeepInfer ; clic 4 : les autres moteurs

#### À l'oral

le modèle et le matériel orientent le choix du moteur : certains modèles sont mieux optimisés sur un moteur que sur l'autre, et le matériel joue aussi. DeepInfer, le petit nouveau : le moteur de l'API de DeepSeek, ouvert en octobre, et nativement compatible avec les puces Huawei Ascend ; un signe de plus que la concurrence à NVIDIA s'organise (slide 23). Mais il ne sert qu'un modèle et ne cible que les cartes de datacenter, pas les nôtres. Inférence : exécuter un modèle déjà entraîné pour obtenir des réponses, par opposition à l'entraînement

#### Compléments

- sur Mac, la vidéo sur la bande passante (annexe de la storyline) présente aussi Lithos et OMLX
- DeepInfer (dépôt deepseek-ai/DeepInfer, lu le 05/11/2026) : Apache 2.0, ouvert vers le 20/10/2026, le moteur derrière l'API de DeepSeek, construit au départ sur vLLM. Un seul modèle, DeepSeek-V4.1-Flash-1017 ; matériel : GPU NVIDIA SM100 (B200, B300) avec CUDA 13, et Huawei Ascend 950 avec CANN 9.2. Inférence hors ligne seulement dans cette version : le système de KV cache, la séparation lecture / écriture et la répartition de charge ne sont pas publiés. Nos RTX PRO 6000 ne sont pas dans la liste
- Les autres : llama.cpp (C/C++, formats GGUF, CPU et toutes cartes), Ollama et LM Studio (outils de poste de travail autour de llama.cpp), TensorRT-LLM (NVIDIA), LMDeploy (InternLM)

## engine-cycle
type : étapes
rubrique : Les moteurs
titre : Un paysage qui bouge vite

### Une optimisation apparaît
texte : Souvent sous la forme d’un nouveau moteur

### Les moteurs leaders l’intègrent
texte : Rapidement
surligné : oui

#### Progression

arrivée : une optimisation apparaît ; clic 1 : les moteurs leaders l'intègrent

#### À l'oral

le cycle observé, d'où l'intérêt de la veille (slide suivante)

#### Compléments

le même cycle vaut pour les modèles : Flash-Next a d'abord tourné sur une image vLLM dédiée au modèle, avant que son support arrive dans une version stable (vLLM 0.30.0, adoptée le 25/09)

## engine-watch
type : cartes
rubrique : Les moteurs
titre : La veille paie
pied : Même matériel : une nouvelle version du moteur ou du modèle suffit

### Les versions du moteur
valeur : +11 %
légende : de vitesse de génération
badges : {testé: Mesuré}
- Qwen3.8-Flash-Next : 180 → 200 tok/s
- Juste en passant à vLLM 0.30.0

### Les modèles quantizés
valeur : 31 → 22 Go
légende : pour des scores très proches
badges : {testé: Tourne chez nous} {extrapolé: Scores : NVIDIA}
- Qwen3.8-27B en NVFP4, publié par NVIDIA
- Seulement sur Blackwell, comme nos cartes

#### Progression

arrivée : les versions du moteur, « +11 % » ; clic 1 : les modèles quantizés, « 31 → 22 Go » ; clic 2 : le pied de slide

#### À l'oral

une simple mise à jour du moteur peut apporter un gain notable. La veille vaut aussi pour les modèles : des versions quantizées sortent après le modèle d'origine, publiées par exemple par NVIDIA ou Unsloth sur Hugging Face. Des modèles bien plus petits pour des performances très proches : de quoi tenir sur moins de cartes, ou laisser plus de place au KV cache (la quantization de la slide 13). Exemple, testé chez nous : NVIDIA a publié Qwen3.8-27B en NVFP4, ~22 Go au lieu de ~31 en FP8, pour des scores très proches (ceux publiés par NVIDIA, on ne les a pas remesurés) ; mais ce format 4 bits ne tourne que sur la génération Blackwell, comme nos RTX PRO 6000. Pourquoi 22 Go et pas les 16 Go de la slide 13 : NVFP4 ne passe pas tout en 4 bits, l'attention reste en FP8

#### Compléments (le vécu sur Blackwell, pour les questions)

- Fork ou upstream : avant Qwen, un autre gros MoE tournait sur ces cartes ; un fork communautaire de vLLM optimisé Blackwell a été essayé, puis un retour à vLLM 0.26, qui échouait faute de kernel
- Les cartes récentes sont moins bien servies : pas de réglages MoE fournis pour la RTX PRO 6000, compilations à la volée au premier passage de certaines formes de calcul
- Sans NVLink, un réglage par défaut ne convient pas : depuis vLLM 0.29, un nouvel algorithme d'échange entre cartes est actif par défaut ; il a fallu revenir à NCCL seul
- Décodage spéculatif MTP : 3 tokens proposés, 61 % d'acceptation, 2,8 tokens produits par passe
- nvidia/Qwen3.8-27B-NVFP4 (Hugging Face, lu le 05/11/2026) : publié en septembre 2026, Apache 2.0, NVFP4 pour les couches MLP et la tête de sortie, FP8 pour l'attention ; ~21,9 Go de poids (~54 Go en BF16) ; matériel supporté : Blackwell seulement ; vLLM et SGLang. Scores publiés par NVIDIA, BF16 → NVFP4 : GPQA Diamond 88,9 → 88,0, Terminal-Bench 75,6 → 74,0, IFBench 80,1 → 78,9. Unsloth publie aussi une version NVFP4 (unsloth/Qwen3.8-27B-NVFP4), pas vérifiée. Testé chez nous (d'après l'orateur) ; les scores sont ceux de NVIDIA

## engines-trio
type : trio
rubrique : Les moteurs
objectif : Tout simplement tester les modèles
piège : L'inférence, c'est très technique : se plonger dans la documentation devient utile pour tirer le meilleur de nos cartes
leçon : Faire de la veille : une mise à jour peut apporter un gain notable, sans changer de matériel

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

deux histoires vécues, 20 secondes chacune. Le fork : avant Qwen, un autre gros MoE tournait sur ces cartes ; on a essayé un fork communautaire de vLLM optimisé Blackwell, puis on est revenu à vLLM upstream. Le réglage par défaut : depuis vLLM 0.29, un nouvel algorithme d'échange entre cartes est actif par défaut ; sans NVLink, il ne convenait pas, il a fallu revenir à NCCL seul

#### Compléments

voir les compléments de la slide 31
