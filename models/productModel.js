const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A product must have a name"],
  },
  seller: {
    type: String,
  },
  rating: { type: Number, default: 0 },
  price: {
    type: Number,
    require: [true, "A product must have a price"],
  },
  description: {
    type: String,
    default: "No description",
  },
  keywords: {
    type: [String],
  },
  mainImageUrl: {
    type: String, // Field to store the image URL
    required: [true, "A product must have an image"],
  },
  additionalImagesUrl: {
    type: [String],
  },
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
