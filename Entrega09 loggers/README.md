# 📦 Entrega09: Logging  🚀

En esta entrega, he incluido loggers personalizados con Winston. Las siguientes tareas se han completado:

**Definido un sistema de niveles** con la siguiente prioridad (de menor a mayor): debug, http, info, warning, error, fatal.


**Implementado un logger para desarrollo** y un logger para producción. El logger de desarrollo loggeará a partir del nivel debug, y el de produccion apartir del nivel de info, cada tipo de loger se puede cambiar desde el .env como explico mas abajo.

**El logger enviará en un transporte de archivos** a partir del nivel de "error" en un archivo llamado “errors.log”.

**Agregar loggers** Cambie los console.log por los loggers en los puentos mas importates del servidor

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
