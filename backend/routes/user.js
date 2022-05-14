const express = require("express")
const router = express.Router({ mergeParams: true })
const catchAsync = require("../utils/catchAsync")
const {
  register,
  login,
  addToFavorites,
  removeFromFavorites,
  getMe,
  addToPlanner,
} = require("../controllers/user")
const auth = require("../middlewares/auth")

router.post("/", catchAsync(register))

router.post("/sign-in", catchAsync(login))

router
  .route("/favorites/:recipeId")
  .post(auth, catchAsync(addToFavorites))
  .delete(auth, catchAsync(removeFromFavorites))

router.post("/planner", auth, catchAsync(addToPlanner))

router.post("/favorites/:recipeId", auth, catchAsync(addToFavorites))

router.get("/me", auth, getMe)

module.exports = router
