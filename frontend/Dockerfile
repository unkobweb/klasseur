FROM node:16-alpine

WORKDIR /srv/klasseur_web

ADD . /srv/klasseur_web

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]