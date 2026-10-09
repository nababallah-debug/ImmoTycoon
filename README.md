# empire. - City Tycoon

Un jeu de gestion solo en francais, avec une ville isometrique et 50 mecaniques de jeu. Aucune inscription, aucun serveur et aucun argent reel.

## Jouer

- L'application demarre directement sur une ville jouable, avec 24 850 euros, 7 batiments et 2 collaborateurs.
- Cliquez sur Construire pour choisir un projet et son terrain.
- Cliquez sur les reperes de la carte pour ameliorer, renover, fermer ou demolir un batiment.
- Le bouton Comment jouer explique les regles et repertorie les 50 fonctionnalites.
- Les revenus, les frais, les salaires, les chantiers et la recherche evoluent automatiquement.
- Une minute simulee represente un jour de jeu. La simulation peut etre mise en pause ou acceleree jusqu'a 3x.

## Version HTML

La compilation produit `dist/index.html`. Le JavaScript, le CSS et l'image de la ville sont integres dans ce fichier HTML. Il peut etre ouvert directement dans un navigateur moderne. Les polices Google Fonts sont facultatives : une police locale prend le relais hors ligne.

## Sauvegarde

- Sauvegarde automatique locale toutes les 5 secondes et a la fermeture de la page.
- Export et import JSON depuis Parametres, avec validation des donnees avant import.
- Gains hors ligne : 65 % du benefice net, pendant 2 heures maximum. Aucun gain si la partie est en pause.
- Les delais des contrats et des emprunts restent suspendus hors ligne.
- La sauvegarde est propre a ce navigateur. Exportez-la avant de changer d'appareil ou d'effacer le stockage.

## Systemes

15 batiments, 4 categories, 24 terrains apres extension, 5 niveaux de batiments, usure, maintenance, energie, satisfaction, population, production industrielle, stockage, 3 materiaux, cours variables, 3 actions boursieres, dividendes, 5 professions, 12 collaborateurs maximum, formation, politique salariale, 12 recherches, 3 campagnes, fiscalite, emprunts amortis, 5 contrats, 5 familles d'evenements a choix, 9 missions, 16 succes, cadeau quotidien, pourboires, experience, prestige, classement local simule, graphiques, carte interactive et raccourcis.

## Sources

- `src/App.tsx` : application, navigation, sauvegarde, sons et raccourcis.
- `src/game.ts` : definitions, calcul economique, simulation, actions et validation des sauvegardes.
- `src/components/Pages.tsx` : dix ecrans de gestion.
- `src/components/Dialogs.tsx` : construction, gestion, parametres et guide.
- `src/components/CityScene.tsx` : carte isometrique et terrains interactifs.
- `src/components/BuildingArt.tsx` : miniatures SVG des batiments.
- `src/components/FinanceChart.tsx` : historique financier.
- `src/index.css` : interface responsive.

Le classement utilise des concurrents simules. Le jeu est volontairement local et n'integre pas de comptes ni de multijoueur.