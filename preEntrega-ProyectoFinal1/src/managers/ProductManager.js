const fs = require ('fs');

class ProductManager{
    constructor(path){
        this.path = path;
        this.productList = [];
        this.loadProducts();
    }

    loadProducts() {
        const rawData = fs.readFileSync(this.path);
        this.productList = JSON.parse(rawData);
    }

    addProduct({title, description,  code, price, status = true,  stock, category, thumbnails=[]}){
        const productList = this.getData();

        let product = {
            id: productList.length == 0 ? 1 : productList[productList.length-1].id + 1,
            title, 
            description, 
            code, 
            price, 
            status: true, 
            stock, 
            category, 
            thumbnails
        }

        productList.push(product);
        fs.writeFileSync(this.path,JSON.stringify(productList, null, 2))
        return product;
    }

    getProducts(){
        return this.productList;
    }

    getProductByID(pid){
        let productList = this.getData();

        let searchProduct = productList.find(product => product.id == pid);
        if(searchProduct){
            return searchProduct;
        }else{
            return {err: `No existe el ID ${pid} de producto en la lista`}
        }
    }

    deleteProduct(pid){
        let productList = this.getData();

        let indexProduct = productList.findIndex(product => product.id == pid)

        if(indexProduct >= 0){
            productList.splice(indexProduct,1)
            fs.writeFileSync(this.path,JSON.stringify(productList, null, 2))
            return {message: `Se elimino el producto con el ID ${pid}`}
        }else{
            return {err: `El producto con el ID ${pid} no esta en la lista`}
        }
    }


    updateProduct(pid, {title, description, code, price, status, stock, category, thumbnails}){
        // Actualiza un producto
        let productList = this.getData();

        let index = productList.findIndex(product => product.id == pid);

        if (index >= 0) {
            let product = productList[index];
            const updates = { title, description, code, price, status, stock, category, thumbnails };
          
            for (let prop in updates) {
              if (updates[prop] && product[prop] !== updates[prop]) {
                product[prop] = updates[prop];
              }
            }
          
            fs.writeFileSync(this.path, JSON.stringify(productList, null, 2));
            return productList[index];
          } else {
            return { err: 'El producto no está en la lista' };
          }
    }
    
    getData(){
        let data = []
        try{
            const carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            carts.forEach(element => {
                data.push(element)
            });

        }catch{
            console.log('No existe el archivo')
        }
        return data;
    }

}

module.exports = ProductManager;
