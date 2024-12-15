const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true
		},
    photo: String
	},
	{
		timestamps: true,
		versionKey: false
	}
)

const User = mongoose.model('User', UserSchema, 'users')

module.exports = {
  User
}
