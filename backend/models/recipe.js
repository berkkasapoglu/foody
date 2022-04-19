const mongoose = require("mongoose")
const Schema = mongoose.Schema
const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  source: {
    type: String,
  },
  labels: {
    dietLabels: Array,
    healthLabels: Array,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
  nutritions: [
    {
      label: String,
      total: Number,
      unit: String,
    },
  ],
})

module.exports = mongoose.model("Recipe", recipeSchema)
