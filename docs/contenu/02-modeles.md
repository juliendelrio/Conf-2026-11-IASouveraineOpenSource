# 2. Les modèles (8 min)

## models-why
type : étapes
rubrique : Les modèles
titre : Commencer par la finalité
pied : Avant de parler cartes et serveurs, savoir ce qu'on veut faire tourner

### Fixer un budget
texte : Interne ou location

### Choisir une catégorie de modèles
texte : Ce que ce budget permet de faire tourner
surligné : oui

### En déduire le matériel
texte : Le chapitre suivant

#### Progression

arrivée : fixer un budget ; clic 1 : choisir une catégorie ; clic 2 : en déduire le matériel ; clic 3 : le pied de slide

#### À l'oral

pourquoi commencer par les modèles : c'est la finalité. Les 4 catégories qui suivent servent à aider à la décision

#### Compléments

—

## august
type : liste
rubrique : Les modèles
titre : Août 2026, le cap franchi
badges : {testé: Testé} {extrapolé: Niveau Opus : selon les éditeurs}
pied : Plus besoin d'un cluster de H200 pour des tâches générales
- DeepSeek-V4-Flash-0731 (31 juillet) et Qwen3.8-Flash-Next (24 août)
- Sur 2 cartes, autour de Claude Opus 4.6 à 4.8
- Les premiers modèles vraiment utilisables en entreprise, codage compris
- Et les outils arrivent en même temps : DeepSeek Harness

#### Progression

arrivée : les deux modèles et leurs dates ; clics 1 à 3 : sur 2 cartes au niveau d'Opus, utilisables en entreprise, DeepSeek Harness ; clic 4 : le pied de slide

#### À l'oral

c'est l'accroche du talk, à placer tôt. Plus besoin d'un cluster de H200 pour des tâches générales. Août, ce n'est pas seulement de meilleurs modèles, ce sont aussi les outils pour les exploiter

#### Compléments

- Comparaisons publiées par les éditeurs, à présenter comme telles : DeepSeek-V4-Flash-0731, Terminal Bench 2.1 82,7 contre 85,0 pour Opus 4.8 ; Flash-Next comparé à Opus 4.6 Max dans sa fiche
- DeepSeek Harness a été publié dans la foulée de DeepSeek-V4-Flash-0731 comme démonstrateur de code (dépôt créé le 13 août 2026)
- Également sortis en août : Qwen3.8-27B (le 5 ; Terminal Bench 2.1 : 73,0 contre 78,2 pour Opus 4.6 Max selon la fiche) et Qwen3.8-2.4T-A95B (le 8)

## categories
type : tableau
rubrique : Les modèles
titre : Quatre catégories pour décider
largeurs : 1.1fr 1.4fr 2fr 1.1fr
taille : 28
ligne-surlignée : 3
pied : Catégorie 4 : plus d'un million d'euros. Les trois autres : moins de 100 k€ en interne, et une location accessible à une PME

| Catégorie | Pour quoi faire | Modèles | Chez nous |
|---|---|---|---|
| 1. Petits modèles | RAG, transcription, résumé, traduction | Qwen3.6-35B, Qwen3.5-9B, Gemma 4, gpt-oss-20b, Mistral Small 3.2 | {testé: En partie} |
| 2. Milieu de gamme | Un généraliste sur une seule carte | Qwen3.8-27B | {testé: Testé} |
| 3. Le cap d'août | Tâches générales, codage compris | Qwen3.8-Flash-Next, DeepSeek-V4-Flash-0731 | {testé: Testé} |
| 4. Hors de portée | Les plus gros modèles open weights | DeepSeek V4-Pro, Kimi K2.6, GLM-5.x, Mistral Large 4, Qwen3.8-2.4T, MiniMax M3… | {extrapolé: Non testé} |

#### Progression

arrivée : l'en-tête et la catégorie 1 ; clics 1 à 3 : catégories 2, 3 et 4 ; clic 4 : le message budget

#### À l'oral

on fixe un budget, on le met en rapport avec ces catégories. La catégorie 4 n'est pas accessible sans un investissement de plus d'un million d'euros ; pour les trois autres, on a des propositions en dessous de 100 k€, voire bien en dessous

#### Compléments

