const express = require("express")
const router = express.Router({ mergeParams: true })
const catchAsync = require("../utils/catchAsync")
const {
  getRecipe,
  getRecipes,
  getFilteredRecipes,
} = require("../controllers/recipe")

router.get("/", catchAsync(getRecipes))

router.get("/:id", catchAsync(getRecipe))

router.get("/category/:categoryName", catchAsync(getFilteredRecipes))

module.exports = router
