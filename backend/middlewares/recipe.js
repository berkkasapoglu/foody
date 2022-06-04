const Recipe = require("../models/recipe")

const isRecipeOwner = async (req, res, next) => {
  const { id } = req.params
  const recipe = await Recipe.findById(id)
  const userId = req.user._id
  if (!userId.equals(recipe.owner._id)) {
    return res.status(401).json({
      success: false,
      message: "You don't have permission to do delete this recipe.",
    })
  }
  next()
}

module.exports = {
  isRecipeOwner,
}
