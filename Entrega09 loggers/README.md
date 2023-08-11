# 📦 Entrega08: Mocking and Errors  🚀

En esta entrega, he incluido mocking con Faker de Node y he incorporado errores personalizados tanto en profile.router como en ticket.router.

Tambien, he establecido un error personalizado en el proceso de registro y creación de productos como administrador. (Solo es posible crear un producto si te registras como administrador), poniendo los datos en el archivo .env. Por lo tanto, si te registras como administrador al intentar crear un producto si omites datos requeridos como el título o el precio, se activará un error personalizado proveniente del product controller. 

Como parte de estas mejoras, también se implementó la visita al endpoint /mockingproducts, lo cual muestra productos generados con Faker siguiendo el formato de un producto real del proyecto.

## 📝 Variables de Entorno

Archivo ejemplo del `.env` contiene:

```bash
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
