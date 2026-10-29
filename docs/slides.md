# Slides : contenu, oral et compléments

Le pont entre `docs/storyline.md` (le récit, les décisions, l'annexe) et les slides compilées (`src/deck.ts`). Pour chaque slide :

- **À l'écran** : ce qui est affiché
- **À l'oral** : le message à raconter
- **Compléments** : chiffres, sources et détails à garder sous le coude pour les questions (la plupart viennent de l'annexe du storyline)

Le numéro de chaque slide est celui de l'adresse du présentateur (`#n`). L'identifiant entre parenthèses est celui de `src/deck.ts` et de `out/stills/`. Ce fichier se met à jour en même temps que les slides.

Badges : **Testé** (plein) = vécu sur notre infrastructure ; **Extrapolé** (pointillés) = calculé à partir des fiches constructeurs, de la documentation ou des prix publics.

Durée cible : 44 min (voir le déroulé du storyline).

**Progression au clic** : chaque slide avance clic par clic. À l'arrivée, le titre et le premier élément apparaissent ; chaque clic (flèche droite, Espace, Entrée, Page suivante, télécommande ou clic de souris) fait apparaître l'élément suivant ; quand tout est affiché, le clic suivant passe à la slide suivante. La flèche gauche retire le dernier élément affiché, ou revient à la slide précédente complète. La ligne « Progression » de chaque slide détaille ce qui apparaît à chaque clic. Le PPTX et Remotion Studio montrent toujours la slide complète.

---

## 0. Ouverture (2 min)

### 1. Titre (`title`)

- **Progression** : pas de clic, tout apparaît à l'arrivée
- **À l'écran** : « Une plateforme IA à la demande, 100 % open source », « Du GPU local au cloud souverain », Julien Del Rio · Capitole du Libre 2026. Bouton de thème en haut à droite (sur cette slide seulement)
- **À l'oral** : présentation rapide de l'orateur
- **Compléments** : choisir le thème avant de commencer (touche `d` ou bouton), plein écran avec `f`

### 2. L'aveu (`confession`)

- **Progression** : arrivée : « Un talk sur l'IA souveraine 100 % open source… » ; clic 1 : « entièrement conçu avec l'aide de Claude, ces slides comprises. » ; clic 2 : « Cynique, mais opérationnel et efficace. »
- **À l'écran** : « Un talk sur l'IA souveraine 100 % open source… », « entièrement conçu avec l'aide de Claude, ces slides comprises. », puis « Cynique, mais opérationnel et efficace. »
- **À l'oral** : l'aveu, sur un ton léger et honnête, en ménageant l'effet à chaque clic. Ce n'est pas un running gag : on n'y revient qu'une fois, en conclusion (slide 44)
- **Compléments** : la conclusion explique pourquoi ce n'est pas contradictoire (Claude = palier 3)

### 3. La promesse (`promise`)

- **Progression** : arrivée : la carte « En interne » ; clic 1 : la carte « En location » ; clic 2 : le pied de slide
- **À l'écran** : « Une IA 100 % souveraine, dès maintenant ». Deux cartes : en interne 50 – 70 k€ d'investissement ; en location 2 – 5 k€ / mois chez OVH ou Scaleway. « Pas le très haut de gamme, mais on fait déjà des choses très bien : c'est le sujet du talk »
- **À l'oral** : l'objectif du talk, démontrer qu'on peut dès maintenant avoir une IA 100 % souveraine et faire des choses vraiment bien avec. Donner les ordres de grandeur du budget dès le départ
- **Compléments** : le détail par catégorie de modèles est à la slide 21

### 4. Le fil rouge (`thread`)

- **Progression** : arrivée : les modèles ; clics 1 à 4 : le matériel, les moteurs, la plateforme, les usages ; clic 5 : le pied de slide
- **À l'écran** : 5 étapes : les modèles (la finalité), le matériel (ce que le budget permet), les moteurs, la plateforme, les usages. « Pour chaque étape : ce qu'on voulait faire, le piège, ce qu'on en retient »
- **À l'oral** : on avance dans l'ordre où il faut se poser les questions. On commence par la finalité, les modèles : on fixe un budget, on le met en rapport avec les catégories de modèles, et on regarde quel matériel ce budget permet. Ensuite on remonte la stack jusqu'aux utilisateurs. Chaque chapitre se termine par le même trio
- **Compléments** : 4 mois de POC puis 2 mois de production ; retour d'expérience générique, sans nommer l'entreprise

## 1. Petit lexique (3 min)

### 5. Les mots pour suivre, 1/2 (`glossary-1`)

- **Progression** : arrivée : inférence ; clics 1 à 4 : paramètres / poids, open weights, quantization, token
- **À l'écran** : inférence, paramètres / poids, open weights, quantization, token, avec une définition chacun
- **À l'oral** : une métaphore par terme, pas de maths. Insister sur « open weights » : on récupère les poids, pas forcément les données ni le code d'entraînement, et ce n'est pas de l'open source (repris à la slide 14)
- **Compléments** : les autres termes sont expliqués là où ils apparaissent (affinage, multimodal, STT au chapitre modèles ; bande passante mémoire, lecture du prompt / génération, NVLink au chapitre matériel ; passerelle LLM, OpenTelemetry, SSO au chapitre plateforme). Termes de réserve pour les questions dans l'annexe du lexique : diarisation, décodage spéculatif, SXM vs PCIe, tensor parallelism, tokens de réflexion, TTFT, batching continu, API compatible OpenAI, cache de préfixes

### 6. Les mots pour suivre, 2/2 (`glossary-2`)

- **Progression** : arrivée : VRAM ; clics 1 à 4 : contexte / KV cache, MoE, agentique, harness
- **À l'écran** : VRAM, contexte / KV cache, MoE, agentique, harness
- **À l'oral** : la VRAM est la vraie ressource rare ; plus une conversation est longue, plus elle consomme de mémoire ; un MoE ne fait travailler qu'une partie du modèle à chaque token ; le harness est l'application autour du modèle (repris au chapitre usages)
- **Compléments** : voir la slide 5

## 2. Les modèles (8 min)

### 7. Commencer par la finalité (`models-why`)

- **Progression** : arrivée : fixer un budget ; clic 1 : choisir une catégorie ; clic 2 : en déduire le matériel ; clic 3 : le pied de slide
- **À l'écran** : 3 étapes : fixer un budget (interne ou location), choisir une catégorie de modèles, en déduire le matériel. « Avant de parler cartes et serveurs, savoir ce qu'on veut faire tourner »
- **À l'oral** : pourquoi commencer par les modèles : c'est la finalité. Les 4 catégories qui suivent servent à aider à la décision
- **Compléments** : —

### 8. Août 2026, le cap franchi (`august`)

- **Progression** : arrivée : les deux modèles et leurs dates ; clics 1 à 3 : sur 2 cartes au niveau d'Opus, utilisables en entreprise, DeepSeek Harness ; clic 4 : le pied de slide
- **À l'écran** : DeepSeek-V4-Flash-0731 (31 juillet) et Qwen3.8-Flash-Next (24 août) ; sur 2 cartes, autour de Claude Opus 4.6 à 4.8 ; les premiers modèles vraiment utilisables en entreprise, codage compris ; DeepSeek Harness arrive en même temps. Badges : Testé, « Niveau Opus : selon les éditeurs »
- **À l'oral** : c'est l'accroche du talk, à placer tôt. Plus besoin d'un cluster de H200 pour des tâches générales. Août, ce n'est pas seulement de meilleurs modèles, ce sont aussi les outils pour les exploiter
- **Compléments** :
  - Comparaisons publiées par les éditeurs, à présenter comme telles : DeepSeek-V4-Flash-0731, Terminal Bench 2.1 82,7 contre 85,0 pour Opus 4.8 ; Flash-Next comparé à Opus 4.6 Max dans sa fiche
  - DeepSeek Harness a été publié dans la foulée de DeepSeek-V4-Flash-0731 comme démonstrateur de code (dépôt créé le 13 août 2026)
  - Également sortis en août : Qwen3.8-27B (le 5 ; Terminal Bench 2.1 : 73,0 contre 78,2 pour Opus 4.6 Max selon la fiche) et Qwen3.8-2.4T-A95B (le 8)

### 9. Quatre catégories pour décider (`categories`)

- **Progression** : arrivée : l'en-tête et la catégorie 1 ; clics 1 à 3 : catégories 2, 3 et 4 ; clic 4 : le message budget
- **À l'écran** : tableau : 1. petits modèles (RAG, transcription, résumé, traduction : Qwen3.6-35B, Qwen3.5-9B, Gemma 4, gpt-oss-20b, Mistral Small 3.2) ; 2. milieu de gamme (Qwen3.8-27B) ; 3. le cap d'août (Flash-Next, DeepSeek-V4-Flash-0731) ; 4. hors de portée (DeepSeek V4-Pro, Kimi K2.6, GLM-5.x, Mistral Large 4, Qwen3.8-2.4T, MiniMax M3…). Colonne « chez nous ». Pied : « Catégorie 4 : plus d'un million d'euros. Les trois autres : moins de 100 k€ en interne, et une location accessible à une PME »
- **À l'oral** : on fixe un budget, on le met en rapport avec ces catégories. La catégorie 4 n'est pas accessible sans un investissement de plus d'un million d'euros ; pour les trois autres, on a des propositions en dessous de 100 k€, voire bien en dessous
- **Compléments** :
  - Catégorie 1, ce qu'on a testé : Qwen 35B ; Gemma 4 et gpt-oss-20b, limités, et c'est justement ce qui les place en catégorie 1 ; Qwen3.5-9B et Mistral Small 3.2 pas testés directement
  - Sur une carte de 24 Go comme la L4, Qwen3.6-35B et Mistral Small 3.2 ne tiennent qu'en 4 bits ; sur une L40S (48 Go), en 8 bits
  - Mistral Large 4 : publication prévue fin octobre 2026, pas encore sortie au 29/10. Référence en attendant : Mistral-Large-3-675B (~682 Go). Vérifier avant le 14 novembre
  - Tailles (Hugging Face, 17/10/2026) : Qwen3.5-9B ~19 Go, gpt-oss-20b ~14 Go, Mistral Small 3.2 ~48 Go, Qwen3.6-35B-A3B ~72 Go

### 10. Hors de portée, mais pas hors de France (`out-of-reach`)

- **Progression** : arrivée : la carte catégorie 4 ; clic 1 : la carte palier 2
- **À l'écran** : catégorie 4 : 444 Go – 2,5 To de poids, avant même le KV cache, soit 2,3 à 13 fois nos 192 Go. Le palier 2, des hébergeurs français : Scaleway par API (GLM, DeepSeek, Qwen), OVHcloud en louant les GPU, Mistral AI par API (GLM-5.3). Badge extrapolé
- **À l'oral** : les plus gros modèles restent accessibles sans quitter la France. C'est la mise à l'échelle, et le lien avec le recours par paliers du chapitre plateforme (slide 31)
- **Compléments** :
  - Tailles relevées sur Hugging Face le 17/10/2026 : MiniMax-M3 ~444 Go, DeepSeek-V4.1-Flash ~510 Go, Kimi-K2.6 ~595 Go, Mistral-Large-3 ~682 Go, GLM-5.1 / 5.2 / 5.3 ~756 Go chacun, DeepSeek-V4-Pro-0813 ~893 Go, Qwen3.8-2.4T ~2,5 To
  - Un serveur à 8 RTX PRO 6000 (768 Go) logerait le bas de la catégorie, mais demande une alimentation et un refroidissement hors de portée d'une salle serveur de PME : écarté
  - Scaleway Generative APIs (17/10/2026) : GLM-5.3, GLM-5.2, DeepSeek-V4.1-Flash, DeepSeek-V4-Flash-0731, Qwen3.8-27B, Qwen3.5-397B-A17B, Mistral Medium 3.5 ; Mistral Large 3 en déploiement dédié seulement
  - OVHcloud : 8 × H200 à ~30 700 €/mois ; son offre AI Endpoints s'arrête à Qwen3.5-397B-A17B
  - Mistral AI : GLM-5.2 depuis le 6 août 2026, déprécié le 29/09 au profit de GLM-5.3 (depuis le 15 septembre) ; contexte de 1M tokens, 1,4 $ / 4,4 $ par million de tokens en entrée / sortie

### 11. Ce qu'on a vécu (`model-timeline`)

- **Progression** : arrivée : fin 2025 ; clics 1 à 4 : février, avril, juin, août 2026 ; clic 5 : la transcription en parallèle
- **À l'écran** : frise : fin 2025, premiers tests dont Chocolatine ; février 2026, Qwen 3.5 (35B et 27B) sur L40S louées ; avril, Qwen 3.6 ; juin, Qwen 3.6 en FP8 sur RTX PRO 6000 ; août, Qwen 3.8 et Flash-Next. En parallèle, la transcription. Badge testé
- **À l'oral** : février 2026 est la première vraie étape ; chaque génération améliore chaque taille de modèle ; août est le cap
- **Compléments** : Chocolatine est un modèle affiné pour le français. Les tests de transcription ont porté sur les modèles avec ou sans diarisation (qui parle quand), et sur la contextualisation

### 12. Le code, version par version (`code-versions`)

- **Progression** : arrivée : la carte Qwen3.6-27B ; clic 1 : la carte août ; clic 2 : la capacité estimée
- **À l'écran** : Qwen3.6-27B : le premier à commencer à coder, mais boucle et plante, utile pour des actions ponctuelles. Août, Qwen3.8-27B et Flash-Next : enfin du vrai code, le Flash-Next autonome comme Opus 4.6 / 4.7 quelques mois plus tôt. Capacité estimée : 5 à 10 développeurs sur Flash-Next, 30 à 50 utilisateurs de chat sur le 27B
- **À l'oral** : Opus 4.6 / 4.7 étaient déjà très utilisables au quotidien ; on a aujourd'hui ce niveau en interne. Préciser que les tests de charge n'ont pas été complètement poussés
- **Compléments** : le Flash-Next tourne exclusivement sur les RTX PRO 6000 et en réserve 2 sur 3 ; pour les tests, ça suffit

### 13. Les deux modèles d'août (`august-models`)

- **Progression** : arrivée : sortie, taille et poids s'enchaînent ; clic 1 : la licence ; clic 2 : la lecture des images ; clic 3 : le pied de slide
- **À l'écran** : tableau DeepSeek-V4-Flash-0731 / Qwen3.8-Flash-Next : sortie (31 juillet / 24 août 2026), taille (MoE 284B, 13B actifs / MoE 125B, 6B actifs), poids (~167 Go / ~186 Go en FP8), licence (MIT / licence maison « Qwen Community 1.0 »), images (non / oui, multimodal). « Les deux tiennent tout juste dans nos 192 Go »
- **À l'oral** : deux modèles de même niveau, mais une licence ouverte d'un côté, une licence maison de l'autre ; et un seul lit les images (repris à la slide 39). La VRAM restante pour le KV cache est le vrai sujet
- **Compléments** : Flash-Next a aussi 51B d'embeddings n-gram et 4B de MTP (décodage spéculatif intégré) ; DeepSeek a son module de décodage spéculatif DSpark, activable dans vLLM et SGLang. Chiffres tirés des fiches des éditeurs

### 14. Open weights ≠ open source (`license`)

- **Progression** : arrivée : Qwen sous Apache 2.0 ; clics 1 à 4 : licence maison, usage interne libre, licence séparée, et Qwen 4 ? ; clic 5 : « on lit la licence… »
- **À l'écran** : Qwen était sous Apache 2.0 (3.5, 3.6, et encore le 3.8-27B) ; Flash-Next passe à une licence maison ; usage interne libre ; licence séparée pour du Model as a Service ou un assistant de code ; et Qwen 4 ? Pied : « On lit la licence avant de choisir un modèle, comme pour toute dépendance (ce n'est pas un avis juridique) »
- **À l'oral** : point très important. Pour une plateforme interne ça passe ; pour un hébergeur ou un éditeur d'assistant de code, beaucoup moins. Flash-Next est un aperçu de l'architecture Qwen 4, attendue dans quelques semaines : restera-t-elle sous Apache 2.0 ?
- **Compléments** :
  - Licence « Qwen Community 1.0 » lue le 17/10/2026 : usage interne libre tant que ni le modèle, ni ses réponses, ni ses capacités ne sont mis à disposition de tiers ; licence séparée avant tout usage commercial en Model as a Service ou assistant de code / bureautique, quelle que soit la taille ; au-delà de 100 millions d'utilisateurs actifs mensuels ou 20 M$ de revenus mensuels, le nom du modèle doit être affiché
  - La licence « Qwen3.8-Max » du 2.4T est identique, sauf que la licence séparée n'est exigée qu'au-delà de 50 M$ de revenus sur 12 mois
  - Déduction : c'est sans doute pourquoi Flash-Next n'est pas au catalogue des API de Scaleway
  - Les poids sont chez nous, mais la licence suit (idée proposée, non retenue pour l'instant)

### 15. Objectif, piège, leçon (`models-trio`)

- **Progression** : arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon
- **À l'écran** : objectif : un modèle assez bon pour un usage quotidien, code compris, sur notre propre matériel. Piège : le rythme des sorties. Leçon : un saut de version tous les 3 mois, l'obsolescence des GPU est compensée par les progrès des modèles
- **À l'oral** : le piège est plutôt une difficulté : il faut déployer pour les utilisateurs tout en testant les nouveaux modèles, et c'est extrêmement exigeant et chronophage. Mais le même matériel fait tourner des modèles de plus en plus capables
- **Compléments** : —

## 3. Le matériel (8 min)

### 16. Louer avant d'acheter (`rent-first`)

- **Progression** : arrivée : L4 et L40S (testées) s'enchaînent ; clic 1 : H100, 4 × L40S et 8 × H200 (catalogue) ; clic 2 : le pied de slide
- **À l'écran** : 1 × L4 24 Go 500 – 600 € (testé) ; 1 × L40S 48 Go 1 000 – 1 100 € (testé) ; 1 × H100 80 Go 1 900 – 2 100 € ; 4 × L40S 192 Go 4 000 – 4 300 € ; 8 × H200 ~30 700 € (catalogue). « Tarifs publics OVH et Scaleway, hors taxes, octobre 2026 »
- **À l'oral** : on a commencé par louer des L4 et des L40S chez des hébergeurs français, donc déjà dans l'esprit souverain. Excellente façon de tester toute la stack (moteur, plateforme, interface) malgré les limites de ces cartes, sans immobiliser de budget
- **Compléments** :
  - Prix exacts OVH (forfaits mensuels) : L4 540 €, L40S 1 008 €, A100 1 100 €, H100 1 940 €, 2 × H100 3 880 €, 4 × L40S 4 032 €, 4 × H100 7 770 €, 8 × H200 30 660 €
  - Prix exacts Scaleway (730 h) : L4 575 €, L40S 1 073 €, H100 PCIe 2 093 €, 2 × H100 PCIe 4 185 €, 2 × H100 SXM 4 832 €, 4 × L40S 4 292 €, 4 × H100 SXM 9 323 €, 8 × B300 43 800 €. Pas de RTX PRO 6000 au catalogue
  - Fourchettes intermédiaires : A100 ~1 100 € (OVH seulement), 2 × L40S 2 000 – 2 100 €, 2 × H100 3 900 – 4 800 €, 4 × H100 7 800 – 9 300 €, 8 × B300 ~43 800 €

### 17. 5 questions avant d'acheter (`five-questions`)

- **Progression** : arrivée : est-ce que ça tourne ? ; clics 1 à 4 : ça tient, ça écrit vite, ça lit vite, les cartes se parlent
- **À l'écran** : est-ce que ça tourne (pilotes et écosystème : CUDA, ROCm, Metal) ; ça tient (VRAM : le modèle et le KV cache) ; ça écrit vite (bande passante mémoire) ; ça lit vite (puissance de calcul : lire un long prompt) ; les cartes se parlent-elles bien (NVLink, PCIe ou réseau : répartir un modèle)
- **À l'oral** : la grille de lecture pour comparer des machines. Expliquer bande passante mémoire, lecture du prompt / génération et NVLink en une phrase chacun
- **Compléments** : « est-ce que ça tourne » demande parfois une compilation dédiée du modèle pour la carte. La lecture du prompt est là où les Mac et les petites machines décrochent le plus. Les RTX PRO 6000 n'ont pas de NVLink, et passer d'un serveur à l'autre par le réseau est lent

### 18. Le réflexe à retenir (`speed-formula`)

- **Progression** : arrivée : la bande passante mémoire ; clic 1 : ÷ poids lus par token ; clic 2 : = plafond de vitesse ; clic 3 : le pied de slide
- **À l'écran** : bande passante mémoire (ex. 1,6 To/s) ÷ poids lus par token (ex. 16 Go) = plafond de vitesse (~100 tokens/s, un utilisateur seul). « Pour chaque token généré, la carte relit tous les poids utiles : un bon moteur atteint environ 80 % de ce plafond »
- **À l'oral** : la formule à retenir pour estimer une machine avant de l'acheter. Seul le décodage spéculatif permet de dépasser ce plafond
- **Compléments** : l'exemple est notre RTX PRO 6000 Server Edition (1 597 Go/s) avec Qwen3.8-27B en 4 bits. Source de la méthode : vidéo sur Lithos Metal et le plafond de bande passante, https://youtu.be/L7noXCBSObc

### 19. Plafond de vitesse, un utilisateur seul (`speed-ceiling`)

- **Progression** : arrivée : le sous-titre et les 5 premières machines (DGX Spark à Mac Studio M5 Ultra) ; clic 1 : la RTX PRO 6000 ; clic 2 : H100 et H200
- **À l'écran** : barres, Qwen3.8-27B en 4 bits : DGX Spark ~17, L4 ~19, Mac M5 Max ~38, L40S ~54, Mac Studio M5 Ultra ~75, RTX PRO 6000 ~100 (nos cartes), H100 SXM ~210, H200 ~300 tok/s. Badge extrapolé
- **À l'oral** : la bande passante varie d'un facteur 30 entre une machine de bureau et un GPU de datacenter. On ne maximise pas mémoire et vitesse à la fois sans payer cher : Mac et DGX Spark ont beaucoup de mémoire mais sont lents ; une 5090 est rapide mais tient peu ; la RTX PRO 6000 est le compromis
- **Compléments** :
  - Tous ces chiffres sont des plafonds théoriques, y compris pour nos cartes (le badge « Nos cartes » ne signifie pas une mesure)
  - Bandes passantes : DGX Spark 273 Go/s, L4 300 Go/s, M5 Max 614 Go/s, L40S 864 Go/s, M5 Ultra 1,2 To/s, RTX PRO 6000 Server Edition 1 597 Go/s (Workstation 1 792), H100 PCIe 2 To/s, H100 SXM 3,35 To/s, H200 4,8 To/s, B200 8 To/s
  - Le M5 Max 32 cœurs GPU (460 Go/s) est limité à 36 Go ; il faut la version 40 cœurs pour 128 Go
  - Les chiffres « AI TOPS » des fiches GeForce et RTX PRO sont en FP4 ou FP8 avec sparsité : 2 à 4 fois les chiffres utiles
  - Tableau complet sur 17 machines, avec la puissance de calcul et les sources constructeurs, dans l'annexe du chapitre 3

### 20. Le MoE change la donne (`moe`)

- **Progression** : arrivée : « lu à chaque token » ; clic 1 : « à loger en mémoire » ; clic 2 : le chiffre mesuré ; clic 3 : le pied de slide
- **À l'écran** : lu à chaque token : 16 Go pour Qwen3.8-27B en 4 bits, 6 Go pour Flash-Next. À loger en mémoire : Flash-Next 186 Go, 2 RTX PRO 6000 192 Go (ça tient), 2 H100 160 Go (ça ne tient pas). Mesuré : ~200 tok/s sur 2 RTX PRO 6000 avec un utilisateur, ~127 tok/s par requête en production
- **À l'oral** : un modèle 5 fois plus gros que le 27B va presque 3 fois plus vite, parce qu'il relit 6 Go par token au lieu de 16. En contrepartie, il faut pouvoir le loger en entier : la mémoire compte autant que la vitesse
- **Compléments** :
  - Comment on le fait tenir (pas de détail de configuration sur scène) : FP8 officiel réparti sur les 2 cartes ; les 51B d'embeddings n-gram déportés en RAM CPU ; 18,2 Gio de KV cache par carte, soit 1,17 million de tokens au total, environ 6 conversations simultanées au contexte maximal ; communication en PCIe, sans NVLink
  - Plafond théorique sans décodage spéculatif : ~265 tok/s. Le MTP produit 2,8 tokens par passe (61 % d'acceptation) ; ce sont les surcoûts (échanges entre cartes sans NVLink, kernels MoE non optimisés pour la carte) qui dominent. La formule donne un plafond, pas une prévision
  - Production sur 3 semaines : ~9 400 requêtes, premier token en 0,64 s en moyenne, 10,4 s de bout en bout
  - En location, il faudrait 4 × L40S (non testé) ou 4 × H100
  - Grâce à l'attention hybride, le KV cache de ces modèles est plusieurs fois plus petit qu'avec une attention classique

### 21. Le matériel par catégorie de modèles (`hardware-by-category`)

- **Progression** : arrivée : l'en-tête et la catégorie 1 ; clics 1 à 3 : catégories 2, 3 et 4
- **À l'écran** : 1. petits modèles : L4, RTX PRO 4500, < 100 k€, 500 – 600 €/mois (L4 testée). 2. milieu de gamme : 1 RTX PRO 6000, L40S, H100, < 100 k€, 1 000 – 2 100 €/mois (testé). 3. le cap d'août : 2 RTX PRO 6000, 50 – 70 k€, 4 000 – 9 300 €/mois (interne testé, location extrapolée). 4. hors de portée : 8 H200 et plus, > 1 M€, 30 700 – 43 800 €/mois (extrapolé)
- **À l'oral** : la réponse à la démarche de la slide 7 : un budget, une catégorie, un matériel. Distinguer ce qu'on a testé de ce qui est extrapolé
- **Compléments** :
  - Catégorie 1 : aussi RTX PRO 2000 / 4000 SFF ; des modèles ont bien tourné sur L4 en location
  - Catégorie 2 : ~31 Go en FP8 (~16 Go en 4 bits) plus le KV cache ; RTX 5090 ou RTX PRO 4500 en 4 bits possibles
  - Catégorie 3 : en location, 4 × L40S 4 000 – 4 300 €/mois ou 4 × H100 7 800 – 9 300 €/mois ; 2 H100 ne suffisent pas
  - Nos cartes : 3 RTX PRO 6000 Blackwell Server Edition réparties sur 2 serveurs

### 22. Deux approches pour héberger en interne (`two-approaches`)

- **Progression** : arrivée : la carte salle serveur ; clic 1 : la carte datacenter ; clic 2 : le pied de slide
- **À l'écran** : salle serveur (non industrialisée ; Mac Studio, DGX Spark, cartes non Server Edition ; pour l'interne et les labs ; attention à l'électricité et à la chaleur) ; datacenter (vraie industrialisation ; cartes Server Edition et datacenter ; obligatoire pour une offre aux clients ; coût et délai de mise en place). « Certaines cartes rentrent dans un serveur classique : L4, RTX PRO 4500 Server Edition »
- **À l'oral** : la première peut servir à l'interne et aux labs ; la seconde est obligatoire pour une offre aux clients. Une offre aux clients impose à la fois l'approche datacenter et une licence de modèle qui l'autorise (lien avec la slide 14)
- **Compléments** :
  - Tests sur Mac Studio : ça marche, mais l'écosystème NVIDIA reste le plus simple à exploiter. Mac Studio M5 Ultra jusqu'à 512 Go de mémoire unifiée, DGX Spark 128 Go, mais plus lents que les GPU de datacenter
  - L4 : 72 W, alimentée par le seul port PCIe, demi-hauteur, une seule largeur de slot, refroidissement passif. Vieillissante ; dire « remplacée par la RTX PRO 4500 Server Edition » plutôt que « plus produite »
  - RTX PRO 4500 Server Edition : 32 Go, 800 Go/s, 165 W, une seule largeur de slot, passive
  - Nos RTX PRO 6000 Server Edition : refroidissement passif, châssis serveur obligatoire, 11 % de bande passante en moins que l'édition Workstation

### 23. Objectif, piège, leçon (`hardware-trio`)

- **Progression** : arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon
- **À l'écran** : objectif : des preuves de faisabilité à moindre coût, pour convaincre d'investir plus. Piège : obtenir de petits volumes de cartes est compliqué ; un fournisseur nous a aidés avec son offre « try and buy ». Leçon : passer par la location permet d'y aller petit à petit
- **À l'oral** : _à compléter_ (le trio se suffit à lui-même ; ajouter une anecdote si besoin)
- **Compléments** : —

## 4. Les moteurs d'inférence (4 min)

### 24. Nos moteurs d'inférence (`our-engines`)

- **Progression** : arrivée : vLLM ; clic 1 : SGLang ; clic 2 : MLX ; clic 3 : le pied de slide
- **À l'écran** : vLLM, notre moteur principal (testé) ; SGLang, ponctuellement, certains modèles y sont mieux servis (testé) ; MLX, sur Mac, un moteur dédié (extrapolé). « Le modèle et le matériel orientent le choix du moteur »
- **À l'oral** : certains modèles sont mieux optimisés sur un moteur que sur l'autre, et le matériel joue aussi
- **Compléments** : sur Mac, la vidéo citée à la slide 18 présente aussi Lithos et OMLX

### 25. Un paysage qui bouge vite (`engine-cycle`)

- **Progression** : arrivée : une optimisation apparaît ; clic 1 : les moteurs leaders l'intègrent ; clic 2 : les autres moteurs à suivre
- **À l'écran** : une optimisation apparaît, souvent sous la forme d'un nouveau moteur ; les moteurs leaders l'intègrent, rapidement. « D'autres moteurs à suivre : llama.cpp, Ollama, TensorRT-LLM, MLX… »
- **À l'oral** : le cycle observé, d'où l'intérêt de la veille (slide suivante)
- **Compléments** : le même cycle vaut pour les modèles : Flash-Next a d'abord tourné sur une image vLLM dédiée au modèle, avant que son support arrive dans une version stable (vLLM 0.30.0, adoptée le 25/09)

### 26. La veille paie (`engine-watch`)

- **Progression** : arrivée : « +11 % » et sa légende ; clic 1 : le pied de slide
- **À l'écran** : « +11 % » de vitesse de génération sur Qwen3.8-Flash-Next (180 → 200 tok/s), juste en passant à vLLM 0.30.0. « Même matériel, même modèle : seule la version du moteur a changé ». Badge mesuré
- **À l'oral** : une simple mise à jour du moteur peut apporter un gain notable
- **Compléments** (le vécu sur Blackwell, pour les questions) :
  - Fork ou upstream : avant Qwen, un autre gros MoE tournait sur ces cartes ; un fork communautaire de vLLM optimisé Blackwell a été essayé, puis un retour à vLLM 0.26, qui échouait faute de kernel
  - Les cartes récentes sont moins bien servies : pas de réglages MoE fournis pour la RTX PRO 6000, compilations à la volée au premier passage de certaines formes de calcul
  - Sans NVLink, un réglage par défaut ne convient pas : depuis vLLM 0.29, un nouvel algorithme d'échange entre cartes est actif par défaut ; il a fallu revenir à NCCL seul
  - Décodage spéculatif MTP : 3 tokens proposés, 61 % d'acceptation, 2,8 tokens produits par passe

### 27. Objectif, piège, leçon (`engines-trio`)

- **Progression** : arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon
- **À l'écran** : objectif : tout simplement tester les modèles. Piège : l'inférence, c'est très technique ; se plonger dans la documentation devient utile pour tirer le meilleur de nos cartes. Leçon : faire de la veille, une mise à jour peut rapporter autant qu'un changement de matériel
- **À l'oral** : _à compléter_
- **Compléments** : voir les compléments de la slide 26

## 5. La plateforme LLM (6 min)

### 28. Le chemin en trois étapes (`platform-path`)

- **Progression** : arrivée : le moteur en direct ; clic 1 : la passerelle maison ; clic 2 : LiteLLM ; clic 3 : le pied de slide
- **À l'écran** : le moteur en direct (vite limité pour diversifier les usages) ; une passerelle maison devant chaque moteur (autant de points d'accès) ; LiteLLM, une passerelle centralisée open source. « LiteLLM, c'est l'industrialisation de ce qu'on avait commencé avec la passerelle maison »
- **À l'oral** : au début, des versions souvent préliminaires de vLLM, parce que chaque nouveau modèle demandait de nouvelles fonctionnalités au moteur. La passerelle maison gérait les jetons d'accès, mais multipliait les points d'accès que les services devaient connaître. C'est en cherchant une passerelle unique qu'on a trouvé LiteLLM
- **Compléments** : expliquer « passerelle LLM » en une phrase : le point d'entrée unique devant tous les modèles, qui gère accès, droits et suivi

### 29. Le cœur : les jetons et leur suivi (`tokens`)

- **Progression** : arrivée : les droits fins ; clics 1 à 3 : le suivi natif, OpenTelemetry, les API en entrée et en sortie
- **À l'écran** : droits fins sur les modèles par équipe, utilisateur et clé d'API ; suivi natif de la consommation ; OpenTelemetry pour aller plus loin ; autour, une centaine de types d'API en entrée et une quarantaine de formats en sortie
- **À l'oral** : le cœur de LiteLLM, c'est la finesse de gestion des jetons et de leur suivi. Le nombre d'API vient en second
- **Compléments** : le chiffre d'une quarantaine de formats en sortie est celui de l'orateur, non sourcé dans la doc. OpenTelemetry : le standard ouvert pour collecter métriques, traces et journaux

### 30. Communautaire ou entreprise ? (`editions`)

- **Progression** : arrivée : la carte communautaire ; clic 1 : la carte entreprise ; clic 2 : le pied de slide
- **À l'écran** : communautaire, très permissive, suffit largement en interne (testé) ; entreprise : organisations, monitoring plus fin, refacturation, SSO (d'après la doc). « Comme pour l'hébergement et les licences : une offre aux clients change les exigences »
- **À l'oral** : pour commercialiser soi-même une plateforme basée sur LiteLLM, la version entreprise devient très intéressante. Troisième « interne ou clients » du talk, après l'hébergement (slide 22) et les licences (slide 14)
- **Compléments** : d'après la doc LiteLLM (20/10/2026, https://docs.litellm.ai/docs/enterprise) : l'open source couvre déjà passerelle compatible OpenAI, clés virtuelles, utilisateurs, équipes, suivi des dépenses, budgets, bascules et journalisation ; l'entreprise ajoute SSO (gratuit jusqu'à 5 utilisateurs depuis la v1.76.0), SCIM, organisations et administrateurs délégués, journaux d'audit, routage des logs par clé ou par équipe, déploiement multi-région

