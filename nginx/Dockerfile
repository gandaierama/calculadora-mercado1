FROM nginx:alpine

RUN apk add --no-cache openssl
RUN apk add --no-cache bash

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


RUN mkdir -p /etc/nginx/sites-available/
RUN mkdir -p /etc/letsencrypt/live/tsdmotoboys.com.br
RUN mkdir -p /var/www/certbot/tsdmotoboys.com.br
COPY gzip.conf hsts.conf /etc/nginx/includes/
COPY ./default.conf /etc/nginx/conf.d/

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
