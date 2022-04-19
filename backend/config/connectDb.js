const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/foody")
    console.log("mongodb connected")
  } catch (e) {
    console.log(e)
  }
}

module.exports = connectDb
