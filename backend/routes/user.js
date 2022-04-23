const express = require("express")
const router = express.Router({ mergeParams: true })
const User = require("../models/user")
const AppError = require("../utils/AppError")
const catchAsync = require("../utils/catchAsync")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

router.post(
  "/",
  catchAsync(async (req, res, next) => {
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
          token: generateToken(newUser._id),
        },
      })
    } else {
      return next(new AppError(400, "Invalid User Data"))
    }
  })
)

router.post(
  "/sign-in",
  catchAsync(async (req, res, next) => {
    const { username, password } = req.body
    console.log(req.body)
    const user = await User.findOne({ username })
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        success: true,
        data: {
          token: generateToken(user._id),
        },
      })
    } else {
      next(new AppError(401, "Username or password is wrong"))
    }
  })
)

router.get(
  "/current-user",
  catchAsync(async (req, res, next) => {
    let token
    const auth = req.headers.authorization
    if (auth && auth.startsWith("Bearer")) {
      token = auth.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const user = await User.findById(decoded.id)
      res.status(200).json({
        success: true,
        data: {
          name: user.username,
          email: user.email,
        },
      })
    }
  })
)

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" })
}

module.exports = router
