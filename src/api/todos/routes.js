const auth = require('../../utils/auth')
const validations = require('./validations')
const controllers = require('./controllers')
const Router = require('express')
const router = Router()

// !🔒 POST `/todos`
router.post('/', auth.authorize, validations.postTodo, controllers.postTodo)

// !🔒 GET `/todos`
router.get('/', auth.authorize, validations.getTodos, controllers.getTodos)

// !🔒 GET `/todos/:id`
router.get('/:id', auth.authorize, validations.getTodo, controllers.getTodo)

// !🔒 PATCH `/todos/:id`
router.patch('/:id', auth.authorize, validations.patchTodo, controllers.patchTodo)

// !🔒 DELETE `/todos/:id`
router.delete('/:id', auth.authorize, validations.deleteTodo, controllers.deleteTodo)

module.exports = router
