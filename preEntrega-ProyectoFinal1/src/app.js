const express = require('express');
const cartRouter = require ('./routers/cartRouter.js');
const productRouter = require ('./routers/productRouter.js')

const app = express();
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

app.use('/api/carts', cartRouter);
app.use('/api/products', productRouter);

// middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Internal Server Error: ' + err.message);
});

app.listen(8080, () => {
    console.log("Escuchando por el puerto 8080");
});
