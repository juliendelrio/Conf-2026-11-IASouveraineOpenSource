# 1. Petit lexique (1 min 45)

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

seulement les mots qui servent dès le chapitre modèles, une métaphore par terme, pas de maths. Insister sur « open weights » : on récupère les poids, pas forcément les données ni le code d'entraînement, et ce n'est pas de l'open source (repris à la slide 15). La VRAM est la vraie ressource rare

#### Compléments

les autres termes sont expliqués là où ils servent : MoE (slide 14, puis 19), contexte et KV cache (slide 19), inférence (slide 29), agentique (slide 44), harness (slides 5 et 48) ; et aussi affinage, multimodal, STT, Model as a Service au chapitre modèles ; bande passante mémoire, lecture du prompt / génération, NVLink au chapitre matériel ; passerelle LLM, OpenTelemetry, SSO au chapitre plateforme. Termes de réserve pour les questions dans l'annexe du lexique : diarisation, décodage spéculatif, SXM vs PCIe, tensor parallelism, tokens de réflexion, TTFT, batching continu, API compatible OpenAI, cache de préfixes
## quantization
type : animation
scène : quantification
rubrique : Petit lexique
titre : La quantization en image
- En 16 bits, Qwen3.8-27B pèse ~54 Go : il ne tient pas sur une carte de 24 Go
- En 8 bits, ~31 Go : toujours trop
- En 4 bits, ~16 Go : il tient, au prix d'un peu de précision

### 16 bits
texte : ~54 Go
détail : 0,7342

### 8 bits
texte : ~31 Go
détail : 0,734

### 4 bits
texte : ~16 Go
détail : 0,75

### Une L4
texte : 24 Go

#### Progression

arrivée : 16 bits, le modèle déborde de la carte ; clic 1 : 8 bits, toujours trop ; clic 2 : 4 bits, il tient

#### À l'oral

le même poids, écrit avec de moins en moins de bits : il s'arrondit, et le modèle rétrécit jusqu'à tenir sur une seule carte. On perd un peu de précision ; c'est ce qui permet de faire tourner un 27B sur une L4 louée

#### Compléments

- Illustration en motion design, pas une mesure. Issue #6. Les valeurs du poids sont illustratives (un vrai format 8 ou 4 bits n'arrondit pas en décimal)
- ~54 Go calculé (27 milliards de paramètres × 2 octets) ; ~31 Go en FP8 et ~16 Go en 4 bits repris du chapitre matériel (slide 25) ; L4 : 24 Go, louée et testée (slide 18). Il faut encore loger le KV cache

