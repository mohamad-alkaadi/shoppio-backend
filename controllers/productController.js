const Product = require("./../models/productModel")

exports.getAllProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query }
    const excludedFields = ["page", "sort", "limit", "fields"]

    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    let query = Product.find(JSON.parse(queryStr))

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ")
      query = query.sort(sortBy)
    } else {
      query = query.sort("-createdAt")
    }

    const products = await query

    res.status(200).json({
      status: "success",
      results: products.length,
      data: {
        products,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).json({
      status: "success",
      data: newProduct,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    res.status(200).json({
      status: "success",
      data: {
        product: updatedProduct,
      },
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findOneAndDelete(req.params.id)
    res.status(204).json({
      status: "success",
      data: null,
    })
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    })
  }
}
