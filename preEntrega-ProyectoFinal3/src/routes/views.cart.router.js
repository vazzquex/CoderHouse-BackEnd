import { Router } from 'express';
import userService from '../services/user.service.js';
import productController from '../controllers/product.controller.js'
const router = Router();

//finish purchase

router.get('/purchase/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const { user: sessionUser } = req.session;
        delete sessionUser.password;

        const populatedUser = await userService.populateProductCart(userId);

        //verify user exists
        if (!populatedUser) {
            return res.status(404).render('error', {
                title: "Error",
                message: "User not found"
            });
        }

        // Calcula el subtotal para cada producto y el total general
        let total = 0;
        populatedUser.cart = populatedUser.cart.map(item => {
            const subtotal = item.productId.price * item.quantity;
            total += subtotal;
            return {
                ...item,
                subtotal,
                product: item.productId
            };
        });


        res.status(201).render('checkout', {
            title: "checkout",
            products: populatedUser.cart,
            user: sessionUser,
            total,
        })


    } catch (err) {
        console.error(`Error trying to get checkout: ${error}`);
        res.status(500).send(`Internal server error trying to get checkout: ${error}`);
    }


})


router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const { user: sessionUser } = req.session;
        delete sessionUser.password;


        const populatedUser = await userService.populateProductCart(userId);

        //verify user exists
        if (!populatedUser) {
            return res.status(404).render('error', {
                title: "Error",
                message: "User not found"
            });
        }


        res.status(201).render('cart', {
            title: "Cart",
            products: populatedUser.cart,
            user: sessionUser
        })

    } catch (error) {
        console.error(`Error trying to get cart: ${error}`);
        res.status(500).send(`Internal server error trying to get cart: ${error}`);
    };
});

export default router;