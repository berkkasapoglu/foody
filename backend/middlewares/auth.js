const AppError = require("../utils/AppError")
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const mongoose = require("mongoose")
const { userSchema } = require("../validationSchemas")

const auth = async (req, res, next) => {
  let token
  const auth = req.headers.authorization
  try {
    if (auth && auth.startsWith("Bearer")) {
      token = auth.split(" ")[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const { sort } = req.query
      if (sort) {
        const aggregation = await User.aggregate(generateSortQuery(sort, decoded.id))
        userData = (await User.populate(aggregation, {path: "planner.meals.meal"}))[0]
        userData.favorites.map(favorite => {
          favorite.image.lowQuality = favorite.image.url.replace("/upload", "/upload/q_30")
        })
        req.user = userData
      } else {
        req.user = await User.findById(decoded.id)
          .select("-password")
          .populate("favorites")
          .populate("planner.meals.meal")
      }
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

const generateSortQuery = (sort, userId) => {
  let sortCategory, sortType
  const fields = sort.split("_")
  sortCategory = fields[0].charAt(0).toUpperCase() + fields[0].slice(1)
  sortType = fields[2] === "asc" ? 1 : -1
  return [
    {
      '$match': {
        '_id': mongoose.Types.ObjectId(userId)
      }
    }, {
      '$lookup': {
        'from': 'recipes',
        'localField': 'favorites',
        'foreignField': '_id',
        'as': 'favorites'
      }
    }, {
      '$unwind': {
        'path': '$favorites'
      }
    }, {
      '$unwind': {
        'path': '$favorites.nutritions'
      }
    }, {
      '$match': {
        'favorites.nutritions.label': sortCategory
      }
    }, {
      '$sort': {
        'favorites.nutritions.total': sortType
      }
    }, {
      '$lookup': {
        'from': 'recipes',
        'localField': 'favorites._id',
        'foreignField': '_id',
        'as': 'favorites'
      }
    }, {
      '$group': {
        '_id': '$_id',
        'favorites': {
          '$push': {
            '$first': '$favorites'
          }
        },
        'first': {
          '$first': '$$ROOT'
        }
      }
    }, {
      '$replaceRoot': {
        'newRoot': {
          '$mergeObjects': [
            '$first', {
              'favorites': '$favorites'
            }
          ]
        }
      }
    },
    {
      '$project': {
        'password': 0
      }
    }
  ]


}

module.exports = {
  auth,
  validateUser,
}
