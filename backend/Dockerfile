FROM node:14.15.1-buster

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY  ./package.json .

RUN npm install && npm cache clean --force

COPY . .

CMD npm run start:dev
