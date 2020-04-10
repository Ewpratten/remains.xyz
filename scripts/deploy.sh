#! /bin/bash

ssh root@remains.xyz "rm -rf ~/app/*\
mkdir ~/app\
mkdir ~/app/src && mkdir ~/app/public"
scp ./* root@remains.xyz:~/app
scp -r ./src root@remains.xyz:~/app/
scp -r ./public root@remains.xyz:~/app/
ssh root@remains.xyz "cd ~/app;\
npm install; \
killall caddy; \
dtach -n app npm run develop; \
cd /etc/caddy; \
dtach -n caddy caddy
"
