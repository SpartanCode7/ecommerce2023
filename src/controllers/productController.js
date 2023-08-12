const Product = require("../models/Product");
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require("../constant/httpCode");

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error retrieving products" });
  }
};

// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(INTERNAL_SERVER_ERROR).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error retrieving product" });
  }
};

// Create a new product
const createProduct = async (req, res) => {
  // Check if all required fields are present in the request body
  const requiredFields = ["name", "sku", "description", "price", "image", "stock"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    const fieldErrorMessages = {
      name: "Product name is required",
      sku: "SKU is required",
      description: "Product description is required",
      price: "Product price is required",
      image: "Product image URL is required",
      stock: "Product stock quantity is required",
    };

    const missingFieldMessages = missingFields.map((field) => fieldErrorMessages[field]);
    return res.status(BAD_REQUEST).json({ message: `Please fill in the following required fields: ${missingFieldMessages.join(", ")}` });
  }

  try {
    const product = new Product(req.body);
    await product.save();
    res.status(OK).json(product);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error creating product" });
  }
};

// Update an existing product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error updating product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error deleting product" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
