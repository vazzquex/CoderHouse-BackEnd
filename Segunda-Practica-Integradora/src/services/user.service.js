import userModel from '../dao/models/user.model.js';


class UserService {
	constructor() {
		this.model = userModel;
	}

	async getAll() {
		return await this.model.find();
	}

	async getCartUser(userId) {
		return await this.model.findOne(
			{
				_id: userId
			},
			{
				_id: 0,
				cart: 1
			}
		);
	}

	async getByEmail(email) {
		return await this.model.findOne({ email: email });
	}

	async updateUser(user) {
		return await this.model.findByIdAndUpdate(user._id, user, { new: true });
	}

	async createUser(userData) {
		return await this.model.create(userData);
	}

	async getById(id) {
		return await this.model.findById(id);
	}

	async getByAge(age) {
		return await this.model.findOne({ age: age });
	}

}

const userService = new UserService();
export default userService;
