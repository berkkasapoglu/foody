const Recipe = require("../models/recipe")
const { recipeSchema } = require("../validationSchemas")
const formidable = require("formidable")
const AppError = require("../utils/AppError")
const fs = require("fs")

const isRecipeOwner = async (req, res, next) => {
  const { slug } = req.params
  const recipe = await Recipe.findOne({slug})
  const userId = req.user._id
  if (!userId.equals(recipe.owner._id)) {
    return res.status(401).json({
      success: false,
      message: "You don't have permission to do delete this recipe.",
    })
  }
  next()
}

const validateRecipe = (req, res, next) => {
  for (const key in req.body) {
    req.body[key] = JSON.parse(req.body[key])
  }
  const { error } = recipeSchema.validate(req.body)
  if (error) {
    if (req.file) {
      fs.unlink(req.file.filepath, (err) => {
        if (err) console.log(err)
      })
    }
    const errorMessage = error.details.map((detail) => detail.message).join()
    return res.status(400).json({
      success: false,
      message: errorMessage,
    })
  }
  next()
}

const parseMultipartForm = (req, res, next) => {
  const form = formidable({ maxFileSize: 10 * 1024 * 1024 })
  form.parse(req, (err, fields, file) => {
    if (err) {
      return next(new AppError(400, "Maximum image size exceeded."))
    }
    req.body = { ...fields }
    req.file = file.image
    next()
  })
}

module.exports = {
  isRecipeOwner,
  validateRecipe,
  parseMultipartForm,
}
