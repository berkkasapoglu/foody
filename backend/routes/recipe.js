const express = require('express')
const router = express.Router()
const Recipe = require("../models/recipe")
const catchAsync = require('../utils/catchAsync')

router.get('/', catchAsync(async (req, res) => {
  const recipe = await Recipe.find({}).limit(10)
  res.status(200).json({
    success: true,
    data: recipe
  })
}))

module.exports = router