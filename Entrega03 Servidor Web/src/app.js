const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productos = new ProductManager('productos.json');

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = limit ? productos.getProducts().slice(0, limit) : productos.getProducts();
  res.json({ products });
});

app.get('/products/:pid', (req, res) => {
  const pid = parseInt(req.params.pid);
  const product = productos.getProductById(pid);
  res.json({ product });
});

app.listen(3000, () => {
  console.log('Escuchando por el puerto 3000');
});
