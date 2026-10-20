# Storyline

Objectif : 40 à 45 min de contenu, le reste du créneau de 55 min pour les questions.

Retour d'expérience **global** : on s'appuie sur une expérience professionnelle réelle, mais sans nommer ni détailler l'entreprise (pas de noms internes, d'organigramme, de chiffres métier ou de cas clients identifiables).

## Fil rouge

**On avance dans l'ordre où il faut se poser les questions** : on commence par la finalité, les modèles, parce que c'est ce qu'on veut faire tourner. On fixe un budget, on le met en rapport avec les catégories de modèles, et on regarde quel matériel ce budget permet. Viennent ensuite comment faire tourner les modèles (moteurs), comment les partager (plateforme), puis ce que les gens en font (usages). Après les modèles, on remonte la stack du plus bas niveau vers les utilisateurs.

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
| 2 | Les modèles | 7 min |
| 3 | Le matériel | 6 min |
| 4 | Les moteurs d'inférence | 6 min |
| 5 | La plateforme LLM | 6 min |
| 6a | Usages : le chat généraliste | 3 min |
| 6b | Usages : les développeurs | 4 min |
| 6c | Usages : les intégrations sur mesure | 3 min |
| 7 | Conclusion | 3 min |
| | **Total** | **45 min** |

### 0. Ouverture : l'aveu

Le titre parle d'IA souveraine 100 % open source… et tout a été conçu avec l'aide de Claude, y compris ces slides. « Et globalement, je recommande. » Présentation rapide et promesse du talk.

**L'objectif** : démontrer qu'on peut dès maintenant avoir une IA 100 % souveraine et faire des choses vraiment bien avec.

**Les ordres de grandeur du budget** :

- En interne : entre 50 et 70 k€ d'investissement
- En location chez OVH ou Scaleway : entre 2 et 5 k€ par mois

On n'est pas dans le très haut de gamme, mais on peut déjà faire des choses très bien avec ces cartes : c'est justement le sujet du talk.

### 1. Petit lexique

Les mots nécessaires pour suivre la suite, une métaphore par terme, pas de maths. Voir la liste plus bas.

### 2. Les modèles

**Pourquoi commencer par les modèles** : c'est la finalité. Avant de parler cartes et serveurs, il faut savoir ce qu'on veut faire tourner. La démarche proposée : fixer un budget, le mettre en rapport avec les catégories de modèles, puis voir quel matériel ce budget permet (chapitre suivant).

**Août 2026, le cap franchi** (à placer dès le début du chapitre : c'est l'accroche du talk) : des modèles au niveau des meilleurs modèles fermés tiennent désormais sur 2 cartes. Le détail plus bas.

**Quatre catégories pour aider à la décision**

| Catégorie | Pour quoi faire | Modèles |
|---|---|---|
| 1. Petits modèles | Stack RAG, transcription, petit LLM pour résumé, reformulation, traduction | Qwen3.6-35B, Qwen3.5-9B, certains modèles de la famille Gemma 4, gpt-oss-20b, Mistral Small 3.2 (pour le français) |
| 2. Milieu de gamme | Un modèle généraliste sur une seule carte | Qwen3.8-27B |
| 3. Le cap d'août | Tâches générales en entreprise, codage compris, au niveau d'Opus 4.6 à 4.8 | Qwen3.8-Flash-Next, DeepSeek-V4-Flash-0731 |
| 4. Hors de portée | Les plus gros modèles open weights | DeepSeek V4-Pro, DeepSeek 4.1 Flash, Kimi K2.6, GLM-5.1 / GLM-5.2 / GLM-5.3, Mistral Large 4, Qwen3.8-2.4T-A95B, MiniMax M3 |

Message : la catégorie 4 n'est pas accessible sans un investissement de plus d'un million d'euros. Pour les trois autres, on a des propositions en dessous de 100 k€, voire bien en dessous, pour du serveur interne, et des coûts de location au GPU accessibles à une PME.

Notes :

- [Déduction] Sur une carte de 24 Go comme la L4, Qwen3.6-35B et Mistral Small 3.2 (24B) ne tiennent qu'en 4 bits ; sur une L40S (48 Go), ils tiennent en 8 bits
- [À mettre à jour fin octobre 2026] Mistral Large 4 : publication prévue fin octobre, avant la conférence. En attendant, la taille de référence est celle de Mistral-Large-3-675B (décembre 2025)

