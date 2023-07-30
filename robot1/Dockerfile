FROM node:20.5-alpine

LABEL maintainer="danielbatistagalvao@hotmail.com"


# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROME_BIN="/usr/bin/chromium-browser"
RUN apk update && apk add --no-cache --virtual \
    .build-deps \
    udev \
    ttf-opensans \
    chromium \
    ca-certificates


WORKDIR /var/www/robot1/
RUN npm install --global pm2
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN node node_modules/puppeteer/install.js
EXPOSE 3000


USER node

CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
