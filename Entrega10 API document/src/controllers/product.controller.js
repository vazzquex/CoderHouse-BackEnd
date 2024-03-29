import productModel from '../DAOs/models/products.model.js';
import mongoose from 'mongoose';
import { productRepository } from '../repositories/index.js';

class ProductController {

  // Read
  getProducts = async (limit, page, sort, query) => {
    let formatLimit = limit ? Number(limit) : 4;
    let formatPage = page ? Number(page) : 1;
    let formatQuery = query ? { category: query } : {};
    
    let formatSort ;
    if(sort === "asc"){
      formatSort = "1";
    }else if(sort === "desc"){
      formatSort = "-1";
    }else if (sort && sort !== "asc" && sort !== "desc"){
      throw new Error('Error: Bad Request, just admit asc and desc');
    };

    try {
      const products = await productModel.paginate(formatQuery, {page: formatPage, limit: formatLimit, sort: { price: formatSort }, lean: true})
      return products;
    } catch (error) {
      console.error(`Error trying to fetch all products: ${error}`);
    };
  };

  getProductById = async (id) => {
    try {
      const product = await productModel.findById(id).lean().exec();
      //const product = await productRepository.getById(id);

      return product;
    } catch (error) {
      console.error(`Error trying to fetch product by id: ${error}`);
    };
  };

  // Create
  addProduct = async (product) => {

    const title = product.title.trim();
    const description = product.description.trim();
    const price = Number(product.price);
    const category = product.category.trim();
    const status = product.status ?? true;
    const stock = Number(product.stock);
    const owner = product.email;
    const thumbnail = product.thumbnail;

    const formattedProduct = {
      title: title,
      description: description,
      price: price,
      category: category,
      status: status,
      stock: stock,
      owner: owner,
      thumbnail: thumbnail,
    };

    try{
      const newProduct = new productModel(formattedProduct);
      await newProduct.save();
      return newProduct;
    } catch (error) {
      console.error(`Error trying to create a new product: ${error}`);
    };
  };

  // Update
  updateProduct = async (id, data) => {
    // Format values
    const fieldsToUpdate = Object.keys(data);
    const formattedValues = {};

    fieldsToUpdate.forEach((field) => {
      let formattedValue = data[field];
    
      if (field === 'precio' || field === 'stock') {
        formattedValue = Number(formattedValue);
      } else if (field === 'status'){
        formattedValue = Boolean(formattedValue);
      } else {
        // Agregar una comprobación adicional aquí
        if (typeof formattedValue === 'string') {
          formattedValue = formattedValue.trim();
        }
      }
    
      // Eliminar valores vacíos ("")
      if (formattedValue !== "") {
        formattedValues[field] = formattedValue;
      }
    });

    if (Object.keys(formattedValues).length === 0) return;
    
    // Try to update
    try {
      const updatedProduct = await productModel.findByIdAndUpdate(id, formattedValues, { new: true }).exec();
      return updatedProduct;
    } catch (error) {
      console.error(`Error trying to update product: ${error}`);
    };
  };

  // Delete
  deleteProduct = async (id) => {
    try {
      const deletedProduct = await productModel.findByIdAndDelete(id).exec();
      return `Product deleted successfully: ${deletedProduct}`;
    } catch (error) {
      console.error(`Error trying to delete product: ${error}`);
    };
  };
}

const productController = new ProductController();

export default productController;