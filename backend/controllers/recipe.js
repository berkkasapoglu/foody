const Recipe = require("../models/recipe")

const getRecipes = async (req, res) => {
  const recipe = await Recipe.find({}).limit(10)
  res.status(200).json({
    success: true,
    data: recipe,
  })
}

const getRecipe = async (req, res) => {
  const { id } = req.params
  const recipe = await Recipe.findById(id)
  res.status(200).json({
    success: true,
    data: recipe,
  })
}

const getFilteredRecipes = async (req, res) => {
  const { categoryName } = req.params
  const recipes = await Recipe.find({
    category: { $regex: new RegExp(categoryName, "i") },
  }).limit(10)
  res.status(200).json({
    success: true,
    data: recipes,
  })
}

module.exports = {
  getRecipe,
  getRecipes,
  getFilteredRecipes
}

