import { Router } from "express";

import cartController from "../controllers/cart.controller.js";
import userService from "../services/user.service.js";
import userModel from "../DAOs/models/user.model.js";

import { productRepository, userRepository } from "../repositories/index.js";

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


// add product to cart
router.post('/:userId/cart', async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  try {

    req.logger.debug("Enter in try")

    let user = await userRepository.getById(userId);
    let product = await productRepository.getById(productId);

    req.logger.debug("Check user")
    if (!user) {
      req.logger.error(`User ${userId} does not exist`);
      return res.status(404).send({ error: 'User not found' });
    }

    req.logger.debug("Check product owner")
    req.logger.debug(product)
    req.logger.debug(user)


    req.logger.debug("Check user email and product owner")
    if(user.email === product.owner) {
      req.logger.warning("You cannot add your own product to the cart!")
      return res.status(400)
    }

    user.cart.push({ productId, quantity });
    user.markModified('cart');

    req.logger.debug("updateUser");
    await userService.updateUser(user);

    req.logger.debug("populate user");
    user = await userModel.findById(userId).populate('cart.productId');

    const populatedUser = await userService.populateProductCart(userId);

    req.logger.debug("respond status")
    // Respond with the populated user.
    return res.status(200).send({ message: `Product added successfully: ${product}`});


  } catch (error) {
    req.logger.error(error)
    res.status(400).send({ error: error.message });
  }
});



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
    const user = await userRepository.getById(userId);

    // Filtra los productos en el carrito para excluir el producto que deseas eliminar
    req.logger.debug("Filtro los productos en el carrito");
    user.cart = user.cart.filter(item => item.productId.toString() !== productId);

    // save user
    await user.save();

    const populateUser = await userService.populateProductCart(userId);

    res.status(200).json(populateUser)

    //res.status(204).end();


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
    const currentCart = await cartController.deleteProductOfCart(cid, pid);
    res.status(202).json(currentCart);
  } catch (error) {
    req.logger.error(`Error trying to add a product to cart: ${error}`);
    res.status(500).send(`Internal server error trying to add a product to cart: ${error}`);
  };
});

export default router;