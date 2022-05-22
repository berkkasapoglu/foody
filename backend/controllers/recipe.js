const Recipe = require("../models/recipe")

const getRecipes = async (req, res) => {
  const { categoryName } = req.params
  const { page = 0, search } = req.query
  const query = {
    title: {
      $regex: new RegExp(search, "i"),
    },
    category: { $regex: new RegExp(categoryName, "i") },
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
  const { id } = req.params
  const recipe = await Recipe.findById(id)
  res.status(200).json({
    success: true,
    data: recipe,
  })
}

const createRecipe = async(req, res) => {
  const recipe = new Recipe(req.body)
  const newRecipe  = await recipe.save()
  return res.status(201).json({
    success: true,
    data: newRecipe,
    message: "Recipe created successfully."
  })
}

module.exports = {
  getRecipe,
  getRecipes,
  createRecipe
}