### 31. Les paliers, une question de gouvernance (`tiers`)

- **Progression** : arrivée : palier 1 ; clics 1 et 2 : paliers 2 et 3 ; clic 3 : le pied de slide
- **À l'écran** : palier 1, en interne (nos modèles, sur nos cartes) ; palier 2, en France (les gros modèles chez des hébergeurs français) ; palier 3, clouds US (seulement quand il le faut). « Une fois la passerelle en place, tout est possible : qui accède à quel modèle, quand on bascule, avec quelles données »
- **À l'oral** : ce n'est plus une question technique, c'est une question de gouvernance. C'est aussi la mise à l'échelle : les modèles de catégorie 4 passent par le palier 2 (slide 10)
- **Compléments** : le palier 3 sert par exemple au développement agentique ; Claude y est utilisé aujourd'hui pour les profils architecte et lead (slides 40 et 44)

### 32. Objectif, piège, leçon (`platform-trio`)

- **Progression** : arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon
- **À l'écran** : objectif : délivrer les modèles sur un point unique, avec une gestion fine des droits et un bon suivi. Piège : partir en direct sur les moteurs, ou sur une passerelle maison. Leçon : avec une passerelle centralisée, le routage par paliers n'est plus technique, c'est de la gouvernance
- **À l'oral** : _à compléter_
- **Compléments** (régler le service sur l'usage réel, pour les questions) :
  - Réserver 95 % de la VRAM a fait planter le moteur sur un long prompt : retour à 90 %
  - Contexte ramené de 262k à 196k tokens et 12 conversations simultanées au maximum, après analyse des longueurs de prompts réels : de 116 requêtes suspendues faute de mémoire à 0
  - Niveau de réflexion `medium` imposé par défaut, `high` posait problème
  - Environ 45 % des tokens de prompt déjà en cache ; un redémarrage coûte environ 4 minutes

## 6. Les usages (10 min)

### 33. Trois types d'usages (`usage-types`)

- **Progression** : arrivée : généraliste ; clics 1 et 2 : développeurs, intégrations ; clic 3 : le constat
- **À l'écran** : généraliste (tous les utilisateurs, un outil de chat : LibreChat) ; développeurs (agents de code : OpenCode, DeepSeek Harness) ; intégrations (le modèle dans un outil existant, par API). « Dès le 27B et le Flash-Next, ça devient intéressant. Les développeurs sont les plus exigeants ; le chat et les intégrations impressionnent déjà ». Badge « Tout est testé »
- **À l'oral** : les besoins les plus intenses sont ceux des développeurs, c'est là qu'il faut le plus de compromis. Pour le chat et les intégrations, on fait déjà des choses vraiment très impressionnantes
- **Compléments** : —

### 34. Un ChatGPT interne (`internal-chat`)

- **Progression** : arrivée : la carte Open WebUI ; clic 1 : la carte LibreChat
- **À l'écran** : Open WebUI (le candidat naturel ; la main sur énormément de paramètres ; trop complexe pour des utilisateurs standards ; gardé pour l'équipe IA) ; LibreChat (ergonomique ; pensé pour les utilisateurs standards)
- **À l'oral** : Open WebUI, anciennement Ollama WebUI, était le candidat naturel. On est parti sur LibreChat pour son côté ergonomique. L'équipe IA garde Open WebUI pour pousser certains tests très loin
- **Compléments** : —

