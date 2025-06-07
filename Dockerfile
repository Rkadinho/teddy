FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY . .

RUN npm ci --legacy-peer-deps

RUN npx nx build appPrincipal --configuration=production

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/apps/appPrincipal/ /usr/share/nginx/html
