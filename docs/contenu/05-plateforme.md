# 5. La plateforme LLM (6 min 45)

## chapter-platform
type : intercalaire
chiffre : 4
titre : La plateforme
- Les modèles
- Le matériel
- Les moteurs
- ==La plateforme==
- Les usages

#### Progression

pas de clic : l'intercalaire s'affiche puis on passe

#### À l'oral

rien, ou juste le nom du chapitre

## platform-path
type : animation
scène : chemin
rubrique : La plateforme
titre : Le chemin en trois étapes
badges : {testé: Testé}
- Le moteur en direct : chaque service se branche sur chaque moteur
- Une passerelle maison par moteur : des jetons d'accès, mais autant de points d'accès
- LiteLLM : un point d'entrée unique, l'industrialisation de la passerelle maison

### Chat

### Code

### Intégrations

### vLLM
texte : un modèle

### vLLM
texte : un autre modèle

### Passerelle
texte : maison
détail : Jetons d'accès

### LiteLLM
texte : open source

#### Progression

arrivée : chaque service branché sur chaque moteur ; clic 1 : une passerelle maison devant chaque moteur, qui vérifie les jetons d'accès (une requête sans jeton valide est refusée) ; clic 2 : LiteLLM au centre, un point d'entrée unique. Les requêtes circulent en boucle tant qu'on n'a pas cliqué

#### À l'oral

au début, des versions souvent préliminaires de vLLM, parce que chaque nouveau modèle demandait de nouvelles fonctionnalités au moteur. L'idée de la passerelle maison : gérer dès le début des jetons d'accès devant les moteurs, pour savoir qui appelle quoi et refuser le reste. Mais elle multipliait les points d'accès que les services devaient connaître. C'est en cherchant une passerelle unique qu'on a trouvé LiteLLM

#### Compléments

- Le chemin est testé, l'animation l'illustre. Illustration en motion design, pas une mesure. Issue #6
- expliquer « passerelle LLM » en une phrase : le point d'entrée unique devant tous les modèles, qui gère accès, droits et suivi

## tokens
type : liste
rubrique : La plateforme
titre : Le cœur : les jetons et leur suivi
badges : {testé: Testé}
- Des droits fins sur les modèles : par équipe, par utilisateur, par clé d’API
- Des budgets et des quotas par équipe et par clé
- Un suivi natif de la consommation, et OpenTelemetry pour aller plus loin
- Autour : une centaine de types d’API en entrée, une quarantaine de formats en sortie

#### Progression

arrivée : les droits fins ; clics 1 à 3 : budgets et quotas, le suivi et OpenTelemetry, les API en entrée et en sortie

#### À l'oral

le cœur de LiteLLM, c'est la finesse de gestion des jetons et de leur suivi. Le nombre d'API vient en second. La facturation : le suivi par équipe donne la base d'une refacturation ; la refacturation intégrée relève de l'édition entreprise (slide suivante)

#### Compléments

- Le chiffre d'une quarantaine de formats en sortie est celui de l'orateur, non sourcé dans la doc. OpenTelemetry : le standard ouvert pour collecter métriques, traces et journaux
- Budgets et quotas dans l'édition communautaire (doc LiteLLM, 02/11/2026) : budget maximal avec remise à zéro périodique, limites de tokens et de requêtes par minute, par clé, par utilisateur et par équipe ; budgets par modèle et par membre d'équipe réservés à l'entreprise

## teams
type : animation
scène : pilotage
rubrique : La plateforme
titre : Un pilotage par équipe
badges : {testé: Testé}
- Chaque équipe a sa clé : LiteLLM sait qui appelle quel modèle
- Les accès : une équipe n'appelle que les modèles qui lui sont ouverts
- Les priorités et la concurrence : l'équipe prioritaire passe, les autres attendent leur tour

### Équipe A
détail : Prioritaire

### Équipe B
détail : Requêtes limitées

### Équipe C
détail : Modèle non autorisé

### LiteLLM
texte : la passerelle

### Un modèle

### Un autre modèle

#### Progression

arrivée : les trois équipes appellent leurs modèles par la passerelle ; clic 1 : l'équipe C demande un modèle non autorisé, refusé ; clic 2 : sous charge, l'équipe A passe en priorité, l'équipe B attend son tour. Les requêtes circulent en boucle tant qu'on n'a pas cliqué

#### À l'oral

ce qu'on fait vraiment des droits par équipe : piloter. Qui a accès à quel modèle, qui passe en premier quand les cartes sont chargées, combien de requêtes une équipe peut lancer en même temps. Les budgets existent aussi, mais c'est surtout ce pilotage qui nous sert : il protège la capacité de nos cartes

#### Compléments

- Le pilotage est testé, l'animation l'illustre. Illustration en motion design, pas une mesure. Issue #6
- D'après la doc LiteLLM (02/11/2026, voir la slide précédente) : modèles autorisés, limites de requêtes et de tokens par minute, budgets avec remise à zéro périodique, par clé, utilisateur et équipe, dans l'édition communautaire

