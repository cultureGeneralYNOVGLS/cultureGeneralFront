FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM bitnami/nginx:latest as production-stage
COPY --from=build-stage /app/dist /app