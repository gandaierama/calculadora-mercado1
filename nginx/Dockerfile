FROM nginx:alpine

RUN apk add --no-cache openssl
RUN apk add --no-cache bash

RUN apk add --no-cache certbot

RUN apk update


ARG DOMAINS
ARG CERTBOT_TEST_CERT
ARG CERTBOT_EMAILS
ARG CERTBOT_RSA_KEY_SIZE

ENV DOMAINS=$DOMAINS
ENV CERTBOT_TEST_CERT=$CERTBOT_TEST_CERT
ENV CERTBOT_EMAILS=$CERTBOT_EMAILS
ENV CERTBOT_RSA_KEY_SIZE=$CERTBOT_RSA_KEY_SIZE

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

RUN mkdir /etc/letsencrypt/live/importadoreslucrativos.com/ && chown -R 600 /etc/letsencrypt/live/importadoreslucrativos.com/*
COPY ./default.conf /etc/nginx/conf.d/
COPY ./fullchain.pem /etc/letsencrypt/live/importadoreslucrativos.com/
COPY ./privkey.pem /etc/letsencrypt/live/importadoreslucrativos.com/

# Expose the listening port
EXPOSE 80
EXPOSE 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
