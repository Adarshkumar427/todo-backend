const auth = require('../../utils/auth')
const { ImageUploader } = require('../../utils/uploaders')
const validations = require('./validations')
const controllers = require('./controllers')
const Router = require('express')
const router = Router()

// !🌍 POST `/users`
router.post('/', validations.postUser, controllers.postUser)

// !🔒 GET `/users`
router.get('/', auth.authorize, controllers.getUser)

// !🔒 PATCH `/users`
router.patch('/', auth.authorize, validations.patchUser, controllers.patchUser)

// !🔒 PUT `/users/photo`
router.put(
	'/photo',
	auth.authorize,
	ImageUploader.fields([{ name: 'photo', maxCount: 1 }]),
	validations.putUserPhoto,
	controllers.putUserPhoto
)

// !🔒 DELETE `/users/photo`
router.delete('/photo', auth.authorize, controllers.deleteUserPhoto)

module.exports = router
