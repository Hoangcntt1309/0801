const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 10,
    maxlength: 80,
    required: true,
    trim: true,
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
});

module.exports = mongoose.model("Category", categorySchema);
