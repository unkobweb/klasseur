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
      - DRIVE_DISK=s3
      - DB_CONNECTION=mysql
      - MYSQL_HOST=db
      - MYSQL_PORT=3306
      - MYSQL_USER=klasseur
      - MYSQL_PASSWORD=astrongpassword
      - MYSQL_DB_NAME=klasseur
      - S3_KEY=
      - S3_SECRET=
      - S3_BUCKET=
      - S3_REGION=
      - S3_ENDPOINT=
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
#### Type de stockage
```yml
services:
  api:
    environment:
      - DRIVE_DISK=s3
```
La variable **DISK_DRIVE** peut contenir la valeur '**local**' qui permet de réaliser le stockage des fichiers sur la machine hôte ou '**s3**' qui permet l'hébergement des fichiers sur un service S3.
#### Stockage local
```yml
services:
  api:
    volumes:
      - /var/lib/klasseur:/srv/klasseur/tmp/uploads
```
Si vous choisissez de stocker vos fichiers localement, c'est à ce chemin (*/var/lib/klasseur*) que vos fichiers seront sauvegardés sur votre machine hôte. Vous pouvez le modifier, si vous désirez les stocker ailleurs.