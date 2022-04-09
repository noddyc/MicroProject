#!/usr/bin/bash
IFS=', '  read -ra FOLDERS <<< $1  
for i in "${FOLDERS[@]}"; do
    docker pull jh7939/microservices:${i}_microservice
    if [ $2 = "new" ]; then
        echo $1
        bash add_newservice.sh $i
    fi
    bash update_containers.sh $i 4
done