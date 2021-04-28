import asyncHandler from 'express-async-handler';
import Product from '../models/Product.js';

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
  } = req.body;

  const fields = {
    user: req.user._id,
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
  };

  const newProduct = await Product.create(fields);

  if (newProduct) {
    res.status(201).json({ message: 'Product Created' });
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
  } = req.body;

  const fields = {
    user: req.user._id,
    name,
    image,
    brand,
    category,
    description,
    rating,
    numReviews,
    price,
    countInStock,
  };

  const newProduct = await Product.findByIdAndUpdate(req.params.id, fields, {
    runValidators: true,
    new: true,
  });

  if (newProduct) {
    res.status(200).json({ message: 'Product Updated' });
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (product) {
    res.status(200).json({ message: 'Product Deleted' });
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
