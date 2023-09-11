const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// Create Product ------> Admin

exports.createProduct = CatchAsyncErrors(async (req, res, next) => {

  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products

exports.getAllProducts = CatchAsyncErrors(async (req, res) => {
  
  let resultPerPage = 4;
  const productCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const product = await apiFeature.query;

  res.status(200).json({
    success: true,
    productCount : productCount,
    product,
  });
});

// Product Details

exports.getProductDetails = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found!!", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Update Product ------> Admin

exports.updateProduct = CatchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found!!", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Product Updated",
  });
});

// Delete Product ------> Admin

exports.deleteProduct = CatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found!!", 404));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product Deleted",
  });
});
