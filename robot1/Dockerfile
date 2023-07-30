FROM node:20.5-alpine

LABEL maintainer="danielbatistagalvao@hotmail.com"

WORKDIR /var/www/robot1/
RUN npm install --global pm2
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000


USER node

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
