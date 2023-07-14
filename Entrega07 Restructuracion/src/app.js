// Dependencies
import mongoose from 'mongoose';
import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import productManager from './dao/manager/ProductManager.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';

//environment variables
import 'dotenv/config'

//passport
import incializePassport from './config/passport.confg.js';

//data
//import dataProducts from './data/products.json' assert {type: 'json'};

//model
import productModel from './dao/models/products.model.js';

//routes
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import viewsCartsRouter from './routes/views.cart.router.js'
import productsRouter from './routes/products.router.js';
import realTimeProductsRouter from './routes/realTimeProducts.router.js';
import chatRouter from './routes/chat.router.js';
import cartsRouter from './routes/carts.router.js';
import usersRouter from './routes/user.router.js';
import profileRouters from './routes/profile.router.js';

// Config


const mongodb_server = process.env.mongodb

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./src/public'));

//Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

// app.get('/', (req, res) => {
//     res.redirect('/products');
// })

app.use(cookieParser('9843f78efyh'));

// Session
app.use(
	session({
		store: MongoStore.create({
			mongoUrl:
				mongodb_server,
			mongoOptions: {
				useNewUrlParser: true,
			},
			ttl: 6000,
		}),
		secret: '9843f78efyh',
		resave: true,
		saveUninitialized: true,
	})
);

mongoose.set("strictQuery", false);
try {
    await mongoose.connect(mongodb_server);
} catch {
    console.error(`Database connection failed: ${error}`);
};

incializePassport();

app.use("/", profileRouters);

// api
app.use('/api/sessions', sessionsRouter);

app.use("/api/users", usersRouter)
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

//app.use(express.static('public'));

//insert product data if necessary1
// try {
//     await productModel.insertMany(dataProducts);
// } catch (err) {
//     console.log(`error al insertar data: ${err} `);
// }


const httpServer = app.listen(port, () => {
    console.log(`Escuchando por el puerto ${port}`);
});
const socketServer = new Server(httpServer);



//Routers
app.use("/products", profileRouters);
app.use("/carts", viewsCartsRouter);
app.use('/realTimeProducts', realTimeProductsRouter(socketServer));
app.use("/chat", chatRouter(socketServer));