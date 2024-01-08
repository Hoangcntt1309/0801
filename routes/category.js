const express = require("express");
const router = express.Router();
const responseData = require("../helper/responseData");
const modelCategory = require("../models/Category");
const modelProduct = require("../models/Product");
const validate = require("../validates/category"); // Assuming you have validation for categories

// Route to get all categories and their products
router.get("/", async (req, res) => {
  try {
    const categories = await modelCategory.find({ isDelete: false }).sort({ order: 1 });
    const productsByCategory = [];

    for (const category of categories) {
      const products = await modelProduct.find({
        categories: category._id,
        isDelete: false,
      }).sort({ order: 1 });
      productsByCategory.push({ category, products });
    }

    responseData.responseReturn(res, 200, true, productsByCategory);
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to retrieve categories");
  }
});

// Route to create a new category
router.post("/", validate.validator(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
      return;
    }

    const existingCategory = await modelCategory.findOne({ name: req.body.name, isDelete: false });
    if (existingCategory) {
      responseData.responseReturn(res, 400, false, "Category already exists");
      return;
    }

    const newCategory = await modelCategory.create(req.body);
    responseData.responseReturn(res, 201, true, newCategory);
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to create category");
  }
});

// Route to update a category
router.put("/:id", validate.validator(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
      return;
    }

    const category = await modelCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!category) {
      responseData.responseReturn(res, 404, false, "Category not found");
    } else {
      responseData.responseReturn(res, 200, true, category);
    }
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to update category");
  }
});

// Route to delete a category
router.delete("/:id", async (req, res) => {
  try {
    const category = await modelCategory.findByIdAndUpdate(req.params.id, {
      isDelete: true,
    });

    if (!category) {
      responseData.responseReturn(res, 404, false, "Category not found");
    } else {
      responseData.responseReturn(res, 200, true, "Category deleted successfully");
    }
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to delete category");
  }
});

module.exports = router;
