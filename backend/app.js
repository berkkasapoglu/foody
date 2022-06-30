import React from "react"
import ReactDOMServer from "react-dom/server"
import { StaticRouter } from "react-router-dom/server"
import App from "../frontend/src/App"
import path from "path"
import fs from "fs"
import { parse } from "node-html-parser"
import Helmet from "react-helmet"
import Recipe from "./models/recipe"
import metadataGenerator from "./helpers/metadataGenerator"
import dotenv from "dotenv"
dotenv.config({ path: path.join(__dirname, "..", ".env") })

import express from "express"
import connectDb from "./config/connectDb"
const PORT = process.env.PORT || 5000

connectDb()
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const filePath = path.join(__dirname, "..", "..", "frontend", "build")

import recipeRouter from "./routes/recipe"
import userRouter from "./routes/user"
app.use("/api/recipes", recipeRouter)
app.use("/api/users", userRouter)

const asyncMetadataMatcher = async (req, res, next) => {
  const { slug } = req.params
  if (slug) {
    const recipe = await Recipe.findOne({ slug })
    req.metadata = metadataGenerator(recipe)
  }
  next()
}

const ssr = (req, res, next) => {
  const content = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  )
  fs.readFile(path.join(filePath, "index.html"), (err, data) => {
    if (err) return console.log(err)
    const root = parse(data)
    const cssLink = root.querySelector('[href*=".css"]').toString()
    const jsScript = root.querySelector('[src*=".js"]').toString()
    const helmet = Helmet.renderStatic()
    const metadata =
      req.metadata ||
      `${helmet.title.toString()}
    ${helmet.link.toString()}
    ${helmet.meta.toString()}
    ${helmet.script.toString()}`
    const html = `
    <html lang="en">
    <head>
      <link data-react-helmet="true" rel="icon" href="/logo.png" />
      <link data-react-helmet="true" rel="apple-touch-icon" href="/logo.png" />
      ${metadata}
      ${cssLink}
      ${jsScript}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-99GWK6G3JQ"></script>
      <script>function gtag() { dataLayer.push(arguments) } window.dataLayer = window.dataLayer || [], gtag("js", new Date), gtag("config", "G-99GWK6G3JQ")</script>
      </head>
    <body>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <div id="root">${content}</div>
    </body>
  </html>
    `
    res.send(html)
  })
}

app.get("/", ssr)
app.use(express.static(filePath))
app.get("/recipes/new", ssr)
app.get("/recipes/:slug", asyncMetadataMatcher, ssr)
app.get("*", ssr)

app.use((err, req, res, next) => {
  const { status = 500 } = err
  if (!err.message) err.message = "Something went wrong"
  const errorResponse = {
    success: false,
    message: err.message,
    status: status,
  }
  if (process.env.NODE_ENV !== "production") errorResponse.stack = err.stack
  res.status(status).json(errorResponse)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
