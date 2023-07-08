import { Router } from "express";
const router = Router();
import cartsManager from '../dao/manager/CartsManager.js';
import userService from "../services/user.service.js";


// Get carts
router.get('/:userId/cart', async (req, res) => {
  try {
    const carts = await cartsManager.getCarts();
    res.status(200).json({ carts });
  } catch (error) {
    console.error(`Error trying to get carts: ${error}`);
    res.status(500).send(`Internal server error trying to get carts: ${error}`);
  };
});


router.get('/:userId', async (req, res) => {
  const { user } = req.params.user;
  delete user.password;

  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await cartsManager.deleteProductOfCart(cid, pid);
    res.status(202).json(currentCart);
  } catch (error) {
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };

});


// add product to cart
router.post('/:userId/cart', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await userService.getById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.cart.push({ productId, quantity });
    user.markModified('cart');
    const updatedUser = await userService.updateUser(user);


    res.status(204).end();

    //res.status(200).json(updatedUser);



  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update all products of cart
router.put('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const updatedProducts = req.body;
    const currentCart = await cartsManager.updateAllProducts(cid, updatedProducts);
    res.status(202).json(currentCart);
  } catch (error) {
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});



// delete product cart
router.post('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
      // Encuentra al usuario por su ID
      const user = await userService.getById(userId);

      // Filtra los productos en el carrito para excluir el producto que deseas eliminar
      user.cart = user.cart.filter(item => item.productId.toString() !== productId);

      // Guarda el usuario con el carrito actualizado
      await user.save();

      res.status(204).end();


      //res.status(200).redirect('/products')

  } catch (error) {
      console.error(`Error removing product from cart: ${error}`);
      res.status(500).send(`Internal server error removing product from cart: ${error}`);
  }
});


//Delete by post
router.post('/:cid/products/delete/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await cartsManager.deleteProductOfCart(cid, pid);
    res.status(202).json(currentCart);
  } catch (error) {
    console.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

export default router;