- Catégorie 1, ce qu'on a testé : Qwen 35B ; Gemma 4 et gpt-oss-20b, limités, et c'est justement ce qui les place en catégorie 1 ; Qwen3.5-9B et Mistral Small 3.2 pas testés directement
- Sur une carte de 24 Go comme la L4, Qwen3.6-35B et Mistral Small 3.2 ne tiennent qu'en 4 bits ; sur une L40S (48 Go), en 8 bits
- Mistral Large 4 : publication prévue fin octobre 2026, pas encore sortie au 29/10. Référence en attendant : Mistral-Large-3-675B (~682 Go). Vérifier avant le 14 novembre
- Tailles (Hugging Face, 17/10/2026) : Qwen3.5-9B ~19 Go, gpt-oss-20b ~14 Go, Mistral Small 3.2 ~48 Go, Qwen3.6-35B-A3B ~72 Go

## out-of-reach
type : cartes
rubrique : Les modèles
titre : Hors de portée, mais pas hors de France
badges : {extrapolé: Tailles Hugging Face, catalogues publics}

### Catégorie 4
valeur : 444 Go – 2,5 To
- de poids, avant même le KV cache
- soit 2,3 à 13 fois nos 192 Go

### Le palier 2 : des hébergeurs français
surligné : oui
- Scaleway : par API (GLM, DeepSeek, Qwen)
- OVHcloud : en louant les GPU
- Mistral AI : par API (GLM-5.3)

#### Progression

arrivée : la carte catégorie 4 ; clic 1 : la carte palier 2

#### À l'oral

les plus gros modèles restent accessibles sans quitter la France. C'est la mise à l'échelle, et le lien avec le recours par paliers du chapitre plateforme (slide 31)

#### Compléments

- Tailles relevées sur Hugging Face le 17/10/2026 : MiniMax-M3 ~444 Go, DeepSeek-V4.1-Flash ~510 Go, Kimi-K2.6 ~595 Go, Mistral-Large-3 ~682 Go, GLM-5.1 / 5.2 / 5.3 ~756 Go chacun, DeepSeek-V4-Pro-0813 ~893 Go, Qwen3.8-2.4T ~2,5 To
- Un serveur à 8 RTX PRO 6000 (768 Go) logerait le bas de la catégorie, mais demande une alimentation et un refroidissement hors de portée d'une salle serveur de PME : écarté
- Scaleway Generative APIs (17/10/2026) : GLM-5.3, GLM-5.2, DeepSeek-V4.1-Flash, DeepSeek-V4-Flash-0731, Qwen3.8-27B, Qwen3.5-397B-A17B, Mistral Medium 3.5 ; Mistral Large 3 en déploiement dédié seulement
- OVHcloud : 8 × H200 à ~30 700 €/mois ; son offre AI Endpoints s'arrête à Qwen3.5-397B-A17B
- Mistral AI : GLM-5.2 depuis le 6 août 2026, déprécié le 29/09 au profit de GLM-5.3 (depuis le 15 septembre) ; contexte de 1M tokens, 1,4 $ / 4,4 $ par million de tokens en entrée / sortie

## model-timeline
type : étapes
rubrique : Les modèles
titre : Ce qu'on a vécu
badges : {testé: Testé}
numérotées : non
pied : En parallèle : des modèles de transcription (STT), avec ou sans identification des locuteurs

### Fin 2025
texte : Premiers tests, dont Chocolatine (affiné pour le français)

### Février 2026
texte : Qwen 3.5 : le 35B et le 27B
détail : L40S louées

### Avril 2026
texte : Qwen 3.6 : chaque modèle progresse

### Juin 2026
texte : Qwen 3.6 en FP8
détail : RTX PRO 6000

### Août 2026
texte : Qwen 3.8 et Flash-Next : le cap
détail : RTX PRO 6000
surligné : oui

#### Progression

arrivée : fin 2025 ; clics 1 à 4 : février, avril, juin, août 2026 ; clic 5 : la transcription en parallèle

#### À l'oral

février 2026 est la première vraie étape ; chaque génération améliore chaque taille de modèle ; août est le cap

#### Compléments

Chocolatine est un modèle affiné pour le français. Les tests de transcription ont porté sur les modèles avec ou sans diarisation (qui parle quand), et sur la contextualisation

## code-versions
type : cartes
rubrique : Les modèles
titre : Le code, version par version
badges : {testé: Testé}
pied : Capacité estimée (tests de charge pas complètement poussés) : 5 à 10 développeurs sur Flash-Next, 30 à 50 utilisateurs de chat sur le 27B

### Qwen3.6-27B
- Le premier à commencer à coder
- Mais boucle et plante
- Utile pour des actions ponctuelles

### Août : Qwen3.8-27B et Flash-Next
surligné : oui
- Enfin du vrai code
- Le Flash-Next est autonome, comme Opus 4.6 / 4.7 quelques mois plus tôt

