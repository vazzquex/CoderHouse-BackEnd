# PreEntrega2 Proyecto Final

Este proyecto de un ecommerce que se basa en la venta de componentes de computadoras. La aplicación está estructurada en torno a varios rutas (routers) que brindan funcionalidades específicas.

## Rutas de la Aplicación 

1. */productos*: Este es el router principal. Al acceder a esta ruta, se muestran todos los productos disponibles en la tienda.

2. */chat*: Esta ruta ofrece una funcionalidad de chat en tiempo real. Se implementa utilizando WebSockets para proporcionar una comunicación en tiempo real entre el cliente y el servidor.

3. */cart/:cart-id*: Esta ruta permite al usuario ver y gestionar los productos que ha añadido a su carrito de compras.

## Instalación

Para instalar y ejecutar este proyecto, siga los siguientes pasos:

1. Clonar el repositorio
2. Navegar a la carpeta `preEntrega-ProyectoFinal2`
3. Ejecutar `npm install` para instalar las dependencias
4. Ejecutar `npm start` para iniciar el servidor

## Dependencias

Este proyecto utiliza las siguientes dependencias:

- express: ^4.18.2
- express-handlebars: ^7.0.7
- express-session: ^1.17.3
- mongoose: ^7.2.3
- mongoose-paginate-v2: ^1.7.1
- socket.io: ^4.6.2

## Scripts


- `npm start`: Inicia el servidor
