FROM nginx:alpine

RUN apk add --no-cache openssl
RUN apk add --no-cache bash

RUN apk add --no-cache certbot
RUN apk add --no-cache python2-certbot-nginx
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


COPY ./default.conf /etc/nginx/conf.d/

# Expose the listening port
EXPOSE 80
EXPOSE 443

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]
