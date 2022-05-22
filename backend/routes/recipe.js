const express = require("express")
const router = express.Router({ mergeParams: true })
const catchAsync = require("../utils/catchAsync")
const { getRecipe, getRecipes, createRecipe } = require("../controllers/recipe")
const auth = require("../middlewares/auth")

router.route("/")
  .get(catchAsync(getRecipes))
  .post(auth, catchAsync(createRecipe))

router.get("/", catchAsync(getRecipes))

router.get("/:id", catchAsync(getRecipe))

router.get("/category/:categoryName", catchAsync(getRecipes))

module.exports = router
