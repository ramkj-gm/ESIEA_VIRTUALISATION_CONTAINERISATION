# ESIEA_VIRTUALISATION_CONTAINERISATION

## Le Projet
  Notre projet se concentre sur la création d'une application web composée de plusieurs services conteneurisés. 
  Notre équipe a réalisé une application permettant de gérer une liste de produits. 
  Les administrateurs peuvent ajouter, modifier ou supprimer des produits, et les clients peuvent consulter cette liste. 
  
  (La fonctionnalité de location par les clients n’a pas été implémentée dans cette version.)

### Fonctionnalités 
- Consultation de produits : Les utilisateurs peuvent afficher la liste des produits disponibles.
- Gestion des produits
- Ajout de nouveaux produits.
- Modification des informations des produits existants.
- Suppression des produits.

### Architecture 
  L'applicaiton est divisée en 2 services : Backend & Frontend. 

  Le Backend est une API REST développée avec Node Express. Une connexion à une base de données pour stocker les informations des produits. Cette dernière est une BDD MySQL.
  Le Frontend qui est une interface utilisateur simple en HTML/CSS/JavaScript pour interagir avec l’API.

### Difficultés 
- Synchronisation des Commit et travail en simultané.
- Implémentation incomplète de la fonctionnalité de location.
- Temps limité pour l’optimisation de l’interface utilisateur.

### Améliorations Futures
- Ajouter la fonctionnalité permettant aux clients de louer des produits.
- Améliorer le design et l’ergonomie de l’interface utilisateur.
- Implémenter un système d’authentification pour les administrateurs.

## Les Membres du Groupe 
  Nous sommes 3 au sein de ce projet : 
  - Karam JABOUR [TD-44]
  - Ghita KHEFIF [TD-45]
  - Enrique MARTINS [TD-45]

## Répartition des tâches 
  Nous avons beaucoup travaillé ensemble, à distance comme en présentiel, afin d'avoir un projet sur lequel nous sommes tous d'accord et pour lequel nous comprenons tous les fondements. Plusieurs de nos Commit ne sont pas réellement "représentatifs" de nos travaux respectifs puisque nous étions souvent derrière la même machine. 
  
  Karam est plus à l'essence même du projet puisqu'il a essentiellement travaillé sur la création de ce dernier. Il a créé le "Backend" en ajoutant des données au sein de la Base MySQL ou encore en s'occupant de l'API REST.
  Ghita et Enrique ont de leur côté focalisé leurs efforts sur le "Frontend" et toute l'interface utilisateur afin de permettre à l'utilisateur d'intéragir avec l'API.
  
  Malgré les contraintes de temps nous avons lutté pour rendre un projet concluant, avec des fonctionnalités existantes et qui nous plaît. Ce projet nous a permis d’apprendre les bases de la création d’applications en microservices avec Docker. Bien que certaines fonctionnalités soient encore à implémenter, l’application actuelle constitue une base solide dont nous sommes fiers et gardons un souvenir positif.  
