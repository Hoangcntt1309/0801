const Validator = require("validator");

module.exports = {
  validate(category) {
    const errors = [];

    if (!Validator.isString(category.name, { minLength: 10, maxLength: 80 })) {
      errors.push("Tên danh mục phải là chuỗi có độ dài từ 10 đến 80 ký tự");
    }

    return errors;
  },
};
