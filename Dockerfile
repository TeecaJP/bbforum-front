FROM --platform=linux/amd64 node:lts-alpine 

WORKDIR /opt/app
COPY package.json package-lock.json ./

RUN npm install

RUN mkdir -p node_modules/.cache && chmod -R 777 node_modules/.cache

COPY . .

RUN chown -R node:node /opt/app/node_modules

CMD ["npm", "start"]