#### Progression

arrivée : la carte Qwen3.6-27B ; clic 1 : la carte août ; clic 2 : la capacité estimée

#### À l'oral

Opus 4.6 / 4.7 étaient déjà très utilisables au quotidien ; on a aujourd'hui ce niveau en interne. Préciser que les tests de charge n'ont pas été complètement poussés

#### Compléments

le Flash-Next tourne exclusivement sur les RTX PRO 6000 et en réserve 2 sur 3 ; pour les tests, ça suffit

## august-models
type : tableau
rubrique : Les modèles
titre : Les deux modèles d'août
badges : {testé: Testés} {extrapolé: Chiffres des fiches}
largeurs : 1fr 1.4fr 1.4fr
taille : 34
clics : 4, 5, 6
pied : Les deux tiennent tout juste dans nos 192 Go

| | DeepSeek-V4-Flash-0731 | Qwen3.8-Flash-Next |
|---|---|---|
| Sortie | 31 juillet 2026 | 24 août 2026 |
| Taille | MoE 284B, 13B actifs | MoE 125B, 6B actifs |
| Poids | ~167 Go | ~186 Go (FP8) |
| Licence | MIT | Licence maison « Qwen Community 1.0 » |
| Lit les images | Non, texte seul | Oui, multimodal |

#### Progression

arrivée : sortie, taille et poids s'enchaînent ; clic 1 : la licence ; clic 2 : la lecture des images ; clic 3 : le pied de slide

#### À l'oral

deux modèles de même niveau, mais une licence ouverte d'un côté, une licence maison de l'autre ; et un seul lit les images (repris à la slide 39). La VRAM restante pour le KV cache est le vrai sujet

#### Compléments

Flash-Next a aussi 51B d'embeddings n-gram et 4B de MTP (décodage spéculatif intégré) ; DeepSeek a son module de décodage spéculatif DSpark, activable dans vLLM et SGLang. Chiffres tirés des fiches des éditeurs

## license
type : liste
rubrique : Les modèles
titre : Open weights ≠ open source
pied : On lit la licence avant de choisir un modèle, comme pour toute dépendance (ce n'est pas un avis juridique)
- Qwen était sous Apache 2.0 : 3.5, 3.6, et encore le 3.8-27B
- Flash-Next passe à une licence maison, « Qwen Community 1.0 »
- Usage interne libre, tant que rien n’est mis à disposition de tiers
- Licence séparée pour du Model as a Service ou un assistant de code, quelle que soit la taille
- Et Qwen 4, attendu dans quelques semaines ?

#### Progression

arrivée : Qwen sous Apache 2.0 ; clics 1 à 4 : licence maison, usage interne libre, licence séparée, et Qwen 4 ? ; clic 5 : « on lit la licence… »

#### À l'oral

point très important. Pour une plateforme interne ça passe ; pour un hébergeur ou un éditeur d'assistant de code, beaucoup moins. Flash-Next est un aperçu de l'architecture Qwen 4, attendue dans quelques semaines : restera-t-elle sous Apache 2.0 ?

#### Compléments

- Licence « Qwen Community 1.0 » lue le 17/10/2026 : usage interne libre tant que ni le modèle, ni ses réponses, ni ses capacités ne sont mis à disposition de tiers ; licence séparée avant tout usage commercial en Model as a Service ou assistant de code / bureautique, quelle que soit la taille ; au-delà de 100 millions d'utilisateurs actifs mensuels ou 20 M$ de revenus mensuels, le nom du modèle doit être affiché
- La licence « Qwen3.8-Max » du 2.4T est identique, sauf que la licence séparée n'est exigée qu'au-delà de 50 M$ de revenus sur 12 mois
- Déduction : c'est sans doute pourquoi Flash-Next n'est pas au catalogue des API de Scaleway
- Les poids sont chez nous, mais la licence suit (idée proposée, non retenue pour l'instant)

## models-trio
type : trio
rubrique : Les modèles
objectif : Un modèle assez bon pour un usage quotidien, code compris, sur notre propre matériel
piège : Le rythme des sorties : déployer pour les utilisateurs tout en testant les nouveaux, c'est exigeant et chronophage
leçon : Un saut de version tous les 3 mois : l'obsolescence des GPU est compensée par les progrès des modèles

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

le piège est plutôt une difficulté : il faut déployer pour les utilisateurs tout en testant les nouveaux modèles, et c'est extrêmement exigeant et chronophage. Mais le même matériel fait tourner des modèles de plus en plus capables

#### Compléments

—
