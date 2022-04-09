#!/usr/bin/bash

#Get version
VERSION=$(curl --location --user admin:mypassword --request GET 'http://haproxy:5555/v2/services/haproxy/configuration/version')

#Name of the new service
SERVICE_NAME=$1

#Create new transaction and get the id
TRANSACTION_ID=$(curl --location --user admin:mypassword --request POST "http://haproxy:5555/v2/services/haproxy/transactions?version=$VERSION" | jq -r '.id')

echo "VERSION: $VERSION"
echo "TRANSACTION ID: $TRANSACTION_ID"
echo "SERVICE NAME: $SERVICE_NAME"

#Create a new backend
curl --location --user admin:mypassword --request POST "http://haproxy:5555/v2/services/haproxy/configuration/backends?transaction_id=$TRANSACTION_ID" --header "Content-Type: application/json" --data-raw "{\"name\": \"be_$SERVICE_NAME\", \"balance\": {\"algorithm\":\"roundrobin\"}, \"httpchk\": {\"method\": \"HEAD\", \"uri\": \"/\", \"version\": \"HTTP/1.1\"}}"

#Add server template to backend
curl --location --user admin:mypassword --request POST "http://haproxy:5555/v2/services/haproxy/configuration/server_templates?backend=be_$SERVICE_NAME&transaction_id=$TRANSACTION_ID" \
--header "Authorization: Basic YWRtaW46bXlwYXNzd29yZA==" \
--header "Content-Type: application/json" \
--data-raw "
{
    \"check\": \"enabled\",
    \"fqdn\": \"$SERVICE_NAME\",
    \"init-addr\": \"libc,none\",
    \"num_or_range\": \"20\",
    \"port\": 3000,
    \"prefix\": \"microservices-$SERVICE_NAME-\",
    \"proxy-v2-options\": null,
    \"resolvers\": \"docker\"
}"

#Add the ACL to the frontend
curl --location --user admin:mypassword --request POST "http://haproxy:5555/v2/services/haproxy/configuration/acls?parent_name=api_gateway&parent_type=frontend&transaction_id=$TRANSACTION_ID" \
--header "Authorization: Basic YWRtaW46bXlwYXNzd29yZA==" \
--header "Content-Type: application/json" \
--data-raw "{
    \"acl_name\": \"PATH_$SERVICE_NAME\",
    \"criterion\": \"path_beg\",
    \"index\": 0,
    \"value\": \"-i /api/$SERVICE_NAME\"
}"

#Add user_backend to frontend
curl --location --request POST "http://haproxy:5555/v2/services/haproxy/configuration/backend_switching_rules?frontend=api_gateway&transaction_id=$TRANSACTION_ID" \
--user admin:mypassword \
--header "Content-Type: application/json" \
--data-raw "{
    \"cond\": \"if\",
    \"cond_test\": \"PATH_$SERVICE_NAME\",
    \"index\": 0,
    \"name\": \"be_$SERVICE_NAME\"
}"

#Commit the transaction
curl --location --user admin:mypassword --request PUT "http://haproxy:5555/v2/services/haproxy/transactions/$TRANSACTION_ID" \
--header "Content-Type: application/json"