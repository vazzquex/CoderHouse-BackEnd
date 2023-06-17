const fs = require('fs');

class ProductoManager {
    constructor(path) {
        this.path = path;
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, '[]', 'utf-8');
        }
    }

    guardar = async (datos) => {
        try {
            await fs.promises.writeFile(
                this.path, JSON.stringify(datos, null, 2)
            )
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    getAll = async () => {
        try {
            const productos = await fs.promises.readFile(this.path, 'utf-8');
            return JSON.parse(productos);
        } catch (error) {
            if (error.message.includes('no hay archivo o directorio')) return [];
            console.log(`error: ${error}`);
        }
    }

    agregar = async (obj) => {
        let productos = await this.getAll();
        try {
            let nuevoId;
            productos.length === 0 ? nuevoId = 1 : nuevoId = productos[productos.length - 1].id + 1;
            let nuevoObj = { ...obj, id: nuevoId };
            productos.push(nuevoObj);
            await this.guardar(productos);
            return nuevoObj.id;
        } catch (error) {
            console.log(`error de agregar: ${error}`);
        }
    }

    getByID = async (id) => {
        let productos = await this.getAll();
        try {
            let filtrado = productos.find(e => e.id == id)
            return filtrado;
        } catch (error) {
            console.log(error)
        }
    }

    deleteByID = async (id) => {
        let productos = await this.getAll();
        try {
            productos = productos.filter(p => p.id !== id);
            await this.guardar(productos);
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    DeleteAll = async () => {
        await this.guardar([]);
    }
}

const administradorProductos = new ProductoManager('productos.json')

// Ejemplo de uso
const prueba = async () => {
    let id = await administradorProductos.agregar({
        titulo: 'Producto1',
        precio: 1000,
        thumbnail: 'producto1@gmail.com'
    });



/*     let todos = await administradorProductos.getAll();
    console.log(todos);

    let producto = await administradorProductos.getByID(id);
    console.log(producto);

    await administradorProductos.deleteByID(id);

    await administradorProductos.DeleteAll();  */

};

prueba();