### 35. Objectif, piège, leçon (`chat-trio`)

- **Progression** : arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon
- **À l'écran** : objectif : proposer un ChatGPT interne. Piège : partir sur le candidat naturel, Open WebUI, trop complexe pour des utilisateurs standards. Leçon : pour les utilisateurs finaux, il faut faire simple et ergonomique
- **À l'oral** : _à compléter_
- **Compléments** : —

### 36. Deux leviers, un palier net (`dev-levers`)

- **Progression** : arrivée : avant août ; clic 1 : DeepSeek-V4-Flash-0731 ; clic 2 : Qwen3.8-Flash-Next
- **À l'écran** : avant août, la capacité minimale des modèles coinçait ; DeepSeek-V4-Flash-0731, le premier levier ; Qwen3.8-Flash-Next, le second
- **À l'oral** : on note clairement un palier avec les modèles d'août
- **Compléments** : voir les slides 8 et 12

### 37. Le harness, un vrai levier (`harness`)

- **Progression** : arrivée : ce qu'est le harness ; clics 1 à 3 : il pousse le modèle, plus d'itérations, l'électricité
- **À l'écran** : le harness, c'est l'application autour du modèle (outils, skills, prompts système) ; c'est souvent lui qui pousse le modèle dans ses retranchements ; quand on ne compte plus au jeton, il peut faire plus d'itérations pour arriver au résultat ; ça consomme un peu plus d'électricité, mais c'est négligeable sur l'ensemble
- **À l'oral** : le harness compte autant que le modèle. En auto-hébergé, on n'est plus limité à compter les tokens dont on a besoin
- **Compléments** : lecture du prompt observée en production : 1 300 à 2 000 tok/s en usage courant, pics à 14 000 tok/s grâce au cache de préfixes. Pour un agent qui lit 6 tokens pour 1 écrit, c'est cette vitesse qui compte

