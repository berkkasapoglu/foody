require("dotenv").config()
const connectDb = require("../config/connectDb")
const axios = require("axios").default
const Recipe = require("../models/recipe")

const seedDb = async () => {
  await connectDb()
  try {
    await Recipe.deleteMany({})
    const response = await axios.get(process.env.RECIPE_API_BASE_URL, {
      params: {
        type: "public",
        q: "dessert",
        app_id: process.env.RECIPE_API_ID,
        app_key: process.env.RECIPE_API_SECRET,
      },
    })
    const recipeData = response.data.hits
    const nextPageLink = response.data._links.next.href
    const page = 1
    for (let i = 0; i < page; i++) {
      recipeData.forEach(async (recipeItems) => {
        const {
          label,
          image,
          source,
          yield,
          dietLabels,
          healthLabels,
          ingredientLines,
          calories,
          digest,
          totalTime,
        } = recipeItems.recipe
  
        const nutritions = []
        for (let i = 0; i < 3; i++) {
          nutritions.push(digest[i])
        }
  
        const recipe = new Recipe({
          title: label,
          image: image,
          source: source,
          labels: {
            dietLabels: dietLabels,
            healthLabels: healthLabels,
          },
          ingredients: ingredientLines,
          calories: calories / yield,
          time: totalTime,
          nutritions: nutritions,
        })
        await recipe.save()
        console.log("Recipe data added to db.")
      })}
  } catch (e) {
    console.log(e)
  }
}

seedDb()
