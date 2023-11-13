FROM php:apache-bullseye

# Instalar la extensión SOAP
RUN apt-get update && \
    apt-get install -y libxml2-dev && \
    docker-php-ext-install soap

WORKDIR /var/www/html

COPY . .

EXPOSE 80

# Instalar la extensión mysqli
RUN docker-php-ext-install mysqli
