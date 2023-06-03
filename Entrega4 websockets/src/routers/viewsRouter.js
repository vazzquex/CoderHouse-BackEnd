import fs from 'fs';
import { Router } from 'express';
import ProductManager from '../controllers/productController.js';

const router = Router();
const productManager = new ProductManager("src/products.json");

/* const filePath = 'src/products.json';

if (fs.existsSync(filePath)) {
    console.log('La ruta es correcta. El archivo existe.');
} else {
    console.log('La ruta es incorrecta o el archivo no existe.');
} */
  
router.get('/', async (req, res) => { 
    const products = await productManager.getProducts();
    res.render('index', {products: products});
});

router.get('/realTimeProducts', async (req, res) => { 
    const products = await productManager.getProducts();
    res.render('realTimeProducts', {products: products});
});

export default router;