const { cloudinary } = require("../config/cloudinary")
const fs = require("fs")

module.exports.imageUpload = async (file, folder) => {
  let image
  try {
    image = await cloudinary.uploader.upload(file.filepath, {
      folder
    })
  } catch (err) {
    console.log(err)
  }
  fs.unlink(file.filepath, (err) => err && console.log(err))
  return image
}

