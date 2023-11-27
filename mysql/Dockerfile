FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=swarmdb

COPY database.sql /docker-entrypoint-initdb.d/
