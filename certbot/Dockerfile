FROM certbot/certbot:v1.29.0

RUN apk add --no-cache bash

RUN mkdir -p /var/www/certbot/importadoreslucrativos.com
RUN mkdir -p /var/www/certbot/.well-known/acme-challenge


COPY certbot.sh /opt/

RUN chmod +x /opt/certbot.sh

ENTRYPOINT ["/opt/certbot.sh"]