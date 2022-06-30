const Recipe = require("../models/recipe")
const { cloudinary } = require("../config/cloudinary")
const { imageUpload } = require("../helpers")

const getRecipes = async (req, res) => {
  const { categoryName } = req.params
  const { page = 0, search } = req.query
  const query = {
    $or: [
      { category: { $regex: new RegExp(search ? search : categoryName, "i") } },
      { title: { $regex: new RegExp(search ? search : categoryName, "i") } }
    ],
  }
  const recipes = await Recipe.find(query)
    .skip(parseInt(page) * 10)
    .limit(10)
  const size = await Recipe.count(query)
  const skip = 10
  res.status(200).json({
    success: true,
    data: recipes,
    next: (parseInt(page) + 1) * skip < size,
  })
}

const getRecipe = async (req, res) => {
  const { slug } = req.params
  const recipe = await Recipe.findOne({ slug }).populate("owner")
  res.status(200).json({
    success: true,
    data: recipe,
  })
}

const createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body)
  const user = req.user
  recipe.owner = user._id
  if (req.file) {
    const image = await imageUpload(req.file, "foodie/recipes")
    if (image)
      recipe.image = {
        path: image.public_id,
        url: image.url,
      }
    else
      return res.status(500).json({
        success: false,
        message: "Image Upload Failed.",
      })
  }

  const newRecipe = await recipe.save()
  return res.status(201).json({
    success: true,
    data: newRecipe,
    message: "Recipe created successfully.",
  })
}

const deleteRecipe = async (req, res) => {
  const { slug } = req.params
  const recipe = await Recipe.findOneAndDelete({slug})
  if (recipe.image.path) {
    await cloudinary.uploader.destroy(
      recipe.image.path,
      function (result, err) {}
    )
  }

  res.status(200).json({
    success: true,
    message: "Recipe deleted successfully.",
  })
}

module.exports = {
  getRecipe,
  getRecipes,
  createRecipe,
  deleteRecipe,
}
