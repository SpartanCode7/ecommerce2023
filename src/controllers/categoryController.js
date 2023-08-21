const Categories = require("../models/Category");
const { BAD_REQUEST, OK, INTERNAL_SERVER_ERROR } = require("../constant/httpCode");

// Get all categories
const getAllCategories = async (req, res) => {
  try {
    const category = await Categories.find();
    res.json(category);
  } catch (error) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving Categories" })
  }
};

// Get single category
const getCateById = async (req, res) => {
  try {
    const category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(INTERNAL_SERVER_ERROR).json({ message: "Product not found" });
    }
    res.json(category);
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error retrieving product" });
  }
};

// Create new category
const createCategory = async (req, res) => {
  const requiredFields = ["name", "slug", "description"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    const fieldErrorMessages = {
      name: "Product name is required",
      slug: "SKU is required",
      description: "Product description is required",
    };

    const missingFieldMessages = missingFields.map(
      (field) => fieldErrorMessages[field]
    );

    return res.status(BAD_REQUEST).json({
      message: `Please fill in the following required fields: ${missingFieldMessages.join(", ")}`,
    });
  }

  try {
    const category = new Categories(req.body);

    // Handle image upload
    if (req.file) {
      category.image = req.file.path; // Save the image URL
    }

    await category.save();
    res.status(OK).json(category);
  } catch (err) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error creating category" });
  }
};

// Update Category
const updateCategory = async (req, res) => {
  const requiredFields = ["name", "slug", "description"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    const fieldErrorMessages = {
      name: "Product name is required",
      slug: "SKU is required",
      description: "Product description is required",
    };

    const missingFieldMessages = missingFields.map(
      (field) => fieldErrorMessages[field]
    );
    return res.status(BAD_REQUEST).json({
      message: `Please fill in the following required fields: ${missingFieldMessages.join(", ")}`,
    });
  }

  try {
    const category = await Categories.findById(req.params.id);
    if (!category) {
      return res.status(BAD_REQUEST).json({ message: "Category not found" });
    }

    // Handle image upload
    if (req.file) {
      category.image = req.file.path; // Update the image URL
    }

    category.name = req.body.name;
    category.slug = req.body.slug;
    category.description = req.body.description;

    await category.save();
    res.status(OK).json(category);
  } catch (err) {
    res
      .status(INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating category" });
  }
};

// Delete category
const deleteCategory = async (req, res) => {
  try {
    const category = await Categories.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(BAD_REQUEST).json({ message: "Product not found" });
    }
    res.json({ message: "category deleted successfully" });
  } catch (error) {
    res.status(INTERNAL_SERVER_ERROR).json({ message: "Error deleting category" });
  }
};

module.exports = {
  getAllCategories,
  getCateById,
  createCategory,
  updateCategory,
  deleteCategory
};
