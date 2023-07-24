const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    lowecase: true,
  },
});

const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
