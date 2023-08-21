const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const cateIdMiddleware = require("../middleware/cateMiddleware");

// Set up multer for image upload
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/public/images');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Get all categories
router.get("/", categoryController.getAllCategories);

// Get category by id
router.get("/:id", categoryController.getCateById);

// Create categories with image upload middleware
router.post("/", upload.single("image"), categoryController.createCategory);

// Update category with image upload middleware
router.put("/:id", upload.single("image"), categoryController.updateCategory);

// Delete category
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
