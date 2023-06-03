const { Router } = require ("express");
const ProductManager = require ("../managers/ProductManager.js");

const router = Router();
const listaProductos = new ProductManager('./src/productos.json')

router.get('/', (req,res) => {
    const products = listaProductos.getProducts()
    res.status(200).send(products);
})

router.get('/:pid', (req,res) => {
    const { pid } = req.params;

    const result = listaProductos.getProductByID(pid);

    if( result.id ){
        res.status(200).send(result)
    }else{
        res.status(400).send(result)
    }
})

router.post('/', (req,res) => {
    const {title, description, code, price, status,  stock, category, thumbnails} = req.body;

    const requiredFields = {
        title: 'El título "title" es obligatorio.',
        description: 'La descripción "description" es obligatoria.',
        code: 'El código "code" es obligatorio.',
        price: 'El precio "price" es obligatorio.',
        status: 'El estado "status" es obligatorio.',
        stock: 'El stock "stock" es obligatorio.',
        category: 'La categoría "category" es obligatoria.'
      };
      
      for (let field in requiredFields) {
        if (!req.body[field]) {
          throw new Error(requiredFields[field]);
        }
      }

    const product = {title, description, code, price, status, stock, category, thumbnails}
    const result = listaProductos.addProduct(product);
    res.status(200).send(result)
})

router.put('/:pid', (req,res) => {
    const {pid} = req.params;
    const {title, description, code, price, status,  stock, category, thumbnails} = req.body;

    const result = listaProductos.updateProduct(pid, {title, description, code, price, status,  stock, category, thumbnails});

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
})

router.delete('/:pid', (req, res) => {
    const { pid } = req.params;

    const result = listaProductos.deleteProduct(pid);

    if(result.err){
        res.status(400).send(result)
    }else{
        res.status(200).send(result)
    }
    
})

module.exports = router;
