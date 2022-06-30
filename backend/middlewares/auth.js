const AppError = require("../utils/AppError")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const { userSchema } = require("../validationSchemas")

const auth = async (req, res, next) => {
  let token
  const auth = req.headers.authorization
  try {
    if (auth && auth.startsWith("Bearer")) {
      token = auth.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { sort } = req.query
      const sortQuery = generateSortQuery(sort)
      req.user = await User.findById(decoded.id)
        .select("-password")
        .populate({
          path: "favorites",
          options: { sort: sortQuery },
        })
        .populate("planner.meals.meal")
      next()
    }
  } catch (e) {
    next(new AppError(401, "Not Authorized"))
  }

  if (!token) {
    next(new AppError(401, "Not Authorized"))
  }
}

validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body)
  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join()
    return res.status(400).json({
      success: false,
      message: errorMessage,
    })
  }
  next()
}

const generateSortQuery = (sort) => {
  let sortCategory, sortType
  if (sort) {
    const fields = sort.split("_")
    sortCategory = fields[0]
    sortType = fields[2] === "asc" ? "" : "-"
  }
  return sortType + sortCategory
}

module.exports = {
  auth,
  validateUser,
}
