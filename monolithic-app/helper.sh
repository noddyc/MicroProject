#!/usr/bin/bash
docker-compose down
docker pull jh7939/monolithic:monolithic-app
docker-compose up -d --scale monolith=3