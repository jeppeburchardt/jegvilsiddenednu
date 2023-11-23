# syntax=docker/dockerfile:1
FROM node

RUN apt-get update 
RUN apt-get install -y osmosis

RUN node -v
RUN npm -v

COPY . /benchmark/
WORKDIR /benchmark/

## RUN curl latest world...
## https://download.geofabrik.de/europe/denmark-latest.osm.pbf

RUN osmosis --read-pbf denmark-latest.osm.pbf --node-key-value keyValueList="amenity.bench" --write-xml benches.osm

RUN npm install

RUN npm run start

# CMD /bin/sh