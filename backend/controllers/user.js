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
        token: generateToken(newUser._id, newUser.username, newUser.email),
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
        token: generateToken(user._id, user.username, user.email),
      },
    })
  } else {
    next(new AppError(401, "Username or password is wrong"))
  }
}

const generateToken = (id, username, email) => {
  return jwt.sign({ id, username, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

const addToFavorites = async (req, res, next) => {
  const { recipeId } = req.params
  const userId = req.user._id
  const recipe = await Recipe.findById(recipeId)
  if (recipe) {
    await User.findByIdAndUpdate(userId, { $push: { favorites: recipe._id } })
    return res.status(200).json({
      success: true,
      message: "Recipe added successfully",
    })
  }
  next(new AppError(400, "Recipe does not exist"))
}

const removeFromFavorites = async (req, res, next) => {
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

const getMe = async (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.user,
  })
}

const addToPlanner = async (req, res, next) => {
  const id = req.user._id
  const newPlan = req.body

  for (let dailyPlan of newPlan) {
    await User.updateOne(
      { _id: id, "planner.day": new Date(dailyPlan.day) },
      {
        $push: { "planner.$.meals": dailyPlan.meals },
      }
    )

    await User.updateOne(
      { _id: id, "planner.day": { $ne: new Date(dailyPlan.day) } },
      {
        $push: { planner: dailyPlan },
      }
    )
  }

  res.status(200).json({
    success: true,
    message: "Recipes added successfully to planner.",
  })
}

const removeFromPlanner = async (req, res, next) => {
  const { id, mealTime, date } = req.body
  const { id: userId } = req.user
  const user = await User.findOneAndUpdate(
    {
      "planner.day": new Date(date),
      _id: userId,
    },
    {
      $pull: {
        "planner.$.meals": {
          mealTime: mealTime,
          meal: id,
        },
      },
    },
    {new: true}
  ).populate("planner.meals.meal")
  res.status(200).json({
    success: true,
    message: "Recipes deleted successfully from planner.",
    data: user
  })
}

const updatePersonalInformation = async (req, res, next) => {
  const { id } = req.user
  const updatedFields = {}
  for (const [key, value] of Object.entries(req.body)) {
    updatedFields["personalInformation." + key] = value
  }
  await User.findByIdAndUpdate(id, {
    ...updatedFields,
  })
  res.status(200).json({
    success: true,
    message: "Updated successfully.",
  })
}

module.exports = {
  register,
  login,
  addToFavorites,
  removeFromFavorites,
  getMe,
  addToPlanner,
  updatePersonalInformation,
  removeFromPlanner,
}
