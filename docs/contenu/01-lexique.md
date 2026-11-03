# 1. Petit lexique (1 min 30)

Les définitions affichées viennent de `lexique.md` : ici, on ne choisit que les termes et leur ordre.

## glossary
type : lexique
rubrique : Petit lexique
titre : Les mots pour suivre
- Paramètres, poids
- Open weights
- Quantization
- Token
- VRAM

#### Progression

arrivée : paramètres / poids ; clics 1 à 4 : open weights, quantization, token, VRAM

#### À l'oral

seulement les mots qui servent dès le chapitre modèles, une métaphore par terme, pas de maths. Insister sur « open weights » : on récupère les poids, pas forcément les données ni le code d'entraînement, et ce n'est pas de l'open source (repris à la slide 13). La VRAM est la vraie ressource rare

#### Compléments

les autres termes sont expliqués là où ils servent : MoE (slide 12, puis 19), contexte et KV cache (slide 16), inférence (slide 23), agentique (slide 34), harness (slides 5 et 37) ; et aussi affinage, multimodal, STT, Model as a Service au chapitre modèles ; bande passante mémoire, lecture du prompt / génération, NVLink au chapitre matériel ; passerelle LLM, OpenTelemetry, SSO au chapitre plateforme. Termes de réserve pour les questions dans l'annexe du lexique : diarisation, décodage spéculatif, SXM vs PCIe, tensor parallelism, tokens de réflexion, TTFT, batching continu, API compatible OpenAI, cache de préfixes
