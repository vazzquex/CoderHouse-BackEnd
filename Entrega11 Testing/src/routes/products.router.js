import { Router } from 'express';
import productController from '../controllers/product.controller.js';

// custom errors
import CustomErrors from '../tools/CustomErrors.js';
import EErrors from '../tools/EErrors.js';
import { ProductErrorInfo } from '../tools/EErrorInfo.js';

const router = Router();

// Get
router.get('/', productController.getAllProducts);
router.get('/:pid', productController.getProductById);


// Create
router.post("/", async (req, res) => {
  if (!req.body) return;

  try {
    const currentProduct = await productController.addProduct(req.body);
    res.status(201).send({ currentProduct });
  } catch (error) {
    req.logger.error(`Error trying to create a product: ${error}`);
    res.status(500).send(`Error trying to create a product: ${error}`);
  };

});

// Update 
router.put("/:pid", async (req, res) => {
  if (!req.body) {
    return res.status(400).send("Request body is missing");
  }

  const pid = req.params.pid;
  try {
    const updatedProduct = await productController.updateProduct(pid, req.body);
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send({ updatedProduct });
  } catch (error) {
    req.logger.error(`Error trying to update a product: ${error}`);
    res.status(500).send(`Error trying to update a product: ${error}`);
  }
});

// Delete
router.delete("/:pid", async (req, res) => {
  const pid = req.params.pid;

  try {
    const deteledProduct = await productController.deleteProduct(pid);
    res.status(200).send(deteledProduct);
  } catch (error) {
    req.logger.error(`Error trying to delete a product: ${error}`);
    res.status(500).send(`Error trying to create a product: ${error}`);
  };
});


export default router;