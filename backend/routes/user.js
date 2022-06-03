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
  removeFromPlanner,
  updatePersonalInformation,
} = require("../controllers/user")
const auth = require("../middlewares/auth")

router
  .route("/")
  .post(catchAsync(register))
  .patch(auth, catchAsync(updatePersonalInformation))

router.post("/sign-in", catchAsync(login))

router
  .route("/favorites/:recipeId")
  .post(auth, catchAsync(addToFavorites))
  .delete(auth, catchAsync(removeFromFavorites))

router
  .route("/planner")
  .post(auth, catchAsync(addToPlanner))
  .delete(auth, catchAsync(removeFromPlanner))

router.post("/favorites/:recipeId", auth, catchAsync(addToFavorites))

router.get("/me", auth, getMe)

module.exports = router
