FROM node:latest

WORKDIR /project

COPY ./src ./src
COPY ./nest-cli.json ./nest-cli.json
COPY ./package.json ./package.json
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./tsconfig.json ./tsconfig.json
COPY .env .env

RUN yarn
RUN yarn build
CMD yarn start:prod
