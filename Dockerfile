FROM node:lts-alpine
USER root
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN npm install
ENTRYPOINT [ "npm" ]
CMD [ "run", "serve" ]