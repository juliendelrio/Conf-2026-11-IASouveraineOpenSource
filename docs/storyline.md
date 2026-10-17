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

**Exemples de matériel** (chiffres de mémoire, à vérifier sur les fiches constructeurs avant de les mettre sur une slide)

Deux modèles de référence (vérifiés sur Hugging Face le 17/10/2026) :

| | [Qwen3.8-27B](https://hf.co/Qwen/Qwen3.8-27B) | [Qwen3.8-Flash-Next](https://hf.co/Qwen/Qwen3.8-Flash-Next) |
|---|---|---|
| Sortie | 5 août 2026 | 24 août 2026 |
| Type | Dense : tous les poids servent à chaque token | MoE : 512 experts, 10 + 1 partagé actifs par token |
| Paramètres | 27B | 125B dont **6B actifs**, + 51B d'embeddings n-gram + 4B de MTP |
| Poids BF16 / FP8 officiels | ~56 Go / ~31 Go | ~357 Go / ~184 Go |
| En 4 bits | ~16 Go (chiffre de la vidéo, cohérent avec 27B × 0,5 octet + embeddings) | non calculé |
| Lu par token (FP8) | ~27 Go (≈ 16 Go en 4 bits) | ~6 Go : seuls les paramètres actifs sont relus |
| KV cache (BF16) | ~64 Kio par token : seule 1 couche sur 4 a une attention complète. Contexte complet de 262k tokens ≈ 16 Gio par conversation | ~24 Kio par token (12 couches d'attention complète, 2 têtes KV), ≈ 6 Gio pour 262k tokens |
| Licence | Apache 2.0 | **Licence propriétaire « Qwen Community 1.0 »** (open weights, pas open source) |
| Particularité | | Architecture expérimentale, aperçu de Qwen4 : nécessite un moteur récent qui la supporte |

Sur deux RTX 6000 Pro (2 × 96 = 192 Go), le Flash Next en FP8 (~184 Go) ne tient qu'au chausse-pied : il ne reste presque rien pour le KV cache. Comment on le fait tenir (quantization plus agressive, embeddings n-gram déportés en RAM comme le suggère la fiche, …) : _à compléter_. Bon exemple de VRAM qui dimensionne tout, et de modèle réparti sur deux cartes sans NVLink.

Plafonds de vitesse pour un utilisateur seul = bande passante ÷ poids lus par token. Les specs des machines sont de mémoire, à vérifier sur les fiches constructeurs.

| Machine | Mémoire | Bande passante | Qwen3.8-27B en 4 bits (16 Go lus/token) | Qwen3.8-Flash-Next en FP8 (6 Go lus/token, 184 Go à loger) |
|---|---|---|---|---|
| AMD Ryzen AI Max+ 395 / DGX Spark | 128 Go | ~250 Go/s | ~16 tok/s | ne tient pas |
| M5 Max 40 cœurs | jusqu'à 128 Go | 614 Go/s | ~38 tok/s | ne tient pas |
| Mac Studio M3 Ultra | jusqu'à 512 Go | ~800 Go/s | ~50 tok/s | ~130 tok/s |
| RTX 4090 | 24 Go | ~1 To/s | ~60 tok/s | ne tient pas |
| RTX 5090 | 32 Go | ~1,8 To/s | ~110 tok/s | ne tient pas |
| **RTX 6000 Pro** | **96 Go** | **~1,8 To/s** | **~110 tok/s** | **2 cartes : tient tout juste, ~300 tok/s théoriques** (plus si la lecture est répartie sur les deux cartes, moins à cause des échanges en PCIe sans NVLink) |
| H100 / H200 | 80 / 141 Go | 3,3 / 4,8 To/s | ~200 / 300 tok/s | ne tient pas sur une carte |
| B200 | 192 Go | ~8 To/s | ~500 tok/s | tient tout juste, ~1 300 tok/s |

Messages :

- La bande passante varie d'un facteur 30 entre une machine de bureau et un GPU de datacenter
- On ne maximise pas à la fois mémoire et vitesse sans payer cher (Mac et DGX Spark : beaucoup de mémoire mais lents ; 5090 : rapide mais tient peu) ; la RTX 6000 Pro est le compromis entre les deux
- Le MoE change la donne : un modèle 5 fois plus gros que le 27B va presque 3 fois plus vite, parce qu'il relit 6 Go par token au lieu de 16. En contrepartie, il faut pouvoir le loger en entier
- L'architecture compte aussi pour la mémoire : grâce à l'attention hybride, le KV cache de ces modèles est plusieurs fois plus petit qu'avec une attention classique

Visuel envisagé : graphique en barres animé des plafonds de vitesse, même modèle sur toutes les machines.

Source : vidéo sur Lithos Metal et le plafond de bande passante, _lien à compléter_. Le chiffre de 614 Go/s pour le M5 Max et l'exemple du Qwen 3.8 27B en viennent.

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
- Août 2026 : l'étape franchie, et pourquoi : _à compléter_. Piste relevée sur Hugging Face, à confirmer : toute la famille Qwen3.8 sort ce mois-là (27B le 5, 2.4T-A95B le 8, FP8 le 13, Flash-Next le 24). La fiche du 27B le compare à Claude Opus 4.6 Max sur du code agentique (Terminal Bench 2.1 : 73,0 contre 78,2), soit un modèle qui tient sur une seule carte presque au niveau des modèles de pointe
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
