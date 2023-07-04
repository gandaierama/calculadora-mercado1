#!/bin/bash

set -e

trap exit INT TERM

if [ -z "$DOMAINS" ]; then
  echo "DOMAINS environment variable is not set"
  exit 1;
fi

until nc -z nginx 80; do
  echo "Waiting for nginx to start..."
  sleep 5s & wait ${!}
done

if [ "$CERTBOT_TEST_CERT" != "0" ]; then
  test_cert_arg="--test-cert"
fi

domains_fixed=$(echo "$DOMAINS" | tr -d \")
domain_list=($domains_fixed)
emails_fixed=$(echo "$CERTBOT_EMAILS" | tr -d \")
emails_list=($emails_fixed)

echo $DOMAINS

pwd
for i in "${!domain_list[@]}"; do
  domain="${domain_list[i]}"

  mkdir -p "/var/www/certbot/$domain"

  
done