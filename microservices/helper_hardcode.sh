#!/usr/bin/bash
docker pull jh7939/microservices:$1_microservice
if [ $2 = "new" ]; then
    echo $1
    bash add_newservice.sh $1
fi
bash update_containers.sh $1 4