Tailles des poids officiels, relevées sur Hugging Face le 17/10/2026 (somme des fichiers safetensors, dans la précision publiée par l'éditeur) :

| Catégorie | Modèle | Poids | Licence |
|---|---|---|---|
| 1 | [Qwen3.5-9B](https://hf.co/Qwen/Qwen3.5-9B) | ~19 Go (BF16) | Apache 2.0 |
| 1 | [gpt-oss-20b](https://hf.co/openai/gpt-oss-20b) | ~14 Go (nativement en 4 bits, MXFP4) | Apache 2.0 |
| 1 | [Mistral-Small-3.2-24B](https://hf.co/mistralai/Mistral-Small-3.2-24B-Instruct-2506) | ~48 Go (BF16 ; le dépôt contient deux copies) | Apache 2.0 |
| 1 | [Qwen3.6-35B-A3B](https://hf.co/Qwen/Qwen3.6-35B-A3B) | ~72 Go (BF16), MoE à 3B actifs | Apache 2.0 |
| 4 | [MiniMax-M3](https://hf.co/MiniMaxAI/MiniMax-M3-MXFP8) | ~444 Go (MXFP8) | autre |
| 4 | [DeepSeek-V4.1-Flash](https://hf.co/deepseek-ai/DeepSeek-V4.1-Flash) (10/09/2026) | ~510 Go | MIT |
| 4 | [Kimi-K2.6](https://hf.co/moonshotai/Kimi-K2.6) | ~595 Go (nativement en 4 bits) | autre |
| 4 | [Mistral-Large-3-675B](https://hf.co/mistralai/Mistral-Large-3-675B-Instruct-2512) (à défaut de Large 4) | ~682 Go | Apache 2.0 |
| 4 | [GLM-5.1](https://hf.co/zai-org/GLM-5.1-FP8) / [5.2](https://hf.co/zai-org/GLM-5.2-FP8) / [5.3](https://hf.co/zai-org/GLM-5.3) | ~756 Go chacun (FP8, 754B) | MIT (5.1, 5.2), autre (5.3) |
| 4 | [DeepSeek-V4-Pro-0813](https://hf.co/deepseek-ai/DeepSeek-V4-Pro-0813) | ~893 Go | MIT |
| 4 | [Qwen3.8-2.4T-A95B](https://hf.co/Qwen/Qwen3.8-2.4T-A95B-FP8) | ~2,5 To (FP8) | autre |

Pour la catégorie 4, il faut entre 444 Go et 2,5 To pour les poids seuls, avant le KV cache : de 2,3 à 13 fois nos 192 Go. Un serveur à 8 RTX PRO 6000 (768 Go) logerait le bas de la catégorie, mais demande une alimentation et un refroidissement hors de portée d'une salle serveur de PME : écarté.
- **Passer à l'échelle sans quitter la France** (lien avec le recours par paliers du chapitre plateforme) : les modèles hors de portée en interne restent accessibles par API chez des hébergeurs français, c'est le palier 2. Catalogues relevés le 17/10/2026 :
  - Scaleway Generative APIs, en serverless : GLM-5.3, GLM-5.2, DeepSeek-V4.1-Flash (catégorie 4), DeepSeek-V4-Flash-0731 et Qwen3.8-27B (catégories 3 et 2), Qwen3.5-397B-A17B, Mistral Medium 3.5 ; Mistral Large 3 en déploiement dédié seulement. https://www.scaleway.com/en/docs/generative-apis/reference-content/supported-models/
  - OVHcloud, en louant les GPU : par exemple 8 × H200 (8 × 141 Go) à ~30 700 €/mois, de quoi héberger soi-même un modèle de catégorie 4. Son offre d'API (AI Endpoints) s'arrête à Qwen3.5-397B-A17B, sans modèle de catégorie 4 au 17/10/2026 : https://www.ovhcloud.com/en/public-cloud/ai-endpoints/catalog/
  - Mistral AI, par API (modèles hébergés par Mistral, servis sans modification) : GLM-5.2 depuis le 6 août 2026, déprécié le 29/09/2026 au profit de GLM-5.3, disponible depuis le 15 septembre 2026. Contexte de 1M tokens, 1,4 $ / 4,4 $ par million de tokens en entrée / sortie (0,14 $ en entrée mise en cache). https://docs.mistral.ai/fr/models/zai-glm-5-3 , https://docs.mistral.ai/fr/models/zai-glm-5-2

**Évolution des modèles**

| Quand | Étape | Sur quoi |
|---|---|---|
| Fin 2025 | Premiers tests, dont Chocolatine (modèle affiné pour le français) | |
| Février 2026 | **Première vraie étape** : génération Qwen 3.5, le 35B et le 27B | L40S louées |
| Avril 2026 | Qwen 3.6 : chaque modèle s'améliore | |
| Juin 2026 | Tests des Qwen 3.6 sur les RTX PRO 6000, avec la possibilité de les déployer en FP8 | RTX PRO 6000 |
| Août 2026 | Qwen 3.8, avec le Flash-Next | RTX PRO 6000 |

En parallèle : tests de modèles de transcription (STT), avec ou sans diarisation, contextualisation, etc.

**Le code, version par version** :

- **Qwen3.6-27B** : le premier modèle à commencer à coder, mais avec beaucoup de limitations (tendance à boucler et à planter). Utile pour quelques actions de code ponctuelles
- **Août 2026, Qwen3.8-27B et Flash-Next** : on peut enfin produire du vrai code. C'est surtout le Flash-Next qui est autonome et travaille comme Opus 4.6 ou 4.7 quelques mois plus tôt, qui étaient déjà très utilisables au quotidien
- Le Flash-Next tourne exclusivement sur les RTX PRO 6000 et en réserve 2 sur 3 : pour les tests, ça suffit

**Capacité estimée** (tests de charge pas complètement poussés) :

- Flash-Next : entre 5 et 10 développeurs
- Qwen3.8-27B : 30 à 50 utilisateurs avec un outil de chat comme LibreChat

- **Août 2026 : l'étape franchie.** Sortent DeepSeek-V4-Flash-0731 et Qwen3.8-Flash-Next : ils tournent sur 2 RTX 6000 Pro avec des performances autour de Claude Opus 4.6 à 4.8. Ce sont les premiers modèles vraiment utilisables en contexte d'entreprise pour des tâches générales, codage compris, sans avoir besoin d'un cluster de H200. C'est le tournant de l'histoire : y faire référence aussi dans les chapitres plateforme et usages

| | [DeepSeek-V4-Flash-0731](https://hf.co/deepseek-ai/DeepSeek-V4-Flash-0731) | [Qwen3.8-Flash-Next](https://hf.co/Qwen/Qwen3.8-Flash-Next) |
|---|---|---|
| Sortie | 31 juillet 2026 | 24 août 2026 |
| Paramètres | MoE 284B, 13B actifs | MoE 125B, 6B actifs (+ 51B d'embeddings n-gram, 4B de MTP) |
| Poids officiels | ~167 Go (experts en précision réduite + FP8) | ~186 Go en FP8 |
| Licence | MIT | Licence propriétaire « Qwen Community 1.0 » |
| Comparaison publiée par l'éditeur | Terminal Bench 2.1 : 82,7 contre 85,0 pour Opus 4.8 | Comparé à Opus 4.6 Max dans la fiche |
| Lit les images | Non, texte seul | Oui, multimodal |
| Décodage spéculatif intégré | Oui : module DSpark (le « brouillon » de la vidéo Lithos), activable dans vLLM et SGLang | MTP |

Les deux tiennent tout juste dans 192 Go : la VRAM restante pour le KV cache est le vrai sujet (lien avec le chapitre matériel). Benchmarks publiés par les éditeurs eux-mêmes : à présenter comme tels.

Également sortis en août : Qwen3.8-27B (le 5), qui tient sur une seule carte (Terminal Bench 2.1 : 73,0 contre 78,2 pour Opus 4.6 Max selon la fiche), et Qwen3.8-2.4T-A95B (le 8)

**Point très important : open weights ≠ open source, et les licences changent**

- Jusqu'ici, la famille Qwen était sous Apache 2.0 (Qwen3.5-397B, Qwen3.6-35B, Qwen3.8-27B). Avec Qwen3.8-Flash-Next et Qwen3.8-2.4T, Qwen passe à des licences maison
- Ce que dit la licence « Qwen Community 1.0 » du Flash-Next (lue le 17/10/2026, https://hf.co/Qwen/Qwen3.8-Flash-Next/blob/main/LICENSE) :
  - Usage interne libre, tant que ni le modèle, ni ses réponses, ni ses capacités ne sont mis à disposition de tiers
  - Toute entreprise qui fait du *Model as a Service* (donner accès au modèle à des tiers par API) ou un assistant IA de code ou de bureautique doit obtenir une licence séparée de Qwen avant tout usage commercial, quelle que soit sa taille
  - Au-delà de 100 millions d'utilisateurs actifs mensuels ou 20 M$ de revenus mensuels, le nom du modèle doit être affiché dans l'interface
- La licence « Qwen3.8-Max » du 2.4T est identique, sauf que la licence séparée n'est exigée qu'au-delà de 50 M$ de revenus sur 12 mois
- [Déduction] C'est sans doute pourquoi Flash-Next n'apparaît pas au catalogue des API de Scaleway, qui propose pourtant Qwen3.8-27B et DeepSeek-V4-Flash-0731 (MIT)
- **La question pour la suite** : Flash-Next est un aperçu de l'architecture Qwen4 (`qwen4_exp`), et la famille Qwen 4 est attendue d'ici quelques semaines. Restera-t-elle sous Apache 2.0, ou suivra-t-elle cette licence maison ? Pour une plateforme interne ça passe, pour un hébergeur ou un éditeur d'assistant de code, beaucoup moins
- À dire sur scène : on lit la licence avant de choisir un modèle, comme pour n'importe quelle dépendance (ce n'est pas un avis juridique)

- Ce qu'on voulait faire : _à compléter_
- Le piège (plutôt la difficulté) : le rythme soutenu des sorties de modèles. Il faut pouvoir en déployer pour les utilisateurs tout en testant les nouveaux, et c'est extrêmement exigeant et chronophage
- Ce qu'on en retient : avec un saut de version tous les 3 mois, l'obsolescence des GPU est clairement compensée par les performances croissantes des modèles. Le même matériel fait tourner des modèles de plus en plus capables

### 3. Le matériel

**Première étape : louer avant d'acheter**

- Pour commencer, on a loué des L40S et des L4 chez Scaleway et OVH (hébergeurs français, donc déjà dans l'esprit souverain)
- C'est une excellente façon de tester toute la stack (moteur, plateforme, interface) malgré les limites de ces cartes, sans immobiliser de budget

Prix de location par mois, en fourchettes arrondies à la centaine d'euros (tarifs publics OVH et Scaleway hors taxes, relevés le 17/10/2026) :

| Machine | Mémoire GPU | Prix par mois |
|---|---|---|
| 1 × L4 | 24 Go | 500 à 600 € |
| 1 × L40S | 48 Go | 1 000 à 1 100 € |
| 1 × A100 | 80 Go | ~1 100 € (OVH seulement) |
| 1 × H100 | 80 Go | 1 900 à 2 100 € |
| 2 × L40S | 96 Go | 2 000 à 2 100 € |
| 2 × H100 | 160 Go | 3 900 à 4 800 € (haut de fourchette : version SXM chez Scaleway) |
| 4 × L40S | 192 Go | 4 000 à 4 300 € |
| 4 × H100 | 320 Go | 7 800 à 9 300 € |
| 8 × H200 | 8 × 141 Go | ~30 700 € (OVH) |
| 8 × B300 | 8 × 288 Go | ~43 800 € (Scaleway) |

Sources :

- OVH : https://www.ovhcloud.com/fr/public-cloud/prices/ ; chiffres relevés dans le catalogue public `https://eu.api.ovh.com/1.0/order/catalog/public/cloud?ovhSubsidiary=FR` (forfaits mensuels : L4 540 €, L40S 1 008 €, A100 1 100 €, H100 1 940 €, 2 × H100 3 880 €, 4 × L40S 4 032 €, 4 × H100 7 770 €, 8 × H200 30 660 €). Le catalogue ne précise pas si les H100 sont en PCIe ou SXM
- Scaleway : https://www.scaleway.com/en/pricing/gpu/ (n'affiche les prix que pour la zone PAR-1, où seules les L4 sont disponibles) ; chiffres relevés via `https://api.scaleway.com/instance/v1/zones/fr-par-2/products/servers`, 730 h par mois (L4 575 €, L40S 1 073 €, H100 PCIe 2 093 €, 2 × H100 PCIe 4 185 €, 2 × H100 SXM 4 832 €, 4 × L40S 4 292 €, 4 × H100 SXM 9 323 €, 8 × B300 43 800 €). Pas de RTX PRO 6000 au catalogue

[Déduction] Même avec deux H100, le Qwen3.8-Flash-Next en FP8 (~186 Go) ne tient pas en VRAM (160 Go), alors qu'il tient sur nos deux RTX PRO 6000 (192 Go) : la mémoire compte autant que la vitesse. En location, il faudrait 4 × L40S (192 Go comme nos deux cartes, 4 000 à 4 300 €/mois, mais réparti sur 4 cartes en PCIe, non testé) ou 4 × H100 (7 800 à 9 300 €/mois).

**Aparté : des cartes pour les serveurs « traditionnels »**

Toutes les cartes ne demandent pas un serveur conçu pour l'IA. Certaines rentrent dans les serveurs qu'on a déjà, dès lors qu'ils ont un port PCIe libre. Utile pour des projets en full interne.

| Carte | Mémoire / bande passante | Format et alimentation | Pour quoi faire | Statut |
|---|---|---|---|---|
| **L4** (Ada, 2023) | 24 Go / 300 Go/s | 72 W, alimentée par le seul port PCIe (aucun connecteur), demi-hauteur, demi-longueur, une seule largeur de slot. Refroidissement passif : il faut le flux d'air d'un châssis serveur | Très petits LLM, stack RAG, modèles de décision « System One » : réponses typées (choix, oui/non, score) avec une probabilité par réponse, sans générer de texte ; triage, routage, modération. Exemple open source auto-hébergeable : **Decision 2.0** de vLLM Semantic Router (Apache 2.0, de 0,6B à 27B, ~7 ms par question pour le 2B, versions GGUF), https://hf.co/collections/vllm-sr/decision-20-6ab7cf7bdfb506bf8269cb00. Concept popularisé par Jev de TypeSafe AI (accès anticipé, pas d'info sur l'auto-hébergement), https://www.eigent.ai/fr/blog/typesafe-ai-jev-system-one-models | Vieillissante ; plus produite selon notre expérience mais encore trouvable. Pas d'avis de fin de vie officiel NVIDIA trouvé : dire « remplacée par la RTX PRO 4500 Server Edition » plutôt que « plus produite » |
| **RTX PRO 4500 Blackwell Server Edition** (2026) | 32 Go / 800 Go/s | 165 W via un connecteur PCIe 16 broches, pleine hauteur, pleine longueur, **une seule largeur de slot**, passive. MIG (jusqu'à 2 × 16 Go) et vGPU | La remplaçante de la L4 : à creuser pour des serveurs plus basiques, pas conçus pour l'IA | Actuelle. Ne pas confondre avec l'édition Workstation (200 W, double slot, ventilée, 896 Go/s) |
| **RTX PRO 2000 Blackwell** | 16 Go / 288 Go/s | 70 W, profil bas (demi-hauteur), double slot, ventilée ; pas « Server Edition » | À garder pour des tests ou de l'interne | Actuelle |
| **RTX PRO 4000 Blackwell SFF** | 24 Go / 432 Go/s | 70 W, profil bas (demi-hauteur), double slot, ventilée ; pas « Server Edition » | À garder pour des tests ou de l'interne | Actuelle |

Pour comparaison, la **L40S** louée au début : 48 Go / 864 Go/s, 350 W, pleine hauteur, double slot, passive.

**Ensuite : l'achat**

- 3 RTX PRO 6000 Blackwell Server Edition réparties sur 2 serveurs : un investissement coûteux, mais qui permet beaucoup de choses
- Tests sur Mac Studio : ça marche, mais l'écosystème NVIDIA reste le plus simple à exploiter (voir les alternatives en fin de chapitre)

**Le matériel par catégorie de modèles** (les 4 catégories sont présentées au chapitre modèles ; matériel et budgets déduits du tableau des plafonds et des prix de location, à valider)

| Catégorie | Ce qu'il faut | Exemples de matériel | Interne | Location |
|---|---|---|---|---|
| 1. Petits modèles | Une carte d'entrée de gamme, possible dans un serveur « traditionnel » | L4, RTX PRO 4500 Server Edition, RTX PRO 2000 / 4000 SFF | bien en dessous de 100 k€ | 500 à 600 €/mois (1 L4) |
| 2. Milieu de gamme (27B) | ~31 Go en FP8 (~16 Go en 4 bits) + KV cache | 1 RTX PRO 6000, L40S, H100 ; RTX 5090 ou RTX PRO 4500 en 4 bits | bien en dessous de 100 k€ | 1 000 à 2 100 €/mois |
| 3. Le cap d'août | ~190 Go de VRAM dans un même serveur | 2 RTX PRO 6000 (les nôtres) ; 2 H100 ne suffisent pas | moins de 100 k€ (notre investissement : 50 à 70 k€) | 4 000 à 4 300 €/mois (4 L40S, non testé) ; 7 800 à 9 300 €/mois (4 H100) |
| 4. Hors de portée | Plusieurs centaines de Go à plusieurs To de VRAM, NVLink | 8 H200 ou plus | plus d'un million d'euros | ~30 700 €/mois (8 H200) à ~43 800 €/mois (8 B300) |

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

Sur deux RTX 6000 Pro (2 × 96 = 192 Go), le Flash Next en FP8 (~186 Go) ne tiendrait qu'au chausse-pied. **Comment on le fait tenir en production** (retour du serveur, 17/10/2026) :

- FP8 officiel de Qwen, réparti sur les 2 cartes (tensor parallel = 2), dans le même serveur
- Les 51B d'embeddings n-gram sont **déportés en RAM CPU** (`VLLM_PLE_CPU_OFFLOAD=1`) : le conteneur occupe 133 Go de RAM système. Possible parce que ces embeddings sont de simples consultations de table, pas des calculs
- Résultat par carte : 64,5 Gio de poids, **18,2 Gio de KV cache**, 89,7 Go occupés sur 97,9 Go
- Grâce à l'attention hybride, ces 2 × 18 Gio suffisent pour **1,17 million de tokens** de KV cache, soit environ 6 conversations simultanées au contexte maximal
- Communication entre les cartes : PCIe entre deux ponts du même nœud NUMA, sans NVLink

Bon exemple de VRAM qui dimensionne tout, et de modèle réparti sur deux cartes sans NVLink.

**Ce que la formule ne dit pas** (mesures réelles vs plafond théorique) :

- Mesuré, 1 utilisateur, thinking désactivé, décodage spéculatif MTP actif : **~200 tok/s**
- Production, 3 semaines, ~9 400 requêtes réelles, thinking actif : **~127 tok/s par requête** sous charge, premier token en 0,64 s en moyenne, 10,4 s de bout en bout en moyenne
- Plafond théorique sans spéculatif : ~265 tok/s pour 6 Go lus par token sur une carte Server Edition à 1 597 Go/s (le double si la lecture est parfaitement répartie sur les deux)
- [Déduction] Avec 2,8 tokens produits par passe grâce au MTP, 200 tok/s correspondent à environ 70 passes par seconde, très loin de ce que permettrait la bande passante. Sur un MoE avec si peu de paramètres actifs, ce sont les surcoûts qui dominent : échanges entre cartes à chaque couche en PCIe sans NVLink, kernels MoE non optimisés pour la carte, coût du brouillon. La formule donne un plafond, pas une prévision

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
| RTX PRO 6000 Blackwell (Workstation) | 96 Go | 1 792 Go/s | 504 TFLOPS | non | ~112 tok/s | 2 cartes : tient tout juste, ~300 tok/s théoriques |
| **RTX PRO 6000 Blackwell Server Edition (les nôtres)** | **96 Go** | **1 597 Go/s** | **~500 TFLOPS** | **non** | **~100 tok/s** | **2 cartes : tient tout juste, ~265 tok/s théoriques** (plus si la lecture est répartie sur les deux cartes, moins à cause des échanges en PCIe sans NVLink) ; ~200 tok/s mesurés avec MTP |
| H100 PCIe | 80 Go | 2 To/s | ~756 TFLOPS | pont NVLink optionnel, 600 Go/s | ~125 tok/s | ne tient pas, même sur 2 cartes (160 Go) |
| H100 SXM | 80 Go | 3,35 To/s | 990 TFLOPS | oui, 900 Go/s | ~210 tok/s | ne tient pas, même sur 2 cartes (160 Go) |
| H200 SXM | 141 Go | 4,8 To/s | 990 TFLOPS | oui, 900 Go/s | ~300 tok/s | ne tient pas sur une carte |
| B200 (HGX) | 180 Go | 8 To/s | 2 250 TFLOPS | oui, 1,8 To/s | ~500 tok/s | ne tient pas sur une carte (186 > 180 Go) |

Notes :

- Nos cartes sont des **RTX PRO 6000 Blackwell Server Edition** : refroidissement passif (châssis serveur obligatoire), 11 % de bande passante en moins que l'édition Workstation
- NVLink : NVIDIA ne le mentionne pour aucune édition de la RTX PRO 6000 ; les fiches GeForce (4090, 5090) disent explicitement « non »
- Apple ne publie pas la puissance de calcul de ses puces : c'est justement ce qui limite la lecture du prompt
- Le M5 Max 32 cœurs GPU (460 Go/s) est limité à 36 Go : il faut la version 40 cœurs pour 128 Go
- Les chiffres « AI TOPS » des fiches GeForce et RTX PRO sont en FP4 ou FP8 *avec sparsité* : 2 à 4 fois les chiffres utiles en pratique
- H100 : la version PCIe (2 To/s) et la version SXM (3,35 To/s) ont les mêmes 80 Go mais pas la même vitesse. Scaleway loue les deux (80 Go HBM2e à 2 To/s confirmés sur sa page H100 PCIe). Puissance de calcul de la version PCIe donnée de mémoire, pas encore revérifiée sur la fiche NVIDIA

Messages :

- La bande passante varie d'un facteur 30 entre une machine de bureau et un GPU de datacenter ; la puissance de calcul d'un facteur 40
- On ne maximise pas à la fois mémoire et vitesse sans payer cher (Mac et DGX Spark : beaucoup de mémoire mais lents ; 5090 : rapide mais tient peu) ; la RTX 6000 Pro est le compromis entre les deux
- Le MoE change la donne : un modèle 5 fois plus gros que le 27B va presque 3 fois plus vite, parce qu'il relit 6 Go par token au lieu de 16. En contrepartie, il faut pouvoir le loger en entier
- L'architecture compte aussi pour la mémoire : grâce à l'attention hybride, le KV cache de ces modèles est plusieurs fois plus petit qu'avec une attention classique

Visuel envisagé : graphique en barres animé des plafonds de vitesse, même modèle sur toutes les machines.

**Pour finir : deux approches pour héberger en interne**

| | Approche « salle serveur » | Approche « datacenter » |
|---|---|---|
| Principe | Non industrialisée : on pose des machines sur le réseau | Vraie industrialisation, avec des ressources prévues pour (alimentation, refroidissement, baies, exploitation) |
| Matériel | Mac Studio, NVIDIA DGX Spark, cartes qui ne sont pas « Server Edition » (RTX PRO 2000 / 4000 SFF, cartes Workstation) | Cartes Server Edition / datacenter dans des serveurs conçus pour (nos RTX PRO 6000 Server Edition, H100, H200…) |
| Pour qui | L'interne et les labs | **Obligatoire pour une offre aux clients** |
| Attention | Électricité et dissipation de chaleur, même pour quelques machines | Coût et délai de mise en place |

- **Mac Studio** et **DGX Spark** : des alternatives très intéressantes pour l'approche salle serveur. Beaucoup de mémoire unifiée (jusqu'à 512 Go pour le Mac Studio M5 Ultra, 128 Go pour le DGX Spark) dans une machine compacte, mais plus lents que les GPU de datacenter (voir le tableau)
- Lien avec le point licence du chapitre modèles : une offre aux clients impose à la fois l'approche datacenter et une licence de modèle qui l'autorise

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

### 4. Les moteurs d'inférence

- vLLM et SGLang, les deux moteurs utilisés
- Un paysage qui bouge vite : on cite d'autres moteurs (llama.cpp, Ollama, TensorRT-LLM, MLX, …)
- Le cycle observé : une optimisation apparaît, souvent sous la forme d'un nouveau moteur, puis les moteurs « leaders » l'intègrent rapidement

**Matière disponible : le vécu sur Blackwell** (retour du serveur, 17/10/2026 ; candidats pour « le piège » et « ce qu'on en retient », à valider)

- **Le même cycle pour les modèles** : Qwen3.8-Flash-Next a d'abord tourné sur une image vLLM dédiée au modèle, avant que son support arrive dans une release stable (vLLM 0.30.0, adoptée le 25/09, sans patch). Gain au passage : +11 % (180 → 200 tok/s)
- **Fork ou upstream ?** Avant Qwen, un autre gros MoE tournait sur ces cartes. Un fork communautaire de vLLM optimisé Blackwell a été essayé, puis un retour à vLLM upstream 0.26, qui échouait faute de kernel (`no kernel exists for this layer type`)
- **Les cartes récentes sont moins bien servies** : pas de réglages MoE fournis pour la RTX PRO 6000 (« Using default MoE config »), un mécanisme de communication non supporté, des compilations à la volée au premier passage de certaines formes de calcul (pics de latence ponctuels). Lien avec la question « est-ce que ça tourne ? » du chapitre matériel
- **Un défaut qui ne convient pas sans NVLink** : depuis vLLM 0.29, un nouvel algorithme d'échange entre cartes (all-reduce FlashInfer) est actif par défaut. Il a fallu le désactiver et revenir à NCCL seul. Les réglages NCCL eux-mêmes viennent de comparaisons au benchmark faites sur le déploiement précédent
- **Le décodage spéculatif en vrai** : MTP à 3 tokens proposés, 61 % d'acceptation globale (76 % / 59 % / 48 % selon la position), soit 2,8 tokens produits par passe. À comparer aux 2,5 acceptés en moyenne mesurés par l'équipe Lithos dans la vidéo

- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 5. La plateforme LLM

- Consommer les modèles presque aussi simplement que sur les plateformes des géants américains
- Passerelle unique compatible OpenAI (LiteLLM)
- **Deux interfaces de chat, selon le public** :
  - On a commencé par Open WebUI, mais c'est trop complexe pour les utilisateurs « de base »
  - Les utilisateurs auront **LibreChat**, bien plus simple à prendre en main
  - L'équipe IA garde **Open WebUI** : ses très nombreuses options dans l'interface permettent de pousser certains tests très loin
- Recours aux modèles par paliers : internes, puis hébergés en France, puis clouds US si besoin
- C'est la mise à l'échelle : les modèles de catégorie 4, hors de portée en interne, passent par le palier 2 (API d'hébergeurs français, voir chapitre modèles)

**Matière disponible : régler le service sur l'usage réel** (retour du serveur, 17/10/2026 ; candidats pour « le piège » et « ce qu'on en retient », à valider)

- **Trop gourmand, ça casse** : réserver 95 % de la VRAM a provoqué un crash du moteur (`EngineDeadError`), vraisemblablement sur un long prompt. Retour à 90 %, lots plus petits, découpage des longs prompts
- **Dimensionner sur l'usage observé, pas sur la fiche** : après analyse de la distribution des longueurs de prompts réels, contexte ramené de 262k à 196k tokens et 12 conversations simultanées au maximum. Résultat : de 116 préemptions (requêtes suspendues faute de mémoire) à 0
- **La réflexion a un coût** : le niveau de réflexion `high` posait problème, `medium` est imposé par défaut côté serveur (lien avec les tokens de réflexion)
- **Le cache de préfixes** : environ 45 % des tokens de prompt sont déjà en cache. Mais il ne réutilise que des blocs de 1 600 tokens
- **Redémarrer coûte** : environ 4 minutes de démarrage (90 s de chargement des poids, puis préparation et préchauffage)
- **Chiffres de production sur 3 semaines** : ~9 400 requêtes, premier token en 0,64 s, ~127 tok/s par requête, 10,4 s de bout en bout en moyenne. Pas encore de mesure de débit total sous charge avec un outil standard

- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 6. Les usages : trois types

| Type | Pour qui | Par quoi |
|---|---|---|
| Généraliste | Tous les utilisateurs | Un outil de chat : LibreChat (Open WebUI pour l'équipe IA) |
| Développeurs | Les équipes de développement | Des outils de développement branchés sur les modèles : OpenCode, DeepSeek harness |
| Intégrations sur mesure | Les applications tierces | Le modèle intégré dans un outil existant, via l'API |

**Ce qu'on constate sur les trois types** :

- Dès des modèles comme Qwen3.8-27B et Flash-Next, on commence à faire des choses intéressantes
- Les besoins les plus intenses sont ceux des développeurs : c'est là qu'il faut le plus de compromis
- Pour le chat généraliste et les intégrations dans les applications, on fait déjà des choses vraiment très impressionnantes

**Le harness compte autant que le modèle** :

- Le *harness*, c'est l'application qui encapsule le modèle : ses outils, ses skills, ses prompts système
- Dans beaucoup de cas, c'est lui qui pousse le modèle dans ses retranchements et lui fait faire des choses impressionnantes
- Surtout quand on n'est plus limité à compter les tokens dont on a besoin : en auto-hébergé, un token de plus ne coûte rien de plus

### 6a. Usages : le chat généraliste

- À travers un outil de chat type LibreChat ou Open WebUI (voir le choix des interfaces au chapitre plateforme)
- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 6b. Usages : les développeurs

- À travers des applications de développement comme OpenCode ou DeepSeek harness

- Lecture du prompt observée en production : 1 300 à 2 000 tok/s en usage courant, pics à 14 000 tok/s grâce au cache de préfixes. Pour un agent qui lit 6 tokens pour 1 écrit, c'est cette vitesse qui compte
- **Simuler un modèle multimodal en combinant deux modèles** : DeepSeek-V4-Flash-0731 ne lit que du texte, ce qui limitait son usage en développement (captures d'écran, maquettes…). Les images étaient donc analysées par Qwen3.8-27B, qui comprend les images, et sa description envoyée à DeepSeek-V4-Flash. Un vrai modèle multimodal reste bien plus performant sur la vision. Depuis le passage à Qwen3.8-Flash-Next, qui est multimodal, la qualité a progressé en développement : le modèle analyse lui-même les captures d'écran et les maquettes
- Ce qu'on voulait faire : _à compléter_
- Le piège : _à compléter_
- Ce qu'on en retient : _à compléter_

### 6c. Usages : les intégrations sur mesure

Le modèle s'intègre dans des applications tierces. Les trois intégrations ci-dessous sont déployées chez nous, chacune avec des itérations un peu différentes :

- Un RAG au sein d'un outil de gestion documentaire
- Une transcription (STT) dans un assistant de compte rendu
- Un modèle « System One » pour le tri automatique de tickets (voir Decision 2.0 au chapitre matériel)

Lien avec les catégories : ces intégrations reposent surtout sur des modèles de catégorie 1, qui tiennent sur une L4 dans un serveur traditionnel.

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
- **SXM vs PCIe** : le même GPU existe en carte enfichable (PCIe) ou soudé sur une carte mère dédiée (SXM) ; le format change la bande passante et la liaison entre les cartes (H100 : 2 To/s en PCIe, 3,35 To/s et NVLink en SXM)

Candidats proposés au fil de la conception des slides (à valider) :

- **Bande passante mémoire** : la vitesse à laquelle la carte relit les poids ; fixe la vitesse de génération
- **NVLink** : la liaison rapide entre GPU NVIDIA, absente des RTX 6000 Pro
- **Décodage spéculatif** : un petit modèle brouillon propose plusieurs tokens, le gros les vérifie en une seule lecture
- **Lecture du prompt / génération** (*prefill* / *decode*) : deux phases limitées par des ressources différentes (calcul / bande passante)
- **Tokens de réflexion** (mode *thinking*) : ce que le modèle écrit pour « réfléchir » avant de répondre, et qui coûte du temps
- **Temps avant le premier token** (*TTFT*) : ce que l'utilisateur ressent comme la réactivité
- **Cache de préfixes** : ne pas relire le début d'une conversation déjà lu au tour précédent
- **Multimodal (vision)** : un modèle qui comprend aussi les images, pas seulement le texte
- **STT** (*speech-to-text*, transcription) : transformer la parole en texte
- **Diarisation** : savoir qui parle quand dans un enregistrement
- **Harness** : l'application qui encapsule le modèle avec ses outils, ses skills et ses prompts système
- **Affinage** (*fine-tuning*) : réentraîner un modèle existant sur des données ciblées (ex. Chocolatine pour le français)
