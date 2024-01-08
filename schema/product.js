const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 10,
    maxlength: 80,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 0) {
        throw new Error("Price must be a non-negative number");
      }
    },
  },
  order: {
    type: Number,
    required: true,
    validate(value) {
      if (!validator.isInt(value)) {
        throw new Error("Order must be an integer");
      }
    },
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
  // Add other fields as needed (e.g., description, image, etc.)
});

module.exports = mongoose.model("Product", productSchema);
