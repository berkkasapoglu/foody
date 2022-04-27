const AppError = require('../utils/AppError')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
  let token
  const auth = req.headers.authorization
  try {
    if (auth && auth.startsWith("Bearer")) {
      token = auth.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).populate('favorites')
      next()
    }
  } catch(e) {
    next(new AppError(401, 'Not Authorized'))
  }
  
  if(!token) {
    next(new AppError(401, 'Not Authorized'))
  }
}

module.exports = auth