const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = this.getProducts();
  }

  addProduct(title, id, description, precio, code, stock) {

    const products = this.getProducts();

    if (products.find(p => p.id === id)) {
        console.log(`El producto con ID ${id} ya existe`);
        return;
    }

    const product = {
      title,
      id,
      description,
      precio,
      code,
      stock
    };

    this.products.push(product);
    this.saveProducts();
  }

  getProducts() {
    try {
      const data = fs.readFileSync(this.path);
      return JSON.parse(data.toString());
    } catch (error) {
      return [];
    }
  }

  getProductById(id) {
    return this.products.find(product => product.id === id);
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }
}

const productos = new ProductManager('productos.json');
productos.addProduct('Producto 1', 1, 'Descripción1', 100, 'ABC123', 10);
productos.addProduct('Producto 2', 2, 'Descripción2', 200, 'BBC456', 5);
productos.addProduct('Producto 3', 3, 'Descripción3', 100, 'CBC123', 10);
productos.addProduct('Producto 4', 4, 'Descripción4', 200, 'DBC456', 5);
productos.addProduct('Producto 5', 5, 'Descripción5', 100, 'EBC123', 10);
productos.addProduct('Producto 6', 6, 'Descripción6', 200, 'FBC456', 5);

module.exports = ProductManager;