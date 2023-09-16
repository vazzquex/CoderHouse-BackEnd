# 📦 Enterga 11 - Testing 🚀

## Actualizaciones y Mejoras

Se ha añadido una nueva propiedad llamada "documents" al modelo de usuario, la cual permite a los usuarios cargar documentos para fines de autenticación y otorgarles el rol de premium, lo que les permite crear otros usuarios.

También se ha incorporado la propiedad "last_connection", la cual muestra la fecha y hora de la última conexión del usuario cada vez que realiza un proceso de inicio de sesión y cierre de sesión.

Además, se ha creado una nueva vista en "/documents" que permite a los usuarios cargar sus documentos. Esta vista se comunica con la ruta "api/users/:uid/documents".

El middleware de Multer cuenta con un parámetro llamado "type", el cual permite especificar entre las opciones "documents", "products" y "profiles". Dependiendo de la elección, el archivo se almacenará en la carpeta correspondiente dentro de "/data".



### Como usar los test:

Ejecuta los siguientes comandos en la terminal:

```bash
# Prueba de creación de productos y añadido al carrito
mocha test/product.cart.js

# Prueba de creación de usuarios y sus sesiones
mocha test/sessions.test.js
```

## 📝 Variables de Entorno

Archivo ejemplo del `.env` contiene:

```bash
# La variable "ENVIROMENT" puede ser "dev" para entorno de desarrollo y "prod" para un ejemplo de produccion 
ENVIROMENT="dev"

MONGO_URL='mongodb://localhost:8080/test' 

# Las siguientes variables son para la autenticación con GitHub usando Passport
CLIENT_ID='Iv1.a1b2c3a1b2c3'
CLIENT_SECRET='12345123451234512345123451'

SECRET_KEY='1234512345'

ADMIN_USER='prueba@adminuser.com'
ADMIN_PASSWORD='contraseña'

##Gmail keys
EMAIL='your@email.com'
EMAIL_PASS='a7y1234tk487ty' #example 
```
## 🚀 Cómo usar este proyecto

Para usar este proyecto, sigue estos pasos:

Ejecuta `npm install` para instalar las dependencias. 📥
Luego, ejecuta `npm start` para iniciar el servidor. 🖥️
