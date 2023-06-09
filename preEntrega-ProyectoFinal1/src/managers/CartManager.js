const fs = require ('fs');

class CartManager{
    constructor(path){
        this.path = path;
    }

    createCart(){
        const cartList = this.getData();
        const cart = {products: []}

        if(cartList.length == 0){
            cart.id = 1
        }else{
            let lastItemID = cartList[cartList.length - 1].id
            cart.id = lastItemID + 1
        }

        cartList.push(cart);
        fs.writeFileSync(this.path,JSON.stringify(cartList, null, 2))
        return cart;
    }

    getCartByID(cid){
        const cartList = this.getData();

        let searchCart = cartList.find(cart => cart.id == cid);
        if(searchCart){
            return searchCart;
        }else{
            return {err: `El carrioto con el ID ${cid} no existe`};
        }
    }

    addProductToCart(cid, pid){
        const cartList = this.getData();

        let indexCart = cartList.findIndex(cart => cart.id == cid);
        if(indexCart == -1){
            return {err: `El carrito con el ID ${cid} no existe`};
        }

        // Ver si el producto ya se encuentra en el carrito
        let productIndex = cartList[indexCart].products.findIndex(prod => prod.id == pid )
        if(productIndex == -1){
            const toAdd = {id: pid, quantity: 1}

            cartList[indexCart].products.push(toAdd)
            fs.writeFileSync(this.path,JSON.stringify(cartList, null, 2))

            return {message: 'Se agrego al carrito', cart: cartList[indexCart].products};
        
        }else{
            cartList[indexCart].products[productIndex].quantity += 1;

            fs.writeFileSync(this.path,JSON.stringify(cartList, null, 2))

            return {message: 'Se agrego al carrito', cart: cartList[indexCart].products}
        }
    }
    
    getData(){
        let data = []
        try{
            const productos = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
            productos.forEach(element => {
                data.push(element)
            });

        }catch{
            console.log('No existe el archivo')
        }
        return data;
    }

}

module.exports = CartManager;
