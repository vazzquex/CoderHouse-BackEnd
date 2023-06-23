import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
	first_name: String,
	last_name: String,
	email: {
		type: String,
		unique: true,
		required: true,
		index: true,
	},
	rol: {
		type: String,
		default: "user"
	},
	password: String,
	img: String,
});

const userModel = mongoose.model('users', userSchema);

export default userModel;
