import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import viewsRouter from './routers/viewsRouter.js';
import {Server} from 'socket.io';
import productRouter from './routers/productRouter.js';
import ProductManager from './controllers/productController.js';

const app = express();

const productManager = new ProductManager("src/products.json");

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//NEW

app.use('/api/products', productRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));

app.use('/', viewsRouter);

//middleware
app.use((err,req,res,next) => {
    console.error(err);
    res.status(500).send('Internal Server Error: ' + err.message)
})

const webServer = app.listen(8080, ()=>{
    console.log("Escuchando por el puerto 8080");
});

const socketServer = new Server(webServer);

socketServer.on('connection', socket =>{
    console.log("cliente conectado")

    socket.on('newProduct', async (product) => {
        await productManager.addProduct(product);
        socketServer.emit('updateProducts', await productManager.getProducts());
    });


    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProductById(id);
        socketServer.emit('updateProducts', await productManager.getProducts());
      });

});