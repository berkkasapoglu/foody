const User = require("../models/user")
const Recipe = require("../models/recipe")
const AppError = require("../utils/AppError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
  const { username, password, email } = req.body
  if (!username || !password || !email) {
    return next(new AppError(401, "Please fill all fields"))
  }

  const userExists = await User.findOne({ email: email })
  if (userExists) {
    return next(new AppError(400, "User already exist"))
  }

  //Hashed before save
  const user = new User({
    username,
    email,
    password,
  })

  const newUser = await user.save()
  if (newUser) {
    res.status(201).json({
      success: true,
      data: {
        username: newUser.username,
        email: newUser.email,
        token: generateToken(newUser._id, newUser.username),
      },
    })
  } else {
    return next(new AppError(400, "Invalid User Data"))
  }
}

const login = async (req, res, next) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      success: true,
      data: {
        username: user.username,
        email: user.email,
        token: generateToken(user._id, user.username),
      },
    })
  } else {
    next(new AppError(401, "Username or password is wrong"))
  }
}

const addFavorite = async (req, res, next) => {
  const { recipeId } = req.params
  const userId = req.user._id
  const recipe = await Recipe.findById(recipeId)
  if (recipe) {
    await User.findByIdAndUpdate(userId, { $push: { favorites: recipe._id } })
    res.status(200).json({
      success: true,
      message: "Recipe added successfully",
    })
  } else {
    next(new AppError(400, "Recipe does not exist"))
  }
}

const removeFavorite = async (req, res, next) => {
  const { recipeId } = req.params
  const userId = req.user._id
  const recipe = await Recipe.findById(recipeId)
  if (recipe) {
    await User.findByIdAndUpdate(userId, { $pull: { favorites: recipe._id } })
    res.status(200).json({
      success: true,
      message: "Recipe removed successfully",
    })
  } else {
    next(new AppError(400, "Recipe does not exist"))
  }
}

const getMe = async(req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user
  })
}

const generateToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = {
  register,
  login,
  addFavorite,
  removeFavorite,
  getMe
}
