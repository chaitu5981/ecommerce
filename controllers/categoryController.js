const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const createCategoryController = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.send({
        message: "Category name is required",
      });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.send({
        success: false,
        message: `Category ${name} is already existing`,
      });
    }
    const cateogry = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Category successfully created",
      cateogry,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error occured",
      error,
    });
  }
};

const updateCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    console.log(category);
    if (!category) {
      return res.send({
        success: false,
        message: "No category found with the given Id",
      });
    }
    res.status(201).send({
      success: true,
      message: "Category successfully updated",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Category",
      error,
    });
  }
};

const getCategoriesController = async (req, res) => {
  const categories = await categoryModel.find({});
  try {
    res.status(200).send({
      success: true,
      message: "Categories retreived succesfully",
      categories,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error getting categories",
    });
  }
};

const getCategoryController = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await categoryModel.find({ slug });
    if (category.length === 0) {
      return res.send({
        success: false,
        message: "Given category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category successfully retrieved",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error getting category",
      error,
    });
  }
};

const deleteCategoryController = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.send({
        success: false,
        message: "No category found with the given Id",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category successfully deleted",
      category,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in deleting category",
      error,
    });
  }
};
module.exports = {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  getCategoryController,
  deleteCategoryController,
};
