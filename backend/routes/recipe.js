const express = require("express")
const router = express.Router({ mergeParams: true })
const Recipe = require("../models/recipe")
const catchAsync = require("../utils/catchAsync")

router.get(
  "/",
  catchAsync(async (req, res) => {
    const recipe = await Recipe.find({}).limit(10)
    res.status(200).json({
      success: true,
      data: recipe,
    })
  })
)

router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params
    const recipe = await Recipe.findById(id)
    res.status(200).json({
      success: true,
      data: recipe,
    })
  })
)

router.get(
  "/category/:categoryName",
  catchAsync(async (req, res) => {
    const { categoryName } = req.params
    const recipes = await Recipe.find({
      category: { $regex: new RegExp(categoryName, "i") },
    }).limit(10)
    res.status(200).json({
      success: true,
      data: recipes,
    })
  })
)

module.exports = router
