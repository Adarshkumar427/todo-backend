const validations = require('./validations')
const controllers = require('./controllers')
const Router = require('express')
const router = Router()

// !🌍 POST `/auth/login`
router.post('/login', validations.postLogin, controllers.postLogin)

module.exports = router
