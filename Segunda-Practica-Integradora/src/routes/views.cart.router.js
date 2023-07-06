import { Router } from 'express';
const router = Router();

import cartsManager from '../dao/manager/CartsManager.js';
import userService from '../services/user.service.js';

// Cart view
router.post('/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
      const cart = await userService.getCartUser(userId);
      res.status(200).json({ cart });
      
    } catch (error) {
      console.error(`Error trying to get cart: ${error}`);
      res.status(500).send(`Internal server error trying to get cart: ${error}`);
    };
  });
  

export default router;