const express = require("express")
const app = express()
const productRoutes = require("./routes/productRoutes")
app.use(express.json())

app.use("/api/v1/products", productRoutes)

module.exports = app
