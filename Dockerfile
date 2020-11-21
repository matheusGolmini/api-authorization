FROM node:12

WORKDIR  /app

COPY . /app

RUN npm install

RUN npm run build

RUN chown -R node:node /app

USER node

EXPOSE 3000

CMD ["npm","start"]