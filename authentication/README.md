# Chat live JS
Ce Github est réservé à un cours de NodeJS.


## Sommaire
1. [installation](#installation)
2. [description du projet](#description-du-projet)


#description du projet
- Nous utilisons express pour notre serveur.

- Nous utilisons mongoDb en tant que base de données, associé a mongoose
afin de définir des modèles en applicant des validateurs 
(exemple format du mail, unicité du mail ...).

- La gestion des token est réalisé via la librairie passport, afin
d'authentifier un utilisateur lui donnant ou non l'accès complet au site
en fonction de ses droits.

- Pour réaliser nos tests, nous utilisons mocha. Pour lancer un test,
il faut d'abord lancer le serveur en mode test dans un terminal 
via la commande ```npm run testDev```.
Dans un second terminal, on lance la commande ```npm test```.

- Afin de permettre aux utilisateurs de réinitialiser leur mot de passe,
nous utilisons nodeMailer pour envoyer un lien a l'utilisateur lui permettant
de modifier son mot de passe.
 
- Le chat utilise socket.io afin que chaque utilisateur voit 
instantanément les messages des autres membres du salon.

- Nous utilisons la librairie express-rate-limit afin de limiter 
le nombre de requêtes possible sur une durée donnée.


- Nous utilisons également la librairie dotenv afin de définir la configuration 
du serveur, notamment :
    - le port du serveur (PORT), 
    - l'hôte (HOST), 
    - une clé secrète pour le token (JWT_SECRET)
    - la durée avant expiration du token (JWT_EXPIRATION_TIME)

Toutes ces variables d'environnement sont à définir dans un 
fichier .env à la racine du projet,
semblable au fichier ci-dessous : 
```
PORT=8088
HOST=127.0.0.1
JWT_SECRET=CI6Ikp9FDSFD756
JWT_EXPIRATION_TIME=600000
```

# installation
Après avoir cloné le projet, vous devriez créer votre fichier .env si vous 
souhaitez adapter l'une de ces données à vos besoins.

Il vous faudra également installer toutes les dépendances 
aux diverses librairies présentées précédemment.
Pour cela, ouvrez un terminal et placez-vous à la racine du projet.

Ceci fait, il suffira de lancer la commande ```npm install``` pour que
les dépendances nécessaires soient installées à partir du fichier ```package.json```.

#Tchat
Pour lancer le serveur de tchat en prod, utiliser la commande ```npm start```.
Si on souhaite le lancer en mode dev, afin que le serveur se relance 
après modification de fichier du projet, utiliser plutôt la commande ```npm run dev```.