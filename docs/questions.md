# Questions probables

Les questions que la salle risque de poser, avec la réponse quand elle est connue. Les réponses marquées « à l'oral » seront racontées par l'orateur.

## La plateforme (issue #22)

- **La passerelle est un point unique de défaillance : quelle haute disponibilité ?** À l'oral
- **Comment les utilisateurs s'authentifient-ils ?** À l'oral
- **Comment la plateforme est-elle supervisée et déployée ?** À l'oral
- **Qu'est-ce qui déclenche le débord vers le palier 2 ?** À l'oral. D'après la doc LiteLLM : des bascules configurées par modèle, sur erreur ou limite de débit atteinte, ou quand le prompt dépasse le contexte du modèle (compléments de la slide 37)
- **Comment gérez-vous les priorités entre équipes ?** Par les alias de modèles : certaines équipes ont accès à des modèles servis avec de la redondance, d'autres non (hors de l'infrastructure à 3 cartes) ; la redondance, c'est un alias générique avec plusieurs modèles derrière, ou un même modèle sous plusieurs alias ; et certains modèles sont limités à certaines équipes (slide 35)
- **LiteLLM a été compromis deux fois en 2026, avez-vous été touchés ?** Non. En mars (versions 1.82.7 et 1.82.8 sur PyPI), on ne l'utilisait pas encore ; en octobre (version 1.107.0, PyPI et images Docker), on avait quelques versions de retard (compléments de la slide 37)

## Les modèles et le matériel

- **Quelle évaluation interne avez-vous faite ?** Quelques prompts de test dont on regarde le résultat, notamment des prompts de jeux vidéo. Ce n'est pas parfait, mais c'est assez parlant à notre niveau (slide 5)
- **Pourquoi acheter plutôt que consommer à l'usage chez un hébergeur français ?** Le coût marginal : une fois l'usage principal rentabilisé (par exemple les développeurs de 9h à 17h), chaque usage en plus, léger ou hors des heures de bureau, ne coûte que l'électricité (slide 25)

## Questions difficiles (issue #32)

Réponses courtes à partir de ce qui est déjà dans les notes ; « à l'oral » quand la réponse est celle de l'orateur. Rester générique : pas de chiffre d'activité ni de détail d'organisation.

- **Combien d'utilisateurs réels, quel temps d'équipe pour exploiter la plateforme ?** À l'oral. Le temps humain n'est pas chiffré dans les slides (compléments de la slide 25)
- **Quel coût comparé à une API française au token ?** Ordre de grandeur extrapolé (annexe de la storyline, slide retirée « tier2-api ») : à environ 1 € le million de tokens, louer de quoi faire tourner Flash-Next (3 900 – 9 300 €/mois) ne devient rentable qu'au-delà de 4 à 10 milliards de tokens par mois. L'argument de l'achat est le coût marginal (voir plus haut), pas le prix au token
- **Quelle consommation électrique ?** 600 W par RTX PRO 6000 Server Edition au maximum (fiche constructeur), soit 1,2 kW pour les 2 cartes du Flash-Next, hors serveur ; pas mesurée chez nous (slide 46)
- **Le volume de requêtes cité, est-ce vraiment de la production ?** ~9 400 requêtes en 3 semaines sur le Flash-Next (slide 24) : 2 mois de production avec des utilisateurs pilotes, pas un service à grande échelle. À l'oral
- **« 100 % souverain » avec du matériel NVIDIA et des poids chinois en boîte noire ?** Les deux dépendances sont assumées et écrites à l'écran (slide 4) ; open weights n'est pas open source : on ne peut ni reproduire ni auditer le modèle (slide 9). Biais et portes dérobées : à l'oral (voir aussi l'issue #13)
- **Si le palier 3 est coupé, que bascule-t-on pour les tâches d'architecte et de lead ?** GLM-5.3 et DeepSeek-V4.1-Flash-1017, au catalogue d'hébergeurs français (relevé du 03/11/2026). Les comparaisons à Opus sont l'appréciation de l'orateur ; le débord vers le palier 2 n'a été essayé que sur quelques projets (slides 49 et 56)
- **Comment se connectent les utilisateurs si le SSO est en édition entreprise ?** D'après la doc LiteLLM, le SSO est gratuit jusqu'à 5 utilisateurs, sous licence au-delà (slide 36). Ce qui est fait chez nous : à l'oral
- **La licence Qwen Community couvre-t-elle un assistant de code interne, et le code généré livré à un client ?** À l'oral, à partir de la slide 19 ; ne pas donner d'avis juridique
- **Vitesse de lecture du prompt : 1 300 à 2 000 tok/s, donc 50 à 77 s pour un prompt de 100k tokens hors cache ?** Le calcul est juste hors cache ; en production, environ 45 % des tokens de prompt sont déjà en cache, avec des pics à 14 000 tok/s (slides 40 et 46). Méthode de mesure : à préciser par l'orateur
- **Le MoE est-il vraiment plus rapide sans décodage spéculatif ?** La mesure (~200 tok/s) doit beaucoup au décodage spéculatif : 2,8 tokens produits par passe. Plafond théorique sans lui : ~265 tok/s, et les surcoûts (échanges entre cartes sans NVLink) nous en tiennent loin. Ne pas comparer directement au 27B (slide 24, issue #10)
