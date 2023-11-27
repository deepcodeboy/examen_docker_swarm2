# Examen Seminario de Actualizacion III - DOCKER SWARM 
## Pasos para ejecutar el trabajo:
### Crear las imagenes de los servicios
Antes de crear las imagenes de los servidores rest y soap, hay que instalar las dependencias necesarias. Ejecutar los siguientes comandos:
- Servidor rest:
```sh
cd rest
``` 
```sh
npm i
```
```sh
cd ..
```
- Servidor soap:
```sh
cd soap
``` 
```sh
npm i
```
```sh
cd ..
```
Para crear las imagenes que van a utilizar los servicios, hay que abrir la consola en la raiz del repositorio clonado y luego utilizar los siguientes comandos:
- El comando para crear la imagen de la app es: 
```sh
docker build -t front-image ./frontend
```

- El comando para crear la imagen del servidor rest es: 
```sh
docker build -t rest-image ./rest
```
- El comando para crear la imagen del servidor soap es: 
```sh
docker build -t soap-image ./soap
```
- El comando para crear la imagen de la base de datos: 
```sh
docker build -t mysql-image ./mysql
```
### Crear los servicios con Docker Swarm
- Para crear los servicios hay que pasarle las imagenes creadas de cada servidor a los servicios que correrán dichas imagenes
- Para desplegar los servicios se utiliza el siguiente comando en la consola: 
```sh
docker stack deploy -c servicios.yml examen
``` 
Donde servicios.yml es el archivo .yml con la configuracion para el despliegue y services es el nombre de los servicios.


## Pruebas de los servicios
### Acceso a los servicios
- Para acceder al servicio de la app hay que situarse en:
```
http://localhost:3000
```
