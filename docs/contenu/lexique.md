# Lexique

La source unique des définitions. Les slides de lexique (`01-lexique.md`) affichent les termes qu'elles listent, avec la définition écrite ici. Format d'une entrée : `- **Terme** : définition`.

## Dans l'introduction (slides 5 et 6)

- **Inférence** : Utiliser un modèle déjà entraîné, par opposition à l'entraînement
- **Paramètres, poids** : Ce qu'un modèle « sait », sous forme de nombres : sa taille (27B, 125B…)
- **Open weights** : On récupère les poids, pas forcément les données ni le code : ce n’est pas de l’open source
- **Quantization** : Compresser les poids (16, 8, 4 bits) pour tenir en mémoire, au prix d’un peu de qualité
- **Token** : Le morceau de texte que le modèle lit et produit : l’unité des vitesses et des prix
- **VRAM** : La mémoire de la carte graphique : la vraie ressource rare
- **Contexte, KV cache** : Plus la conversation est longue, plus elle consomme de mémoire
- **MoE** : Mixture of Experts : un gros modèle dont seule une partie travaille à chaque token
- **Agentique** : Un modèle qui enchaîne des actions (lire, exécuter, corriger) au lieu de répondre une fois
- **Harness** : L’application autour du modèle : ses outils, ses skills, ses prompts système

## Expliqués en une phrase là où ils apparaissent

Pas sur une slide de lexique : à dire à l'oral (voir les notes « À l'oral » des slides concernées).

### Les modèles

- **Affinage** (*fine-tuning*) : réentraîner un modèle existant sur des données ciblées (ex. Chocolatine pour le français)
- **Multimodal (vision)** : un modèle qui comprend aussi les images, pas seulement le texte
- **STT** (*speech-to-text*, transcription) : transformer la parole en texte

### Le matériel

- **Bande passante mémoire** : la vitesse à laquelle la carte relit les poids ; fixe la vitesse de génération
- **Lecture du prompt / génération** (*prefill* / *decode*) : deux phases limitées par des ressources différentes (calcul / bande passante)
- **NVLink** : la liaison rapide entre GPU NVIDIA, absente des RTX 6000 Pro

### La plateforme LLM

- **Passerelle LLM** (*LLM gateway*) : le point d'entrée unique devant tous les modèles, qui gère accès, droits et suivi
- **OpenTelemetry (OTel)** : le standard ouvert pour collecter métriques, traces et journaux
- **SSO** : se connecter avec le compte de l'entreprise, sans mot de passe dédié

## Réserve pour les questions

Termes sortis des slides, gardés pour les questions.

- **Diarisation** : savoir qui parle quand dans un enregistrement
- **Décodage spéculatif** : un petit modèle brouillon propose plusieurs tokens, le gros les vérifie en une seule lecture
- **SXM vs PCIe** : le même GPU existe en carte enfichable (PCIe) ou soudé sur une carte mère dédiée (SXM) ; le format change la bande passante et la liaison entre les cartes (H100 : 2 To/s en PCIe, 3,35 To/s et NVLink en SXM)
- **Tensor parallelism** : répartir un modèle sur plusieurs GPU
- **Tokens de réflexion** (mode *thinking*) : ce que le modèle écrit pour « réfléchir » avant de répondre, et qui coûte du temps
- **Temps avant le premier token** (*TTFT*) : ce que l'utilisateur ressent comme la réactivité
- **Batching continu** : servir plusieurs utilisateurs en même temps sur la même carte
- **API compatible OpenAI** : le standard de fait pour brancher les outils
- **Cache de préfixes** : ne pas relire le début d'une conversation déjà lu au tour précédent

## Formulations d'origine (storyline)

Les définitions des termes de l'introduction telles qu'écrites dans le storyline, avant leur adaptation pour l'écran.

#### Formulations

- Inférence : utiliser un modèle déjà entraîné (par opposition à l'entraînement)
- Paramètres / poids : ce qu'un modèle « sait », sous forme de nombres ; la taille d'un modèle (7B, 32B, 235B…)
- Open weights vs open source : on récupère les poids, pas forcément les données ni le code d'entraînement
- Quantization : compresser les poids (16 bits, 8 bits, 4 bits) pour faire tenir le modèle en mémoire, au prix d'un peu de qualité
- Token : l'unité de texte que le modèle lit et produit ; c'est l'unité des débits et des prix
- VRAM : la mémoire de la carte graphique, la vraie ressource rare
- Fenêtre de contexte / KV cache : pourquoi la longueur des conversations consomme de la mémoire
- MoE (Mixture of Experts) : un gros modèle dont seule une partie travaille pour chaque token
- Agentique : un modèle qui enchaîne des actions (lire, exécuter, corriger) au lieu de répondre une seule fois
- Harness : l'application qui encapsule le modèle avec ses outils, ses skills et ses prompts système
