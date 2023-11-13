FROM mysql:debian

ENV MYSQL_DATABASE examenDocker
ENV MYSQL_ROOT_PASSWORD 1234


COPY ./personas.sql /docker-entrypoint-initdb.d/
