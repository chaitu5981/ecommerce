const express = require("express");
const formidable = require("express-formidable");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const { createProductController } = require("../controllers/productController");
const router = express.Router();
router.post(
  "/create-product",
  requireSignin,
  isAdmin,
  formidable(),
  createProductController
);

module.exports = router;
