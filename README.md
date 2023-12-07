# Carls Jr Proyecto Final
Este proyecto es una pagina para el uso de la cocina de Carls Jr, el cual te permite crear usuarios(Trabajadores), mandar ordenes, crear productos, añadir ingredientes, su indice e informacion de la pagina.

Como correr el proyecto:

Primero instalamos las dependecias que use:
npm install

Segundo Creamos la base de datos
DROP DATABASE IF EXISTS carlsjr;
CREATE DATABASE carlsjr;

Antes de correr el proyecto necesitamos haber creado un usuario que en este caso es como el jefe(El que tiene todo el mando)
INSERT INTO carlsjr.super_usuarios (id, correo, nombreUsuario, contrasenia) VALUES ('1', 'admin@xd.com', 'admin', '123');

Ya como ultimo corremos el proyecto con el siguiente comando:
npm start


Link video de explicacion:
(Pendiente)
---