### 38. Deux harness open source (`two-harnesses`)

- **Progression** : arrivée : la carte OpenCode ; clic 1 : la carte DeepSeek Harness ; clic 2 : le pied de slide
- **À l'écran** : OpenCode (licence MIT ; gère encore mal l'arrivée en limite de contexte) ; DeepSeek Harness (licence MIT, août 2026 ; approche web only, système jeune ; mais des promesses très belles). « En proposer deux permet de s'adapter aux limites de chacun »
- **À l'oral** : chaque harness a ses limites ; en proposer deux permet de les contourner
- **Compléments** :
  - OpenCode : https://github.com/sst/opencode
  - DeepSeek Harness (`dsh`) : architecture « tout est plugin » (basée sur Cordis), en developer preview (changements incompatibles annoncés). L'interface web est servie en local (`dsh web`, port 3080) ; l'application de bureau n'est qu'une coquille Electron autour de cette même interface. Accès à distance par un reverse proxy. Versions encore en alpha / rc fin octobre 2026. https://github.com/deepseek-ai/deepseek-harness
  - La configuration d'un endpoint auto-hébergé n'est pas documentée

### 39. Et les images ? (`vision`)

- **Progression** : arrivée : la carte « avant » ; clic 1 : la carte « depuis Flash-Next »
- **À l'écran** : avant, deux modèles : DeepSeek-V4-Flash ne lit que du texte, Qwen3.8-27B décrivait les captures à sa place. Depuis Flash-Next : un vrai modèle multimodal, il lit lui-même captures et maquettes, la qualité a progressé en développement
- **À l'oral** : simuler un modèle multimodal en combinant deux modèles, ça dépanne ; un vrai modèle multimodal reste bien plus performant sur la vision
- **Compléments** : expliquer « multimodal » en une phrase : un modèle qui comprend aussi les images

