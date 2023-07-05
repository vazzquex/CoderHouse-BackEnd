import userModel from '../dao/models/user.model.js';


class UserService {
	constructor() {
		this.model = userModel;
	}

	async getAll() {
		return await this.model.find();
	}

	async getByEmail(email) {
		return await this.model.findOne({ email: email });
	}

	async createUser(userData) {
		return await this.model.create(userData);
	}
	
	async getUserById(userId){
		return await this.model.findOne({_id: userId});
	}
	async getById(id) {
		return await this.model.findById(id)
	}


	async getByAge(age) {
		return await this.model.findOne({ age: age });
	}

}

const userService = new UserService();
export default userService;
