const {validate} = require('super-easy-validator')

async function postLogin(req, res, next) {
  try {
    const rules = {
      email: 'email',
      password: 'string|min:3|max:10'
    }
    const {errors} = validate(rules, req.body)
    if(errors) {
      return res.status(400).json({message: errors[0]})
    }
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

const validations = {
  postLogin
}

module.exports = validations