### 40. Objectif, piège, leçon (`dev-trio`)

- **Progression** : arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon
- **À l'écran** : objectif : un agent de code assez bon pour que le gain soit significatif. Piège : la capacité des modèles, on garde Claude pour les profils architecte et lead. Leçon : le harness est un levier aussi important que le modèle ; en proposer deux contourne les limites de chacun
- **À l'oral** : le piège rappelle l'aveu du début : Claude reste notre palier 3 (repris en conclusion, slide 44)
- **Compléments** : —

### 41. Trois intégrations, trois maturités (`integrations`)

- **Progression** : arrivée : l'assistant de réunion ; clics 1 et 2 : le RAG, le System One ; clic 3 : le pied de slide
- **À l'écran** : assistant de compte rendu de réunions (transcription) : utilisé tous les jours, même avant la v1 ; RAG dans la gestion documentaire : en test, pas magique, il faut aussi retravailler la documentation ; modèle « System One » pour trier les tickets : preuve de concept. « Surtout des modèles de catégorie 1, qui tiennent sur une L4 dans un serveur classique »
- **À l'oral** : la maturité n'est pas la même. L'assistant de réunion est le plus mature. Le RAG est en test auprès des premiers utilisateurs : on se rend compte qu'il faut retravailler la documentation pour que sa qualité permette une remontée pertinente
- **Compléments** :
  - Expliquer « STT » (transcription) en une phrase
  - Modèle « System One » : réponses typées (choix, oui / non, score) avec une probabilité par réponse, sans générer de texte ; tri, routage, modération. Exemple open source auto-hébergeable : Decision 2.0 de vLLM Semantic Router (Apache 2.0, de 0,6B à 27B, ~7 ms par question pour le 2B), https://hf.co/collections/vllm-sr/decision-20-6ab7cf7bdfb506bf8269cb00

