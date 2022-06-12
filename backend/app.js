const path = require('path')
if(process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, '.env') })
}

const express = require("express")
const connectDb = require('./config/connectDb')
const PORT = 5000

connectDb()
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api/recipes', require('./routes/recipe'))
app.use('/api/users', require('./routes/user'))

app.use((err, req, res, next) => {
  const { status = 500 } = err
  if(!err.message) err.message = 'Something went wrong'
  res.status(status).json({
    success: false,
    message: err.message,
    stack: err.stack,
    status: status
  })
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
