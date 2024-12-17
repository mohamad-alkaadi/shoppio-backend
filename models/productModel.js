const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "A product must have a name"],
  },
  description: {
    type: String,
    default: "No description",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  seller: {
    type: String,
  },
  brand: {
    type: String,
  },
  price: {
    type: Number,
    require: [true, "A product must have a price"],
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function (val) {
        return val < this.price
      },
      message: "Discounted price should be less than the price",
    },
  },
  ratingsAverage: { type: Number, default: 4.5 },
  ratingsQuantity: { type: Number, default: 0 },
  keywords: {
    type: [String],
  },
  mainImageUrl: {
    type: String,
    require: [true, "A product must have a image"],
  },
  additionalImagesUrl: {
    type: [String],
  },
  timesViewed: {
    type: [String],
  },
  timesBought: {
    type: [String],
  },
})

productSchema.pre("save", function (next) {
  if (this.priceDiscount >= this.price) {
    next(new Error("Discounted price should be less than the price"))
  } else {
    next()
  }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
