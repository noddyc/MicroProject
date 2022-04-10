#!/bin/bash
OLD_CONTAINER=$(docker-compose ps -q $1 | head -$2)
NUM=$(( $2*2 ))
# echo $NUM
docker-compose up -d --scale $1=$NUM --no-recreate $1
docker rm -f $OLD_CONTAINER
docker-compose up -d --scale $1=$2 --no-recreate $1