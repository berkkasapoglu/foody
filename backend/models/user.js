const mongoose = require("mongoose")
const Schema = mongoose.Schema
const catchAsync = require("../utils/catchAsync")
const bcrypt = require("bcryptjs")

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
  },
})

userSchema.pre("save", function (next) {
  bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(this.password, salt)
    })
    .then((hashedPassword) => {
      this.password = hashedPassword
      next()
    }).catch((next))
})

module.exports = mongoose.model("User", userSchema)
