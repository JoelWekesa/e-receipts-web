#!/bin/bash

TIMESTAMP=$(date +%Y-%m-%d_%H%M%S)

sed -i.bak "s|image: joelwekesa/eweb:.*|image: joelwekesa/eweb:$TIMESTAMP|" docker-compose.yml


docker-compose build

# Optionally, push the image to a Docker registry


echo "Image built and tagged as joelwekesa/eweb:$TIMESTAMP"

docker tag joelwekesa/eweb:latest joelwekesa/eweb:$TIMESTAMP

docker push joelwekesa/eweb:$TIMESTAMP
