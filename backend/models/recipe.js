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
    set: (v) => Math.round(v),
  },
  time: {
    type: Number,
  },
  nutritions: [
    {
      label: String,
      total: {
        type: Number,
        set: (v) => Math.round(v),
      },
      unit: String,
    },
  ],
  category: String,
  difficulty: {
    type: String,
    required: true,
    enum: ["Hard", "Intermediate", "Easy"],
  },
})

module.exports = mongoose.model("Recipe", recipeSchema)
