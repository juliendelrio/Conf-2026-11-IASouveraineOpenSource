# Questions probables

Les questions que la salle risque de poser, avec la réponse quand elle est connue. Les réponses marquées « à l'oral » seront racontées par l'orateur.

## La plateforme (issue #22)

- **La passerelle est un point unique de défaillance : quelle haute disponibilité ?** À l'oral
- **Comment les utilisateurs s'authentifient-ils ?** À l'oral
- **Comment la plateforme est-elle supervisée et déployée ?** À l'oral
- **Qu'est-ce qui déclenche le débord vers le palier 2 ?** À l'oral. D'après la doc LiteLLM : des bascules configurées par modèle, sur erreur ou limite de débit atteinte, ou quand le prompt dépasse le contexte du modèle (compléments de la slide 38)
- **Comment gérez-vous les priorités entre équipes ?** Par les alias de modèles : certaines équipes ont accès à des modèles servis avec de la redondance, d'autres non (hors de l'infrastructure à 3 cartes) ; et certains modèles sont limités à certaines équipes (slide 36)
- **LiteLLM a été compromis deux fois en 2026, avez-vous été touchés ?** Non. En mars (versions 1.82.7 et 1.82.8 sur PyPI), on ne l'utilisait pas encore ; en octobre (version 1.107.0, PyPI et images Docker), on avait quelques versions de retard (compléments de la slide 38)

## Les modèles et le matériel

- **Quelle évaluation interne avez-vous faite ?** Quelques prompts de test dont on regarde le résultat, notamment des prompts de jeux vidéo. Ce n'est pas parfait, mais c'est assez parlant à notre niveau (slide 5)
- **Pourquoi acheter plutôt que consommer à l'usage chez un hébergeur français ?** Le coût marginal : une fois l'usage principal rentabilisé (par exemple les développeurs de 9h à 17h), chaque usage en plus, léger ou hors des heures de bureau, ne coûte que l'électricité (slide 25)
