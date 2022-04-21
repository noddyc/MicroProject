# Microservices-Project

## Start Microservices
`cd microservices`
`docker-compose up -d`

## Scale Microservices
`docker-compose up -d --scale users=4 --scale threads=4 --scale comments=4 --scale posts=4`

## Stop Microservices
`docker-compose down`

## Start Monolith
`cd monolithic-app`
`docker-compose up -d`

## Scale Monolith
`docker-compose up -d --scale monolith=4`

## Stop Monolith
`docker-compose down`

## Build Jenkins Image and run Jenkins Image
`cd jenkinsImage`
`docker build -t jenkins:jcasc .`
`docker run --name jenkins --rm -p 8080:8080 --network microservices_my-network -v /var/run/docker.sock:/var/run/docker.sock jenkins:jcasc`

## Go to port 8080 for Jenkins service
`localhost:8080`

## Start pipieline
There are two pipelines set up on DashBoard. 'jenkinsMicro' is for microservices application 
and 'jenkinsMono' is for monolithic application. Commit a change to github repository and click
build with parameters (Change 'BUILD_NAME' for customized name, leave NEW_SERVICE and MODIFIED_SERVICE blank) for integration.



