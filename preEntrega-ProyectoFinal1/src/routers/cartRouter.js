const { Router } = require("express");
const CartManager = require("../managers/CartManager.js");

const router = Router();
const carts = new CartManager('./src/carritos.json');

router.post('/', (req, res) => {
  //crear carrito
  const cart = carts.createCart();
  res.status(200).send(cart);
});

router.post('/:cid/product/:pid', (req, res) => {
  // agregar producto al carrito
  const { cid, pid } = req.params;

  const result = carts.addProductToCart(cid, pid);

  if (result.cart) {
    res.status(200).send(result);
  } else {
    res.status(400).send(result);
  }
});


router.get('/:cid', (req, res) => {
  //get carrito id
  const { cid } = req.params;

  const getCart = carts.getCartByID(cid);
  if (getCart.id) {
    res.status(200).send(getCart);
  } else {
    res.status(400).send(getCart);
  }
});

module.exports = router;
