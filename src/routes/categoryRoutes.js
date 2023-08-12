const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const getCateByIdMiddleware = require("../middleware/cateMiddleware");

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category by id with middleware
router.get("/:id", categoryController.getCateById);

// Create categories
router.post("/", categoryController.createCategory);

// Update category with middleware
router.put("/:id", categoryController.updateCategory);

// Delete category with middleware
// router.delete("/:id", getCateByIdMiddleware, categoryController.deleteCategory);

module.exports = router;
