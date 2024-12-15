const jwt = require('jsonwebtoken')
const helpers = require('../../utils/helpers')
const { User } = require('../users/models')

async function postLogin(req, res) {
	try {
		const { email, password } = req.body
		let user = await User.findOne({ email })
		if (!user) {
			return res.status(404).json({ message: 'user not found' })
		}

		const hash = helpers.getHash(password)
		if(!user.password.endsWith(hash)) {
			return res.status(401).json({message: 'authentication failed'})
		}

		const token = jwt.sign({id: user._id, hash: hash.slice(-10)}, process.env.JWT_SECRET)

		return res.json({ token })
	} catch (error) {
		console.log(error)
		return res.status(500).json({ message: 'server error' })
	}
}

const validations = {
	postLogin
}

module.exports = validations
