# 📦 Enterga 11 - Testing 🚀

## Actualizaciones y Mejoras

Se añadieron módulos de pruebas para la creación de usuarios y productos, así como también para probar el carrito del usuario y las sesiones de los usuarios.


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
