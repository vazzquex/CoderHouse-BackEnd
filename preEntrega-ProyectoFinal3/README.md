# 📦 PreEntrega - ProyectoFinal 3 🚀

En esta entrega, implementé que solo el admin pueda agregar productos. También agregué un middleware a la sesión actual para no mostrar información sensible. Añadí la posibilidad de terminar una compra y recibir los detalles en el correo una vez finalizada la compra. Además, ahora se resta el stock de los productos comprados en la base de datos.

Actualicé la ruta /api/sessions/current para que ahora oculte la información sensible a través de un middleware.

Además, incorporé un modelo de tickets para facilitar su almacenamiento en una colección de MongoDB. A este modelo le añadí un "service" y un "DTO", siguiendo el mismo procedimiento que realicé con "users", a los cuales también les añadí un "DTO".

## 📝 Variables de Entorno

Archivo ejemplo del `.env` contiene:

```bash
MONGO_URL='mongodb://localhost:8080/test' 

# Las siguientes variables son para la autenticación con GitHub usando Passport
CLIENT_ID='Iv1.a1b2c3a1b2c3'
CLIENT_SECRET='12345123451234512345123451'

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
