FROM node:20.5-alpine

LABEL maintainer="danielbatistagalvao@hotmail.com"



RUN apk update && apk add --no-cache --virtual \
    .build-deps \
    udev \
    ttf-opensans \
    chromium \
    ca-certificates

# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD false
ENV CHROMIUM_PATH /usr/bin/chromium-browser
ENV CHROME_BIN  /usr/bin/chromium-browser
ENV DISPLAY 10.0

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v13.5.0 works with Chromium 100.
RUN npm add puppeteer@13.5.0

# Add user so we don't need --no-sandbox.
RUN addgroup -S pptruser && adduser -S -G pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads /app \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /app





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
