FROM node:12

WORKDIR /usr/src/app

COPY package.json ./

RUN yarn  

COPY . .

COPY .env.example .env

CMD [ "yarn", "run",  "docker:start"]