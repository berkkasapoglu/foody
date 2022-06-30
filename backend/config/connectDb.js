const mongoose = require("mongoose")

const connectDb = async () => {
  try {
    await mongoose.connect(
      process.env.NODE_ENV === "production"
        ? process.env.DB_URL
        : "mongodb://localhost:27017/foody"
    )
    console.log("mongodb connected")
  } catch (e) {
    console.log(e)
  }
}

module.exports = connectDb
