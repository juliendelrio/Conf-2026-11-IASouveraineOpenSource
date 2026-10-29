# 1. Petit lexique (3 min)

Les définitions affichées viennent de `lexique.md` : ici, on ne choisit que les termes et leur ordre.

## glossary-1
type : lexique
rubrique : Petit lexique
titre : Les mots pour suivre (1/2)
- Inférence
- Paramètres, poids
- Open weights
- Quantization
- Token

#### Progression

arrivée : inférence ; clics 1 à 4 : paramètres / poids, open weights, quantization, token

#### À l'oral

une métaphore par terme, pas de maths. Insister sur « open weights » : on récupère les poids, pas forcément les données ni le code d'entraînement, et ce n'est pas de l'open source (repris à la slide 14)

#### Compléments

les autres termes sont expliqués là où ils apparaissent (affinage, multimodal, STT au chapitre modèles ; bande passante mémoire, lecture du prompt / génération, NVLink au chapitre matériel ; passerelle LLM, OpenTelemetry, SSO au chapitre plateforme). Termes de réserve pour les questions dans l'annexe du lexique : diarisation, décodage spéculatif, SXM vs PCIe, tensor parallelism, tokens de réflexion, TTFT, batching continu, API compatible OpenAI, cache de préfixes

## glossary-2
type : lexique
rubrique : Petit lexique
titre : Les mots pour suivre (2/2)
- VRAM
- Contexte, KV cache
- MoE
- Agentique
- Harness

#### Progression

arrivée : VRAM ; clics 1 à 4 : contexte / KV cache, MoE, agentique, harness

#### À l'oral

la VRAM est la vraie ressource rare ; plus une conversation est longue, plus elle consomme de mémoire ; un MoE ne fait travailler qu'une partie du modèle à chaque token ; le harness est l'application autour du modèle (repris au chapitre usages)

#### Compléments

voir la slide 5
