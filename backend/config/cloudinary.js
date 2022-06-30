var cloudinary = require('cloudinary').v2
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "..", ".env") })

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
})

module.exports = {
  cloudinary
}