const User = require("../models/user")
const Recipe = require("../models/recipe")
const AppError = require("../utils/AppError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { imageUpload } = require("../helpers")

const register = async (req, res, next) => {
  const { username, password, email } = req.body
  const emailTaken = await User.findOne({ email: email })
  if (emailTaken) {
    return next(new AppError(400, "Email is already taken."))
  }
  const usernameTaken = await User.findOne({ username: username })
  if (usernameTaken) {
    return next(new AppError(400, "Username is already taken"))
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
  const { slug } = req.params
  const userId = req.user._id
  const recipe = await Recipe.findOne({ slug })
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
  const { slug } = req.params
  const userId = req.user._id
  const recipe = await Recipe.findOne({ slug })
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
  const { mealId, mealTime, date, _id } = req.body
  const { id: userId } = req.user
  await User.updateOne(
    {
      "planner.meals": {
        $elemMatch: {
          mealTime: mealTime,
          meal: mealId,
          count: { $lte: 1 },
        },
      },
      _id: userId,
    },
    {
      $pull: {
        "planner.$[filter].meals": {
          mealTime: mealTime,
          meal: mealId,
          count: 1,
          _id: _id,
        },
      },
    },
    { arrayFilters: [{ "filter.day": new Date(date) }] }
  )

  await User.updateOne(
    {
      "planner.meals": {
        $elemMatch: {
          mealTime: mealTime,
          meal: mealId,
          count: { $gt: 1 },
        },
      },
      _id: userId,
    },
    {
      $inc: { "planner.$[filter].meals.$[x].count": -1 },
    },
    { arrayFilters: [{ "filter.day": new Date(date) }, { "x._id": _id }] }
  )

  const user = await User.findById(userId).populate("planner.meals.meal")
  res.status(200).json({
    success: true,
    message: "Recipes deleted successfully from planner.",
    data: user,
  })
}

const updatePersonalInformation = async (req, res, next) => {
  const { id } = req.user
  const updatedFields = {}
  for (const [key, value] of Object.entries(req.body)) {
    updatedFields["personalInformation." + key] = value
  }
  let image
  if (req.file) {
    image = await imageUpload(req.file, "foodie/profile-photos")
    if (image) updatedFields["personalInformation.profilePhoto"] = image.secure_url
    else
      return res.status(500).json({
        success: false,
        message: "Image Upload Failed.",
      })
  }

  await User.findByIdAndUpdate(id, {
    ...updatedFields,
  })

  const responseObject = {
    success: true,
    message: "Updated successfully.",
  }
  if (image) responseObject.profilePhoto = image.url
  res.status(200).json(responseObject)
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
