FROM node:18-alpine as client-build

WORKDIR /usr/src/app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

ARG PRIVATE_TOKEN=""
RUN npm ci

COPY *.json ./
COPY src ./src

#ARG APP_VERSION="BuildError: Unset APP_VERSION"
#RUN npx replace-in-file 0.0.0-local "$APP_VERSION" src/app/shared/components/copyright/copyright.component.ts

RUN npm run build

RUN apk add --no-cache gzip
RUN gzip -r -k dist

FROM nginxinc/nginx-unprivileged:stable-alpine

COPY --from=client-build /usr/src/app/dist /usr/share/nginx/html

#COPY /nginx.conf /etc/nginx/nginx.conf
#COPY /deployment/conf.d/* /etc/nginx/templates/

EXPOSE 8080