### 42. Objectif, piège, leçon (`integrations-trio`)

- **Progression** : arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon
- **À l'écran** : objectif : des outils pour augmenter la productivité, d'où l'assistant de réunion en premier. Piège : penser que l'IA est magique ; en souverain, ça demande de la veille et de l'adaptation. Leçon : malgré tout, on peut faire des choses impressionnantes en souverain
- **À l'oral** : cette leçon reprend l'objectif annoncé à l'ouverture (slide 3) et prépare le message final
- **Compléments** : —

## 7. Conclusion (3 min)

### 43. Ce qu'on retient (`lessons`)

- **Progression** : arrivée : modèles ; clics 1 à 6 : matériel, moteurs, plateforme, chat, développeurs, intégrations
- **À l'écran** : une leçon par chapitre : modèles, matériel, moteurs, plateforme, chat, développeurs, intégrations
- **À l'oral** : reprendre rapidement les leçons, une par une
- **Compléments** : formulations complètes dans les slides 15, 23, 27, 32, 35, 40 et 42

### 44. Retour à l'aveu (`confession-callback`)

- **Progression** : arrivée : « Claude, c'est notre palier 3 » ; clic 1 : la suite de la phrase ; clic 2 : « n'a rien de contradictoire »
- **À l'écran** : « Claude, c'est notre palier 3 : utilisé là où il apporte le plus, aujourd'hui pour les profils architecte et lead. » puis « Se faire aider par Claude pour construire son IA souveraine n'a rien de contradictoire. »
- **À l'oral** : le seul rappel de l'aveu du début. Le recours par paliers (interne, puis France, puis US seulement quand il le faut) montre que ce n'est pas contradictoire
- **Compléments** : —

### 45. Le message final (`final-message`)

- **Progression** : arrivée : « La preuve est là » ; clic 1 : les modèles déjà disponibles ; clic 2 : « même si demain… »
- **À l'écran** : « La preuve est là : c'est possible. » « Les modèles déjà disponibles permettent de faire des choses incroyables… » « … même si demain les Américains et les Chinois arrêtent de partager. »
- **À l'oral** : la preuve est là : les modèles des catégories 1 à 3 sont téléchargés et tournent sur notre matériel ; on les garde même si les éditeurs arrêtent de publier
- **Compléments** : nuance possible pour les questions : les poids sont chez nous, mais la licence suit (slide 14)

### 46. Merci, des questions ? (`thanks`)

- **Progression** : pas de clic, les liens s'enchaînent à l'arrivée
- **À l'écran** : les slides (juliendelrio.github.io/Conf-2026-11-IASouveraineOpenSource), site (juliendelrio.fr), LinkedIn (linkedin.com/in/juliendelrio), X (x.com/juliendelrio). Julien Del Rio · Capitole du Libre 2026
- **À l'oral** : place aux questions (une dizaine de minutes)
- **Compléments** : l'annexe du storyline sert de réserve pour les questions
