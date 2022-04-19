const express = require("express")
require("dotenv").config()
const app = express()
const connectDb = require('./config/connectDb')
const PORT = 5000

connectDb()

app.use('/api/recipes', require('./routes/recipe'))

app.get("/", (req, res) => {
  res.send("asdasddas")
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
