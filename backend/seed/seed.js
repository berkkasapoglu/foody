const path = require("path")
require("dotenv").config(path.resolve(__dirname, "../../.env"))
const connectDb = require("../config/connectDb")
const axios = require("axios").default
const Recipe = require("../models/recipe")
const { initializeApp } = require("firebase/app")
const {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} = require("firebase/storage")

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app, process.env.BUCKET_URL)

const uploadImage = async (url) => {
  const res = await axios.get(url, { responseType: "arraybuffer" })
  const fileName = new Date().getTime()
  const storageRef = ref(storage, `images/${fileName}`)
  const uploadedImageURL = await new Promise((resolve, reject) => {
    uploadBytes(storageRef, res.data, { contentType: "image/jpeg" }).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then((uploadedURL) => resolve(uploadedURL))
      },
      (err) => {
        reject(err)
      }
    )
  })
  return uploadedImageURL
}

connectDb()

const seedDb = async (category) => {
  try {
    await Recipe.deleteMany({})
    const response = await axios.get(process.env.RECIPE_API_BASE_URL, {
      params: {
        type: "public",
        q: category,
        app_id: process.env.RECIPE_API_ID,
        app_key: process.env.RECIPE_API_SECRET,
      },
    })
    const recipeData = response.data.hits
    // const nextPageLink = response.data._links.next.href
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
        const imageUrl = await uploadImage(image)
        const recipe = new Recipe({
          title: label,
          image: imageUrl,
          source: source,
          labels: {
            dietLabels: dietLabels,
            healthLabels: healthLabels,
          },
          ingredients: ingredientLines,
          calories: parseInt(calories / yield),
          time: totalTime,
          nutritions: nutritions,
          category: category,
          difficulty: decideDifficulty(ingredientLines.length),
        })
        await recipe.save()
        console.log("Recipe data added to db.")
      })
    }
  } catch (e) {
    console.log(e)
  }
}

const decideDifficulty = (ingredientCount) => {
  if (ingredientCount > 6) {
    return "Hard"
  } else if (ingredientCount > 3) {
    return "Intermediate"
  } else {
    return "Easy"
  }
}

const categories = ["Salad", "Soup", "Herbs", "Fish", "Burger", "Noodle"]

for (category of categories) {
  seedDb(category)
}
