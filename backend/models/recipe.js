const mongoose = require("mongoose")
const Schema = mongoose.Schema

const opts = { toJSON: { virtuals: true }}
const imageSchema = new Schema({
  filename: String,
  url: String,
}, opts)

imageSchema.virtual("lowQuality").get(function () {
  return this.url.replace("/upload", "/upload/q_30")
})

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    image: imageSchema,
    description: String,
    ingredients: {
      type: Array,
      required: true,
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
    instructions: String,
    category: {
      type: String,
      default: "Other",
    },
    yields: String,
    time: Number,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  }
)

recipeSchema.pre("save", function (next) {
  this.slug = slugify(this.title)
  next()
})

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

module.exports = mongoose.model("Recipe", recipeSchema)
