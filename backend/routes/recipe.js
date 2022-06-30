const express = require("express")
const router = express.Router({ mergeParams: true })
const catchAsync = require("../utils/catchAsync")
const { parseMultipartForm } = require("../middlewares/recipe")

const {
  getRecipe,
  getRecipes,
  createRecipe,
  deleteRecipe,
} = require("../controllers/recipe")
const { isRecipeOwner } = require("../middlewares/recipe")
const { validateRecipe } = require("../middlewares/recipe")
const { auth } = require("../middlewares/auth")

router
  .route("/")
  .get(catchAsync(getRecipes))
  .post(auth, parseMultipartForm, validateRecipe, catchAsync(createRecipe))

router.get("/", catchAsync(getRecipes))

router
  .route("/:slug")
  .get(catchAsync(getRecipe))
  .delete(auth, catchAsync(isRecipeOwner), catchAsync(deleteRecipe))

router.get("/category/:categoryName", catchAsync(getRecipes))

module.exports = router
