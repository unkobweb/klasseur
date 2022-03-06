# Klasseur

Klasseur est une application web, que vous pouvez héberger vous même et qui a pour but de stocker et trier vos document à l'aide d'un système de tags. Vous pouvez choisir d'héberger les documents directement sur le disque de votre machine ou alors de les stocker dans un service S3.

## Installation

Klasseur est fournit avec un fichier d'exemple docker-compose qui se structure comme suit :

```yml
version: "3.9"
services:
  api:
    build: ./backend
    ports:
      - "3333:3333"
    volumes:
      - /var/lib/klasseur:/srv/klasseur/tmp/uploads
    depends_on:
      - db
    environment:
      - PORT=3333
      - HOST=0.0.0.0
      - NODE_ENV=production
      - APP_KEY=BMtrxYCZcIxEJEVZ0FgXXUkfmKtutZbu
      - WEB_URL=http://127.0.0.1:3000
      - DB_CONNECTION=mysql
      - MYSQL_HOST=db
      - MYSQL_PORT=3306
      - MYSQL_USER=klasseur
      - MYSQL_PASSWORD=astrongpassword
      - MYSQL_DB_NAME=klasseur
  web:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - api
    environment:
      - HOST=0.0.0.0
  phpmyadmin:
    image: phpmyadmin
    restart: always
    ports:
      - 8080:80
  db:
    image: mariadb
    volumes:
      - /var/lib/mariadb:/var/lib/mysql
    environment:
      - MYSQL_RANDOM_ROOT_PASSWORD=yes
      - MYSQL_USER=klasseur
      - MYSQL_PASSWORD=astrongpassword
      - MYSQL_DATABASE=klasseur
```

### Configuration
#### Stockage local
```yml
services:
  api:
    volumes:
      - /var/lib/klasseur:/srv/klasseur/tmp/uploads
```
Si vous choisissez de stocker vos fichiers localement, c'est à ce chemin (*/var/lib/klasseur*) que vos fichiers seront sauvegardés sur votre machine hôte. Vous pouvez le modifier, si vous désirez les stocker ailleurs.

### Tip's
#### Utiliser Gmail comme serveur SMTP
Il est possible d'utiliser votre compte Gmail pour permettre a Klasseur d'envoyer des emails.
Il vous suffit d'aller sur https://myaccount.google.com/ puis dans l'onglet **Sécurité > Mots de passe des applications**

Ensuite, choisissez un type d'application (pas d'importance) puis cliquez sur "Générer".
Google vous donnera un mot de passe de 16 caractères.

Votre configuration SMTP ressemblera donc à :
```
             Hote SMTP = smtp.gmail.com
             Port SMTP = 587
Nom d'utilisateur SMTP = votre.adresse@email.fr
     Mot de passe SMTP = le_mot_de_passe_généré_par_google
```
Entrez ces informations dans la configuration de klasseur et vous pouvez ensuite la tester pour vous assurer que l'envoi de mail est bien fonctionnel