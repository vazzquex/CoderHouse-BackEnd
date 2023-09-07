import { Router } from "express";

import cartController from "../controllers/cart.controller.js";
import { productService, userService } from "../services/index.js";
import userModel from "../DAOs/models/user.model.js";

const router = Router();

// Get carts
router.get('/:userId/cart', async (req, res) => {
  try {
    const { userId } = req.params;

    const carts = await cartController.getCartUserById(userId);
    
    res.status(200).json({ carts });
  } catch (error) {
    req.logger.error(`Error trying to get carts: ${error}`);
    res.status(500).send(`Internal server error trying to get carts: ${error}`);
  };
});


router.get('/:userId', async (req, res) => {
  const { user } = req.params.user;
  delete user.password;

  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await cartController.deleteProductOfCart(cid, pid);
    res.status(202).json(currentCart);
  } catch (error) {
    req.logger.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };

});


router.post('/userId/cart', cartController.addProductToCart)


// Update all products of cart
router.put('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const updatedProducts = req.body;
    const currentCart = await cartController.updateAllProducts(cid, updatedProducts);
    res.status(202).json(currentCart);
  } catch (error) {
    req.logger.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});



// delete product cart
router.post('/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const user = await userService.getById(userId);

    // Filtra los productos en el carrito para excluir el producto que deseas eliminar
    req.logger.debug("Filtro los productos en el carrito");
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    // save user
    await user.save();

    const populateUser = await userService.findById(userId);

    res.status(200).json(populateUser)
    
  } catch (error) {
    req.logger.error(`Error removing product from cart: ${error}`);
    res.status(500).send(`Internal server error removing product from cart: ${error}`);
  }
});


//Delete by post
router.post('/:cid/products/delete/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const currentCart = await userService.findById(cid, pid);
    res.status(202).json(currentCart);
  } catch (error) {
    req.logger.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

export default router;