const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
	{
		task: {
			type: String,
			required: true
		},
		done: {
			type: Boolean,
			default: false
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User'
		}
	},
	{
		timestamps: true,
		versionKey: false
	}
)

const Todo = mongoose.model('Todo', TodoSchema, 'todos')

module.exports = {
	Todo
}
