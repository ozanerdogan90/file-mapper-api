#!/bin/bash

set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

npm run build && npm run swagger

# Bringing previously running containers down

docker-compose down

# Spinning up docker containers

docker-compose up --build -d

echo ''

