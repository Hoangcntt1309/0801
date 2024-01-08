const express = require("express");
const router = express.Router();
const responseData = require("../helper/responseData");
const modelProduct = require("../models/Product");
const validate = require("../validates/product");

// Route to get all products
router.get("/", async (req, res) => {
  try {
    const products = await modelProduct.find({ isDelete: false }).sort({ order: 1 });
    responseData.responseReturn(res, 200, true, products);
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to retrieve products");
  }
});

// Route to create a new product
router.post("/", validate.validator(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
      return;
    }

    const existingProduct = await modelProduct.findOne({ name: req.body.name, isDelete: false });
    if (existingProduct) {
      responseData.responseReturn(res, 400, false, "Product already exists");
      return;
    }

    const newProduct = await modelProduct.create(req.body);
    responseData.responseReturn(res, 201, true, newProduct);
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to create product");
  }
});

// Route to update a product
router.put("/:id", validate.validator(), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      responseData.responseReturn(res, 400, false, errors.array().map(error => error.msg));
      return;
    }

    const product = await modelProduct.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!product) {
      responseData.responseReturn(res, 404, false, "Product not found");
    } else {
      responseData.responseReturn(res, 200, true, product);
    }
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to update product");
  }
});

// Route to delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await modelProduct.findByIdAndUpdate(req.params.id, {
      isDelete: true,
    });

    if (!product) {
      responseData.responseReturn(res, 404, false, "Product not found");
    } else {
      responseData.responseReturn(res, 200, true, "Product deleted successfully");
    }
  } catch (error) {
    responseData.responseReturn(res, 500, false, "Failed to delete product");
  }
});

module.exports = router;
