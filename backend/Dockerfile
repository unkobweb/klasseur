FROM node:16

WORKDIR /srv/klasseur_api

ADD . /srv/klasseur_api

RUN npm install

RUN node ace build --production --ignore-ts-errors

CMD ["npm", "run", "deploy"]