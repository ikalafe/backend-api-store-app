const mongoose = require("mongoose");
const supCategorySchema = mongoose.Schema({
  categoryId: {
    type: String,
    require: true
  },
  categoryName: {
    type: String,
    require: true
  },
  image: {
    type: String,
    require: true
  },
  subCategoryName: {
    type: String,
    require: true
  }
});
const supCategory = mongoose.model("SubCategory", supCategorySchema);
module.exports = supCategory;