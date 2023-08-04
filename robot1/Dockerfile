FROM node:20.5-alpine

LABEL maintainer="danielbatistagalvao@hotmail.com"

USER node

RUN apk update && apk add --no-cache --virtual \
    .build-deps \
    udev \
    ttf-opensans \
    nss \
    freetype \
    harfbuzz \
    chromium \
    ca-certificates

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV CHROMIUM_PATH /usr/bin/chromium-browser
ENV CHROME_BIN  /usr/bin/chromium-browser
ENV DISPLAY 10.0

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser



WORKDIR /var/www/robot1/
RUN npm install --global pm2
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN node node_modules/puppeteer/install.js

RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app

EXPOSE 3000




CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
