const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET /product - Get all products
router.get("/", productController.getAllProducts);

// GET /product/:id - Get a single product by ID
router.get("/:id", productController.getProductById);

// POST /product - Create a new product
router.post("/", productController.createProduct);

// PUT /product/:id - Update an existing product
router.put("/:id", productController.updateProduct);

// DELETE /product/:id - Delete a product
router.delete("/:id", productController.deleteProduct);

module.exports = router;
