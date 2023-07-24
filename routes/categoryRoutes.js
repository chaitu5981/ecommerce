const express = require("express");
const {
  createCategoryController,
  updateCategoryController,
  getCategoriesController,
  getCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/create-category",
  requireSignin,
  isAdmin,
  createCategoryController
);

router.put(
  "/update-category/:id",
  requireSignin,
  isAdmin,
  updateCategoryController
);

router.get("/get-categories", getCategoriesController);
router.get("/get-category/:slug", getCategoryController);
router.delete(
  "/delete-category/:id",
  requireSignin,
  isAdmin,
  deleteCategoryController
);
module.exports = router;
