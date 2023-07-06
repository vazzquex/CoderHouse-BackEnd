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


// add product to cart 2
router.post('/:userEmail/cart', async (req, res) => {
  const { userEmail } = req.params;
  const { productId, quantity } = req.body;

  try {
    const user = await userService.getByEmail(userEmail);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.cart.push({ productId, quantity });
    user.markModified('cart');
    const updatedUser = await userService.updateUser(user);
    res.status(200).json(updatedUser);
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
router.post('/:userEmail/cart/delete', async (req, res) => {
  const { userEmail } = req.params;
  const { productId } = req.body;

  try {
    const user = await userService.getByEmail(userEmail);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Utilizar reduce para eliminar el producto del carrito
    user.cart = user.cart.reduce((result, item) => {
      if (item.productId !== productId) {
        result.push(item);
      }
      return result;
    }, []);

    user.markModified('cart');
    const updatedUser = await userService.updateUser(user);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
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