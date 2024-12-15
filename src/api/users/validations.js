const {validate} = require('super-easy-validator')

async function postUser(req, res, next) {
  try {
    const rules = {
      name: 'fullname',
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

async function patchUser(req, res, next) {
  try {
    const rules = {
      name: 'optional|fullname',
      email: 'optional|email',
      password: 'optional|string|min:3|max:10'
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

async function putUserPhoto(req, res, next) {
  try {
    const photo = req.files?.photo?.[0]
    if(!photo) {
      return res.status(400).json({message: 'photo is required'})
    }
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'server error'})
  }
}

const validations = {
  postUser,
  patchUser,
  putUserPhoto
}

module.exports = validations