const { validate } = require('super-easy-validator')

async function postTodo(req, res, next) {
	try {
		const rules = {
			task: 'string|min:3|max:100'
		}
		const { errors } = validate(rules, req.body)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}
		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function getTodos(req, res, next) {
	try {
		const rules = {
			limit: 'optional|string|natural',
			page: 'optional|string|natural',
			search: 'optional|string',
		}
		const { errors } = validate(rules, req.query)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}
		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function getTodo(req, res, next) {
	try {
		const rules = {
			id: 'mongoid'
		}
		const { errors } = validate(rules, req.params)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}
		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function patchTodo(req, res, next) {
	try {
		const rules = {
			id: 'mongoid',
      task: 'optional|string|min:3|max:100',
      done: 'optional|boolean',
		}
		const { errors } = validate(rules, {...req.params, ...req.body})
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}
		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

async function deleteTodo(req, res, next) {
	try {
		const rules = {
			id: 'mongoid'
		}
		const { errors } = validate(rules, req.params)
		if (errors) {
			return res.status(400).json({ message: errors[0] })
		}
		return next()
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

const validations = {
	postTodo,
	patchTodo,
  deleteTodo,
  getTodos,
  getTodo
}

module.exports = validations
