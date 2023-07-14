import { Router } from 'express';
const router = Router();

import productManager from '../dao/manager/ProductManager.js';
import cartsManager from '../dao/manager/CartsManager.js';
import userService from '../services/user.service.js';

router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userService.getCartUser(userId);
        const { user: sessionUser } = req.session;
        delete sessionUser.password;

        // Crear un array para almacenar los productos
        let products = [];

        for (let item of user.cart) {
            const product = await productManager.getProductById(item.productId);

            products.push(product);
        }

        res.status(201).render('cart', {
            title: "Cart",
            products, // Pasar los productos a la vista
            user: sessionUser
        })

    } catch (error) {
        console.error(`Error trying to get cart: ${error}`);
        res.status(500).send(`Internal server error trying to get cart: ${error}`);
    };
});



export default router;