## editions
type : cartes
rubrique : La plateforme
titre : LiteLLM : communautaire ou entreprise ?
pied : En interne, la communautaire suffit. Pour une offre Model as a Service, l'entreprise devient nécessaire

### Communautaire
surligné : oui
badges : {testé: Testé}
- Droits, budgets, suivi, bascules
- Suffit pour de l'interne

### Entreprise
badges : {extrapolé: D’après la doc}
- Organisations, SSO
- Logs avancés
- Rotation des clés
- Compatible avec les gestionnaires de secrets

#### Progression

arrivée : la carte communautaire ; clic 1 : la carte entreprise ; clic 2 : le pied de slide

#### À l'oral

pour construire une offre Model as a Service sur LiteLLM, la version entreprise devient nécessaire. Troisième « interne ou clients » du talk, après l'hébergement (slide 26) et les licences (slide 19)

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

ce n'est plus une question technique, c'est une question de gouvernance. C'est aussi la mise à l'échelle : les modèles de catégorie 4 passent par le palier 2 (slide 17). Le palier 3 existe et on l'assume : c'est un choix, tout peut rester aux paliers 1 et 2

#### Compléments

le palier 3 sert par exemple au développement agentique ; Claude y est utilisé aujourd'hui pour les profils architecte et lead (slides 50 et 56)

## routing
type : animation
scène : routage
rubrique : La plateforme
titre : La passerelle en action
- Par défaut, tout va sur nos cartes
- Pic de charge : le surplus déborde vers le palier 2
- Développement agentique : le palier 3, seulement quand il le faut

### Les requêtes
texte : Chat, code, intégrations

### LiteLLM
texte : La passerelle

### Palier 1
texte : Nos cartes
détail : Pleine charge

### Palier 2
texte : Hébergeurs français

### Palier 3
texte : Clouds US

#### Progression

arrivée : tout va au palier 1 ; clic 1 : nos cartes saturent, le surplus déborde vers le palier 2 ; clic 2 : le développement agentique part au palier 3

#### À l'oral

ce que permet la passerelle, en image. Le débord vers le palier 2 est l'usage qu'on voit pour les hébergeurs français, essayé sur quelques projets ; le palier 3 reste réservé à ce qui en a besoin

#### Compléments

Illustration en motion design, pas une mesure ni un incident vécu. Issue #6

## data-rules
type : étapes
rubrique : La plateforme
titre : Les données : la PSSI décide
numérotées : non
pied : La passerelle permet d'appliquer la règle : qui envoie quelles données à quel palier

### 100 % maîtrisé, en local
texte : Nos cartes
détail : Palier 1
surligné : oui

### 100 % maîtrisé, en dédié externe
texte : Des GPU loués en France
détail : Palier 2

### 100 % français, mutualisé
texte : Les API des hébergeurs français
détail : Palier 2

### Cloud hors France et UE
texte : Seulement quand il le faut
détail : Palier 3

#### Progression

arrivée : 100 % maîtrisé en local ; clics 1 à 3 : en dédié externe, français mutualisé, hors France et UE ; clic 4 : le pied de slide

#### À l'oral

le tout-cloud expose les données à un tiers. La règle des données n'est pas technique : c'est la PSSI de l'entreprise qui décide, entre ces quatre niveaux, ce qui peut aller où. La passerelle permet ensuite de l'appliquer

#### Compléments

PSSI : la politique de sécurité des systèmes d'information de l'entreprise

## platform-trio
type : trio
rubrique : La plateforme
objectif : Délivrer les modèles sur un point unique, avec une gestion fine des droits et un bon suivi
piège : Partir en direct sur les moteurs, ou sur une passerelle maison
leçon : Avec une passerelle centralisée, le routage par paliers n'est plus technique : c'est de la gouvernance

#### Progression

arrivée : ce qu'on voulait faire ; clic 1 : le piège ; clic 2 : la leçon

#### À l'oral

deux histoires vécues, 20 secondes chacune, sur le réglage du service selon l'usage réel. Réserver 95 % de la VRAM faisait planter le moteur sur un long prompt : retour à 90 %. Et 116 requêtes restaient suspendues faute de mémoire : après analyse des longueurs de prompts réels, on a ramené le contexte de 262k à 196k tokens et limité à 12 conversations simultanées ; on est passé à 0

#### Compléments (régler le service sur l'usage réel, pour les questions)

- Réserver 95 % de la VRAM a fait planter le moteur sur un long prompt : retour à 90 %
- Contexte ramené de 262k à 196k tokens et 12 conversations simultanées au maximum, après analyse des longueurs de prompts réels : de 116 requêtes suspendues faute de mémoire à 0
- Niveau de réflexion `medium` imposé par défaut, `high` posait problème
- Environ 45 % des tokens de prompt déjà en cache ; un redémarrage coûte environ 4 minutes
