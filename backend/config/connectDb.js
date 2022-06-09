const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("mongodb connected")
  } catch (e) {
    console.log(e)
  }
}

module.exports = connectDb
