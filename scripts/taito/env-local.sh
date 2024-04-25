#!/usr/bin/env bash
# shellcheck disable=SC2034
# shellcheck disable=SC2154

##########################################################################
# Local environment settings
##########################################################################

# Use localhost:9458 instead of the default domain
taito_app_url=http://localhost:9458
taito_storage_url=http://localhost:2535

# Connect to database port exposed in docker-compose.yaml
db_database_external_port=7479
