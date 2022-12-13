FROM mariadb:latest

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

COPY init.sql /docker-entrypoint-initdb.d/
COPY datafiles /data

# Building with
# docker build -t moviedb .

# Running with
# docker run --detach -p 3306:3306 --name some-moviedb  --env MARIADB_ROOT_PASSWORD=1234  moviedb