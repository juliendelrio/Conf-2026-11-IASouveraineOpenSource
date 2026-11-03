# 7. Conclusion (3 min 30)

## architecture
type : architecture
rubrique : Conclusion
titre : Toute la stack, brique par brique
badges : {testé: Testé}
pied : Réversible : chaque brique se remplace, modèle, moteur ou fournisseur, derrière la même passerelle

### Les usages
- LibreChat : MIT
- Open WebUI, équipe IA : licence maison
- OpenCode, DeepSeek Harness : MIT
- Les applications, par API

### La passerelle
texte : droits, budgets, suivi, alias de modèles
surligné : oui
- LiteLLM : MIT

### Palier 1 : en interne
- vLLM, SGLang : Apache 2.0
- 3 RTX PRO 6000
- Modèles open weights

### Palier 2 : en France
- Scaleway
- OVHcloud
- Mistral AI

### Palier 3 : clouds US
- Seulement quand il le faut

#### Progression

arrivée : les usages ; clic 1 : la passerelle ; clic 2 : les trois paliers ; clic 3 : le pied de slide

#### À l'oral

le schéma reproductible annoncé : chaque brique avec sa licence. Réversible : on a basculé plusieurs fois le 27B (Qwen 3.5, puis 3.6, puis 3.8) sans souci, et de DeepSeek-V4-Flash à Flash-Next. Des alias génériques couvrent certaines tâches ; pour les autres, on prévient les utilisateurs du changement de nom de modèle. Dans un cadre d'entreprise, ce n'est pas bloquant : on maîtrise

#### Compléments

- Licences : vLLM et SGLang Apache 2.0 ; LiteLLM MIT (hors dossier entreprise) ; LibreChat, OpenCode et DeepSeek Harness MIT ; Open WebUI sous licence maison depuis la v0.6.6
- Alias : le nom de modèle appelé par les applications est un nom générique que LiteLLM associe au modèle déployé

## lessons
type : tableau
rubrique : Conclusion
titre : Ce qu'on retient
largeurs : 0.9fr 3fr
taille : 30
clics : aucun

| Chapitre | La leçon |
|---|---|
| Modèles | Un saut tous les 3 mois : aujourd'hui, les modèles compensent l'obsolescence des GPU |
| Matériel | La location permet d'y aller petit à petit |
| Moteurs | Faire de la veille : une mise à jour peut apporter un gain notable |
| Plateforme | Avec une passerelle centralisée, les paliers deviennent de la gouvernance |
| Chat | Pour les utilisateurs finaux, simple et ergonomique |
| Développeurs | Le harness compte autant que le modèle |
| Intégrations | On fait déjà des choses impressionnantes en souverain |

#### Progression

pas de clic : les leçons s'enchaînent à l'arrivée

#### À l'oral

reprendre rapidement les leçons, en 30 secondes au plus

#### Compléments

formulations complètes dans les slides 15, 25, 29, 37, 40, 44 et 46

## confession-callback
type : déclaration
rubrique : Retour à l'aveu
- Claude, c’est notre palier 3 :
- utilisé là où il apporte le plus, aujourd’hui pour les profils architecte et lead.
- ==Se faire aider par Claude pour construire son IA souveraine n’a rien de contradictoire.==

#### Progression

arrivée : « Claude, c'est notre palier 3 » ; clic 1 : la suite de la phrase ; clic 2 : « n'a rien de contradictoire »

#### À l'oral

le seul rappel de l'aveu du début. Le recours par paliers (interne, puis France, puis US seulement quand il le faut) montre que ce n'est pas contradictoire

#### Compléments

—

## failover
type : animation
scène : coupure
rubrique : Conclusion
titre : Le même scénario, avec une passerelle
- Nos usages passent par la passerelle
- Accès coupé ou prix qui double
- La passerelle bascule : nos modèles prennent le relais

### Nos usages
texte : Chat, code, intégrations

### LiteLLM
texte : La passerelle

### Un cloud US
texte : Le palier 3
détail : Prix × 2

### Nos modèles
texte : Nos cartes, hébergeurs français

#### Progression

arrivée : les requêtes passent par LiteLLM vers le cloud US ; clic 1 : accès coupé ou prix qui double ; clic 2 : la passerelle bascule vers nos modèles

#### À l'oral

la scène de l'ouverture (slide 3), rejouée avec ce qu'on a construit : la passerelle bascule vers les paliers 1 et 2, le service continue. Enchaîner sur le message final

#### Compléments

Illustration en motion design, pas une mesure ni un incident vécu. Issue #6

## final-message
type : déclaration
- ==La preuve est là : c’est possible.==
- Les modèles déjà disponibles permettent de faire des choses incroyables…
- … même si demain les Américains et les Chinois arrêtent de partager.
- ==Accès coupé ou prix qui doublent : les modèles sont chez nous.==

#### Progression

arrivée : « La preuve est là » ; clic 1 : les modèles déjà disponibles ; clic 2 : « même si demain… » ; clic 3 : la réponse à l'enjeu de l'ouverture

#### À l'oral

la réponse à la question de l'ouverture (slide 4). La preuve est là, et c'est ce que l'open source apporte : pas de coupure subie ni de hausse de prix imposée, on peut toujours faire au moins ce qu'on fait déjà. Les modèles des catégories 1 à 3 sont téléchargés et tournent sur notre matériel ; on les garde même si les éditeurs arrêtent de publier, mais sans nouveaux gains. Donner le contexte : le Flash-Next n'est en production que depuis quelques semaines (~9 400 requêtes sur 3 semaines)

#### Compléments

nuance possible pour les questions : les poids sont chez nous, mais la licence suit (slide 14)

## thanks
type : merci
rubrique : Conclusion
titre : Merci ! Des questions ?
signature : Julien Del Rio · Capitole du Libre 2026
clics : aucun

| Libellé | Lien |
|---|---|
| Les slides | juliendelrio.github.io/Conf-2026-11-IASouveraineOpenSource |
| Site | juliendelrio.fr |
| LinkedIn | linkedin.com/in/juliendelrio |
| X | x.com/juliendelrio |

#### Progression

pas de clic, les liens s'enchaînent à l'arrivée

#### À l'oral

place aux questions (une dizaine de minutes)

#### Compléments

l'annexe du storyline sert de réserve pour les questions
