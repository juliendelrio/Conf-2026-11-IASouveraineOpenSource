# 5. La plateforme LLM (6 min)

## platform-path
type : étapes
rubrique : La plateforme
titre : Le chemin en trois étapes
badges : {testé: Testé}
pied : LiteLLM, c'est l'industrialisation de ce qu'on avait commencé avec la passerelle maison

### Le moteur en direct
texte : Vite limité pour diversifier les usages

### Une passerelle maison
texte : Devant chaque moteur : autant de points d’accès

### LiteLLM
texte : Une passerelle centralisée, open source
surligné : oui

#### Progression

arrivée : le moteur en direct ; clic 1 : la passerelle maison ; clic 2 : LiteLLM ; clic 3 : le pied de slide

#### À l'oral

au début, des versions souvent préliminaires de vLLM, parce que chaque nouveau modèle demandait de nouvelles fonctionnalités au moteur. La passerelle maison gérait les jetons d'accès, mais multipliait les points d'accès que les services devaient connaître. C'est en cherchant une passerelle unique qu'on a trouvé LiteLLM

#### Compléments

expliquer « passerelle LLM » en une phrase : le point d'entrée unique devant tous les modèles, qui gère accès, droits et suivi

## tokens
type : liste
rubrique : La plateforme
titre : Le cœur : les jetons et leur suivi
badges : {testé: Testé}
- Des droits fins sur les modèles : par équipe, par utilisateur, par clé d’API
- Un suivi natif de la consommation
- OpenTelemetry pour aller plus loin dans les métriques
- Autour : une centaine de types d’API en entrée, une quarantaine de formats en sortie

#### Progression

arrivée : les droits fins ; clics 1 à 3 : le suivi natif, OpenTelemetry, les API en entrée et en sortie

#### À l'oral

le cœur de LiteLLM, c'est la finesse de gestion des jetons et de leur suivi. Le nombre d'API vient en second

#### Compléments

le chiffre d'une quarantaine de formats en sortie est celui de l'orateur, non sourcé dans la doc. OpenTelemetry : le standard ouvert pour collecter métriques, traces et journaux

## editions
type : cartes
rubrique : La plateforme
titre : Communautaire ou entreprise ?
pied : Comme pour l'hébergement et les licences : une offre aux clients change les exigences

### Communautaire
surligné : oui
badges : {testé: Testé}
- Très permissive
- Suffit largement en interne

### Entreprise
badges : {extrapolé: D’après la doc}
- Organisations
- Monitoring plus fin
- Refacturation
- SSO

#### Progression

arrivée : la carte communautaire ; clic 1 : la carte entreprise ; clic 2 : le pied de slide

#### À l'oral

pour commercialiser soi-même une plateforme basée sur LiteLLM, la version entreprise devient très intéressante. Troisième « interne ou clients » du talk, après l'hébergement (slide 22) et les licences (slide 14)

#### Compléments

d'après la doc LiteLLM (20/10/2026, https://docs.litellm.ai/docs/enterprise) : l'open source couvre déjà passerelle compatible OpenAI, clés virtuelles, utilisateurs, équipes, suivi des dépenses, budgets, bascules et journalisation ; l'entreprise ajoute SSO (gratuit jusqu'à 5 utilisateurs depuis la v1.76.0), SCIM, organisations et administrateurs délégués, journaux d'audit, routage des logs par clé ou par équipe, déploiement multi-région

## tiers
type : étapes
rubrique : La plateforme
titre : Les paliers, une question de gouvernance
badges : {testé: Testé}
pied : Une fois la passerelle en place, tout est possible : qui accède à quel modèle, quand on bascule, avec quelles données

### Palier 1 : en interne
texte : Nos modèles, sur nos cartes
surligné : oui

### Palier 2 : en France
texte : Les gros modèles chez des hébergeurs français

### Palier 3 : clouds US
texte : Seulement quand il le faut

#### Progression

arrivée : palier 1 ; clics 1 et 2 : paliers 2 et 3 ; clic 3 : le pied de slide

#### À l'oral

ce n'est plus une question technique, c'est une question de gouvernance. C'est aussi la mise à l'échelle : les modèles de catégorie 4 passent par le palier 2 (slide 10)

#### Compléments

le palier 3 sert par exemple au développement agentique ; Claude y est utilisé aujourd'hui pour les profils architecte et lead (slides 40 et 44)

## platform-trio
type : trio
rubrique : La plateforme
objectif : Délivrer les modèles sur un point unique, avec une gestion fine des droits et un bon suivi
piège : Partir en direct sur les moteurs, ou sur une passerelle maison
leçon : Avec une passerelle centralisée, le routage par paliers n'est plus technique : c'est de la gouvernance

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

_à compléter_

#### Compléments (régler le service sur l'usage réel, pour les questions)

- Réserver 95 % de la VRAM a fait planter le moteur sur un long prompt : retour à 90 %
- Contexte ramené de 262k à 196k tokens et 12 conversations simultanées au maximum, après analyse des longueurs de prompts réels : de 116 requêtes suspendues faute de mémoire à 0
- Niveau de réflexion `medium` imposé par défaut, `high` posait problème
- Environ 45 % des tokens de prompt déjà en cache ; un redémarrage coûte environ 4 minutes
