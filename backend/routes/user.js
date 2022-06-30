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
const { auth, validateUser } = require("../middlewares/auth")
const { parseMultipartForm } = require("../middlewares/recipe")

router
  .route("/")
  .post(validateUser, catchAsync(register))
  .patch(auth, parseMultipartForm, catchAsync(updatePersonalInformation))

router.post("/sign-in", catchAsync(login))

router
  .route("/favorites/:slug")
  .post(auth, catchAsync(addToFavorites))
  .delete(auth, catchAsync(removeFromFavorites))

router
  .route("/planner")
  .post(auth, catchAsync(addToPlanner))
  .delete(auth, catchAsync(removeFromPlanner))

router.post("/favorites/:slug", auth, catchAsync(addToFavorites))

router.get("/me", auth, getMe)

module.exports = router
