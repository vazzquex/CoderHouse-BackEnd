import userModel from '../DAOs/models/user.model.js';
import BaseRepository from './base.repository.js';

export default class UserRepository extends BaseRepository {
    constructor(dao) {
        super(dao);
    }

    async createUser(userData) {
        return await userModel.create(userData);
    }


    async findById(userId) {
        return await userModel.findById(userId).populate('cart.productId').lean();
    }

    async save(user) {
        user.markModified('cart');
        return await user.save();
    }

    async deleteUserById(uid) {
        return await userModel.deleteOne({ _id: uid });
    }

    async findTokenAndExpiraton(token) {
        return await userModel.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    }

    async updateRolToPremium(uid) {
        return await userModel.updateOne({ _id: uid }, { $set: { rol: 'premium' } });
    }
    async updateRolToUser(uid) {
        return await userModel.updateOne({ _id: uid }, { $set: { rol: 'user' } });
    }

    async getCartUser(userId) {
        return await userModel.findOne({ _id: userId }, { _id: 0, cart: 1 });
    }

    async getByEmail(email) {
        return await userModel.findOne({ email: email });
    }

    async getById(id) {
        return await userModel.findById(id);
    }


}
