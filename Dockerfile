FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

COPY . .

RUN npm install

RUN npx nx build appPrincipal --configuration=production

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/appPrincipal /usr/share/nginx/html
