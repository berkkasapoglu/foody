const Recipe = require("../models/recipe")

const getRecipes = async (req, res) => {
  const { page = 0 } = req.query
  const recipes = await Recipe.find({})
    .skip(parseInt(page) * 10)
    .limit(10)
  const size = await Recipe.count()
  const skip = 10
  res.status(200).json({
    success: true,
    data: recipes,
    next: (parseInt(page) + 1) * skip < size,
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
  const { page = 0 } = req.query
  const skip = 10
  const query = { category: { $regex: new RegExp(categoryName, "i") } }
  const size = await Recipe.count(query)
  const recipes = await Recipe.find(query)
    .skip(parseInt(page) * 10)
    .limit(10)
  res.status(200).json({
    success: true,
    data: recipes,
    next: (parseInt(page) + 1) * skip < size,
  })
}

module.exports = {
  getRecipe,
  getRecipes,
  getFilteredRecipes,
}
