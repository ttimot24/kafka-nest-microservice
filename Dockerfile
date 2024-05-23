FROM node:18-alpine as client-build

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

ARG PRIVATE_TOKEN=""

COPY *.json ./
COPY src ./src

RUN npm install -g @nestjs/cli

RUN npm ci
RUN npm run build

CMD ["npm", "run", "start"]