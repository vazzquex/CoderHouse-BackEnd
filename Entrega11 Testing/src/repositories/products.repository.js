import mongoose from 'mongoose';
import productModel from '../DAOs/models/products.model.js';
import ProductDto from '../DTOs/ProductsDto.js';
import BaseRepository from './base.repository.js';

export default class ProductRepository extends BaseRepository {
    constructor(dao){
        super(dao);
    }

    async getById(id) {
        return await productModel.findOne({ _id: id}).lean();
    }

}