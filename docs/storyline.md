# Storyline

Objectif : 40 à 45 min de contenu, le reste du créneau de 55 min pour les questions.

Retour d'expérience **global** : on s'appuie sur une expérience professionnelle réelle, mais sans nommer ni détailler l'entreprise (pas de noms internes, d'organigramme, de chiffres métier ou de cas clients identifiables).

## Fil rouge

**On construit la plateforme dans l'ordre où on l'a vraiment construite** : on déballe les cartes, on choisit comment faire tourner les modèles, on choisit les modèles, on les partage, puis les gens s'en servent. L'ordre chronologique et l'ordre de la stack (du plus bas niveau vers les utilisateurs) sont les mêmes, donc l'histoire avance naturellement.

Chaque chapitre suit le même schéma :

1. **Ce qu'on voulait faire**
2. **Le piège** (ce qui ne s'est pas passé comme prévu)
3. **Ce qu'on en retient** (une recommandation concrète pour le public)

**Ouverture et conclusion se répondent** : on commence par avouer que tout a été conçu avec l'aide de Claude. La conclusion y revient une fois : le recours par paliers (modèles internes, puis gros modèles hébergés en France, puis clouds US seulement quand il le faut) montre que se faire aider par Claude pour construire son IA souveraine n'a rien de contradictoire.

## Déroulé

| # | Partie | Durée |
|---|--------|-------|
| 0 | Ouverture : l'aveu | 2 min |
| 1 | Petit lexique | 5 min |
| 2 | Le matériel | 6 min |
| 3 | Les moteurs d'inférence | 6 min |
| 4 | Les modèles | 7 min |
| 5 | La plateforme LLM | 6 min |
| 6a | Usages : focus développeurs | 6 min |
| 6b | Usages : autres usages | 4 min |
| 7 | Conclusion | 3 min |
| | **Total** | **45 min** |

### 0. Ouverture : l'aveu

Le titre parle d'IA souveraine 100 % open source… et tout a été conçu avec l'aide de Claude, y compris ces slides. « Et globalement, je recommande. » Présentation rapide et promesse du talk.

### 1. Petit lexique

Les mots nécessaires pour suivre la suite, une métaphore par terme, pas de maths. Voir la liste plus bas.

### 2. Le matériel

**Première étape : louer avant d'acheter**

- Pour commencer, on a loué des L40S et des L4 chez Scaleway et OVH (hébergeurs français, donc déjà dans l'esprit souverain)
- C'est une excellente façon de tester toute la stack (moteur, plateforme, interface) malgré les limites de ces cartes, sans immobiliser de budget

**Aparté : des cartes pour les serveurs « traditionnels »**

Toutes les cartes ne demandent pas un serveur conçu pour l'IA. Certaines rentrent dans les serveurs qu'on a déjà, dès lors qu'ils ont un port PCIe libre. Utile pour des projets en full interne.

| Carte | Mémoire / bande passante | Format et alimentation | Pour quoi faire | Statut |
|---|---|---|---|---|
| **L4** (Ada, 2023) | 24 Go / 300 Go/s | 72 W, alimentée par le seul port PCIe (aucun connecteur), demi-hauteur, demi-longueur, une seule largeur de slot. Refroidissement passif : il faut le flux d'air d'un châssis serveur | Très petits LLM, stack RAG, modèles de décision de type « System One » comme Jev de TypeSafe AI (réponses typées : choix, score, oui/non ; triage, routage, modération). Source : https://www.eigent.ai/fr/blog/typesafe-ai-jev-system-one-models. Taille, licence et possibilité d'auto-hébergement non précisées (accès anticipé) : à vérifier | Vieillissante ; plus produite selon notre expérience mais encore trouvable. Pas d'avis de fin de vie officiel NVIDIA trouvé : dire « remplacée par la RTX PRO 4500 Server Edition » plutôt que « plus produite » |
| **RTX PRO 4500 Blackwell Server Edition** (2026) | 32 Go / 800 Go/s | 165 W via un connecteur PCIe 16 broches, pleine hauteur, pleine longueur, **une seule largeur de slot**, passive. MIG (jusqu'à 2 × 16 Go) et vGPU | La remplaçante de la L4 : à creuser pour des serveurs plus basiques, pas conçus pour l'IA | Actuelle. Ne pas confondre avec l'édition Workstation (200 W, double slot, ventilée, 896 Go/s) |
| **RTX PRO 2000 Blackwell** | 16 Go / 288 Go/s | 70 W, profil bas (demi-hauteur), double slot, ventilée ; pas « Server Edition » | À garder pour des tests ou de l'interne | Actuelle |
| **RTX PRO 4000 Blackwell SFF** | 24 Go / 432 Go/s | 70 W, profil bas (demi-hauteur), double slot, ventilée ; pas « Server Edition » | À garder pour des tests ou de l'interne | Actuelle |

Pour comparaison, la **L40S** louée au début : 48 Go / 864 Go/s, 350 W, pleine hauteur, double slot, passive.

**Ensuite : l'achat**

- 3 RTX 6000 Pro réparties sur 2 serveurs : un investissement coûteux, mais qui permet beaucoup de choses
- Tests sur Mac Studio : ça marche, mais l'écosystème NVIDIA reste le plus simple à exploiter

**Grille de lecture : les questions à se poser avant d'acheter**

| Question | Ce qui joue | Ce que ça dimensionne |
|---|---|---|
| Est-ce que ça tourne ? | Drivers et écosystème logiciel (CUDA, ROCm, Metal), parfois une compilation dédiée du modèle pour la carte | Le temps passé à faire marcher les choses |
| Est-ce que ça tient ? | VRAM | La taille du modèle + le KV cache (longueur des conversations, utilisateurs simultanés) |
| Est-ce que ça va vite pour écrire ? | Bande passante mémoire | La vitesse de génération : pour chaque token, la carte relit tous les poids |
| Est-ce que ça va vite pour lire ? | Puissance de calcul | La vitesse de lecture du prompt (là où Mac et petites machines décrochent le plus) ; prépare le chapitre usages développeurs |
| Est-ce que les cartes se parlent bien ? | **NVLink** vs PCIe vs réseau entre serveurs | La possibilité de répartir un modèle sur plusieurs cartes (tensor parallelism) sans s'effondrer. **Point essentiel** : les RTX 6000 Pro n'ont pas de NVLink, et passer d'un serveur à l'autre par le réseau est lent |

**Le réflexe à retenir** : bande passante ÷ taille des poids lus par token = plafond de vitesse pour un utilisateur seul. Un bon moteur atteint environ 80 % de ce plafond. Seul le décodage spéculatif permet de le dépasser (voir chapitre moteurs).

**Exemples de matériel**

Deux modèles de référence (vérifiés sur Hugging Face le 17/10/2026) :

| | [Qwen3.8-27B](https://hf.co/Qwen/Qwen3.8-27B) | [Qwen3.8-Flash-Next](https://hf.co/Qwen/Qwen3.8-Flash-Next) |
|---|---|---|
| Sortie | 5 août 2026 | 24 août 2026 |
| Type | Dense : tous les poids servent à chaque token | MoE : 512 experts, 10 + 1 partagé actifs par token |
| Paramètres | 27B | 125B dont **6B actifs**, + 51B d'embeddings n-gram + 4B de MTP |
| Poids BF16 / FP8 officiels | ~56 Go / ~31 Go | ~357 Go / ~186 Go |
| En 4 bits | ~16 Go (chiffre de la vidéo, cohérent avec 27B × 0,5 octet + embeddings) | non calculé |
| Lu par token (FP8) | ~27 Go (≈ 16 Go en 4 bits) | ~6 Go : seuls les paramètres actifs sont relus |
| KV cache (BF16) | ~64 Kio par token : seule 1 couche sur 4 a une attention complète. Contexte complet de 262k tokens ≈ 16 Gio par conversation | ~24 Kio par token (12 couches d'attention complète, 2 têtes KV), ≈ 6 Gio pour 262k tokens |
| Licence | Apache 2.0 | **Licence propriétaire « Qwen Community 1.0 »** (open weights, pas open source) |
| Particularité | | Architecture expérimentale, aperçu de Qwen4 : nécessite un moteur récent qui la supporte |

Sur deux RTX 6000 Pro (2 × 96 = 192 Go), le Flash Next en FP8 (~186 Go) ne tient qu'au chausse-pied : il ne reste presque rien pour le KV cache. Comment on le fait tenir (quantization plus agressive, embeddings n-gram déportés en RAM comme le suggère la fiche, …) : _à compléter_. Bon exemple de VRAM qui dimensionne tout, et de modèle réparti sur deux cartes sans NVLink.

Plafonds de vitesse pour un utilisateur seul = bande passante ÷ poids lus par token. Specs vérifiées sur les fiches constructeurs le 17/10/2026 (sources en fin de section). Puissance de calcul : FP16 dense, accumulation FP32, quand le constructeur la publie.

| Machine | Mémoire max | Bande passante | Calcul FP16 dense | NVLink | Qwen3.8-27B en 4 bits (16 Go lus/token) | Qwen3.8-Flash-Next en FP8 (6 Go lus/token, 186 Go à loger) |
|---|---|---|---|---|---|---|
| AMD Ryzen AI Max+ 395 | 128 Go | 256 Go/s | ~60 TFLOPS (base non précisée) | non | ~16 tok/s | ne tient pas |
| NVIDIA DGX Spark (GB10) | 128 Go | 273 Go/s | non publié | non (réseau 200 Gb/s) | ~17 tok/s | ne tient pas |
| Apple M5 Max 40 cœurs GPU | 128 Go | 614 Go/s | non publié | non | ~38 tok/s | ne tient pas |
| Apple M5 Ultra (Mac Studio, sorti en sept. 2026) | 512 Go | 1,2 To/s | non publié | non | ~75 tok/s | ~200 tok/s |
| RTX PRO 2000 Blackwell | 16 Go | 288 Go/s | non publié | non | ne tient pas (16 Go de poids pour 16 Go de VRAM) | ne tient pas |
| L4 | 24 Go | 300 Go/s | ~121 TFLOPS | non | ~19 tok/s | ne tient pas |
| RTX PRO 4000 Blackwell SFF | 24 Go | 432 Go/s | non publié | non | ~27 tok/s | ne tient pas |
| RTX PRO 4500 Blackwell Server Edition | 32 Go | 800 Go/s | ~200 TFLOPS (déduit, base non précisée) | non | ~50 tok/s | ne tient pas |
| L40S | 48 Go | 864 Go/s | 362 TFLOPS | non | ~54 tok/s | ne tient pas |
| RTX 4090 | 24 Go | 1 008 Go/s | 165 TFLOPS | non | ~63 tok/s | ne tient pas |
| RTX 5090 | 32 Go | 1 792 Go/s | 210 TFLOPS | non | ~112 tok/s | ne tient pas |
| **RTX PRO 6000 Blackwell (Workstation)** | **96 Go** | **1 792 Go/s** | **504 TFLOPS** | **non** | **~112 tok/s** | **2 cartes : tient tout juste, ~300 tok/s théoriques** (plus si la lecture est répartie sur les deux cartes, moins à cause des échanges en PCIe sans NVLink) |
| RTX PRO 6000 Blackwell (Server Edition) | 96 Go | **1 597 Go/s** | ~500 TFLOPS | non | ~100 tok/s | 2 cartes : tient tout juste, ~265 tok/s théoriques |
| H100 SXM | 80 Go | 3,35 To/s | 990 TFLOPS | oui, 900 Go/s | ~210 tok/s | ne tient pas sur une carte |
| H200 SXM | 141 Go | 4,8 To/s | 990 TFLOPS | oui, 900 Go/s | ~300 tok/s | ne tient pas sur une carte |
| B200 (HGX) | 180 Go | 8 To/s | 2 250 TFLOPS | oui, 1,8 To/s | ~500 tok/s | ne tient pas sur une carte (186 > 180 Go) |

Notes :

- Quelle édition de RTX PRO 6000 avons-nous (Workstation, Max-Q ou Server) ? _à compléter_. La Server Edition a 11 % de bande passante en moins
- NVLink : NVIDIA ne le mentionne pour aucune édition de la RTX PRO 6000 ; les fiches GeForce (4090, 5090) disent explicitement « non »
- Apple ne publie pas la puissance de calcul de ses puces : c'est justement ce qui limite la lecture du prompt
- Le M5 Max 32 cœurs GPU (460 Go/s) est limité à 36 Go : il faut la version 40 cœurs pour 128 Go
- Les chiffres « AI TOPS » des fiches GeForce et RTX PRO sont en FP4 ou FP8 *avec sparsité* : 2 à 4 fois les chiffres utiles en pratique

Messages :

- La bande passante varie d'un facteur 30 entre une machine de bureau et un GPU de datacenter ; la puissance de calcul d'un facteur 40
- On ne maximise pas à la fois mémoire et vitesse sans payer cher (Mac et DGX Spark : beaucoup de mémoire mais lents ; 5090 : rapide mais tient peu) ; la RTX 6000 Pro est le compromis entre les deux
- Le MoE change la donne : un modèle 5 fois plus gros que le 27B va presque 3 fois plus vite, parce qu'il relit 6 Go par token au lieu de 16. En contrepartie, il faut pouvoir le loger en entier
- L'architecture compte aussi pour la mémoire : grâce à l'attention hybride, le KV cache de ces modèles est plusieurs fois plus petit qu'avec une attention classique

Visuel envisagé : graphique en barres animé des plafonds de vitesse, même modèle sur toutes les machines.

Source : vidéo sur Lithos Metal et le plafond de bande passante, https://youtu.be/L7noXCBSObc. Le chiffre de 614 Go/s pour le M5 Max et l'exemple du Qwen 3.8 27B en viennent.

Sources matériel :

- RTX PRO 6000 : https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-6000/ , https://www.nvidia.com/en-us/data-center/rtx-pro-6000-blackwell-server-edition/ , livre blanc https://www.nvidia.com/content/dam/en-zz/Solutions/design-visualization/quadro-product-literature/NVIDIA-RTX-Blackwell-PRO-GPU-Architecture-v1.0.pdf
- RTX 5090 et 4090 : https://images.nvidia.com/aem-dam/Solutions/geforce/blackwell/nvidia-rtx-blackwell-gpu-architecture.pdf
- H100 / H200 : https://www.nvidia.com/en-us/data-center/h100/ , https://www.nvidia.com/en-us/data-center/h200/
- B200 : https://docs.nvidia.com/enterprise-reference-architectures/hgx-ai-factory-h100-h200-b200/latest/components.html
- DGX Spark : https://www.nvidia.com/en-us/products/workstations/dgx-spark/
- Ryzen AI Max+ 395 : https://www.amd.com/en/products/processors/desktops/ryzen/ryzen-ai-halo/ryzen-ai-max-plus-395.html
- Mac Studio M5 Ultra : https://www.apple.com/mac-studio/specs/
- M5 Max : https://www.apple.com/macbook-pro/specs/
- L4 : https://www.nvidia.com/en-us/data-center/l4/ , fiche produit https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/l4/PB-11316-001_v01.pdf
- L40S : https://www.nvidia.com/en-us/data-center/l40s/
- RTX PRO 4500 Server Edition : https://www.nvidia.com/en-us/data-center/rtx-pro-4500-blackwell-server-edition/
- RTX PRO 4500 Workstation : https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-4500/
- RTX PRO 2000 : https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-2000/
- RTX PRO 4000 SFF : https://www.nvidia.com/en-us/products/workstations/professional-desktop-gpus/rtx-pro-4000-sff/

- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 3. Les moteurs d'inférence

- vLLM et SGLang, les deux moteurs utilisés
- Un paysage qui bouge vite : on cite d'autres moteurs (llama.cpp, Ollama, TensorRT-LLM, MLX, …)
- Le cycle observé : une optimisation apparaît, souvent sous la forme d'un nouveau moteur, puis les moteurs « leaders » l'intègrent rapidement
- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 4. Les modèles

- Les modèles testés
- Leur évolution ces derniers mois
- **Août 2026 : l'étape franchie.** Sortent DeepSeek-V4-Flash-0731 et Qwen3.8-Flash-Next : ils tournent sur 2 RTX 6000 Pro avec des performances autour de Claude Opus 4.6 à 4.8. Ce sont les premiers modèles vraiment utilisables en contexte d'entreprise pour des tâches générales, codage compris, sans avoir besoin d'un cluster de H200. C'est le tournant de l'histoire : y faire référence aussi dans les chapitres plateforme et usages

| | [DeepSeek-V4-Flash-0731](https://hf.co/deepseek-ai/DeepSeek-V4-Flash-0731) | [Qwen3.8-Flash-Next](https://hf.co/Qwen/Qwen3.8-Flash-Next) |
|---|---|---|
| Sortie | 31 juillet 2026 | 24 août 2026 |
| Paramètres | MoE 284B, 13B actifs | MoE 125B, 6B actifs (+ 51B d'embeddings n-gram, 4B de MTP) |
| Poids officiels | ~167 Go (experts en précision réduite + FP8) | ~186 Go en FP8 |
| Licence | MIT | Licence propriétaire « Qwen Community 1.0 » |
| Comparaison publiée par l'éditeur | Terminal Bench 2.1 : 82,7 contre 85,0 pour Opus 4.8 | Comparé à Opus 4.6 Max dans la fiche |
| Décodage spéculatif intégré | Oui : module DSpark (le « brouillon » de la vidéo Lithos), activable dans vLLM et SGLang | MTP |

Les deux tiennent tout juste dans 192 Go : la VRAM restante pour le KV cache est le vrai sujet (lien avec le chapitre matériel). Benchmarks publiés par les éditeurs eux-mêmes : à présenter comme tels.

Également sortis en août : Qwen3.8-27B (le 5), qui tient sur une seule carte (Terminal Bench 2.1 : 73,0 contre 78,2 pour Opus 4.6 Max selon la fiche), et Qwen3.8-2.4T-A95B (le 8)
- Open weights ≠ open source : le 27B est sous Apache 2.0, le Flash-Next sous licence propriétaire « Qwen Community 1.0 »
- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 5. La plateforme LLM

- Consommer les modèles presque aussi simplement que sur les plateformes des géants américains
- Passerelle unique compatible OpenAI (LiteLLM), interface de chat (Open WebUI)
- Recours aux modèles par paliers : internes, puis hébergés en France, puis clouds US si besoin
- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 6a. Usages : focus développeurs

- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 6b. Usages : autres usages

- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 7. Conclusion

- Retour sur l'aveu du début : Claude, c'est le palier 3, utilisé là où il apporte le plus
- Les recommandations à retenir (une par chapitre)
- Ressources et contact

## Petit lexique

- **Inférence** : utiliser un modèle déjà entraîné (par opposition à l'entraînement)
- **Paramètres / poids** : ce qu'un modèle « sait », sous forme de nombres ; la taille d'un modèle (7B, 32B, 235B…)
- **Open weights vs open source** : on récupère les poids, pas forcément les données ni le code d'entraînement
- **Quantization** : compresser les poids (16 bits, 8 bits, 4 bits) pour faire tenir le modèle en mémoire, au prix d'un peu de qualité
- **Token** : l'unité de texte que le modèle lit et produit ; c'est l'unité des débits et des prix
- **VRAM** : la mémoire de la carte graphique, la vraie ressource rare
- **Fenêtre de contexte / KV cache** : pourquoi la longueur des conversations consomme de la mémoire
- **MoE (Mixture of Experts)** : un gros modèle dont seule une partie travaille pour chaque token
- **Batching continu** : servir plusieurs utilisateurs en même temps sur la même carte
- **Tensor parallelism** : répartir un modèle sur plusieurs GPU
- **API compatible OpenAI** : le standard de fait pour brancher les outils
- **Agentique** : un modèle qui enchaîne des actions (lire, exécuter, corriger) au lieu de répondre une seule fois

Candidats proposés au fil de la conception des slides (à valider) :

- **Bande passante mémoire** : la vitesse à laquelle la carte relit les poids ; fixe la vitesse de génération
- **NVLink** : la liaison rapide entre GPU NVIDIA, absente des RTX 6000 Pro
- **Décodage spéculatif** : un petit modèle brouillon propose plusieurs tokens, le gros les vérifie en une seule lecture
- **Lecture du prompt / génération** (*prefill* / *decode*) : deux phases limitées par des ressources différentes (calcul / bande passante)
- **Tokens de réflexion** (mode *thinking*) : ce que le modèle écrit pour « réfléchir » avant de répondre, et qui coûte du temps
