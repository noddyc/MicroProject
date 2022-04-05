#!/usr/bin/bash
sshpass -p '2446592ny' ssh -T jianhe@192.168.2.13<< EOF
    cd /Users/jianhe/Documents/GitHub/Microservices-Project/monolithic-app/
    docker-compose down
    security -v unlock-keychain -p "2446592ny" ~/Library/Keychains/login.keychain-db
    git fetch --all
    git checkout origin/master -- /Users/jianhe/Documents/GitHub/Microservices-Project/monolithic-app/docker-compose.yml
    docker pull jh7939/monolithic:monolithic-app
    docker-compose up -d
    exit
EOF