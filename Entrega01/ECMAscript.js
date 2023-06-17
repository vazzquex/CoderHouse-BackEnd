class ProductManager {
  constructor() {
    this.products = [];
    this.lastProductId = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return;
    }

    if (this.getProductByCode(code)) {
      console.log("ya existe");
      return;
    }

    this.lastProductId++;
    const newProduct = {
      id: this.lastProductId,
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    };
    this.products.push(newProduct);
    console.log("se añado el producto");
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(p => p.id === id);
    if (!product) {
      console.log("Not found");
    }
    return product;
  }

  getProductByCode(code) {
    const product = this.products.find(p => p.code === code);
    return product;
  }
}

const manager = new ProductManager();

manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

const products = manager.getProducts();
console.log(products);

manager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

const product = manager.getProductById(2);
console.log(product);
