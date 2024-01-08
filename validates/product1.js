const Validator = require("validator");

module.exports = {
  validate(product) {
    const errors = [];

    if (!Validator.isString(product.name, { minLength: 10, maxLength: 80 })) {
      errors.push("Tên sản phẩm phải là chuỗi có độ dài từ 10 đến 80 ký tự");
    }

    if (!Validator.isNumeric(product.price)) {
      errors.push("Giá sản phẩm phải là số");
    }

    if (product.price < 0) {
      errors.push("Giá sản phẩm phải là số dương");
    }
    if (!Validator.isInteger(product.order)) {
      errors.push("Thứ tự sản phẩm phải là số nguyên");
    }
    return errors;
  },
};
