const express = require("express")
const router = express.Router({ mergeParams: true })
const catchAsync = require("../utils/catchAsync")
const {
  register,
  login,
  addFavorite,
  removeFavorite,
  getMe,
} = require("../controllers/user")
const auth = require("../middlewares/auth")

router.post("/", catchAsync(register))

router.post("/sign-in", catchAsync(login))

router
  .route("/favorites/:recipeId")
  .post(auth, catchAsync(addFavorite))
  .delete(auth, catchAsync(removeFavorite))

router.post("/favorites/:recipeId", auth, catchAsync(addFavorite))

router.get("/me", auth, getMe)

module.exports = router
