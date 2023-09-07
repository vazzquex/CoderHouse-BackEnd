import productRepository from '../repositories/products.repository.js';

class ProductService {
	constructor() {
		this.repository = productRepository;
	}

	async getById(id) {
		const product = await this.repository.getById(id);
		return product;
	}

	
}

const productService = new ProductService();
export default productService;
