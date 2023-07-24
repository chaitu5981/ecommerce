const express = require("express");
const {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} = require("../controllers/authController");
const { requireSignin, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/test", requireSignin, isAdmin, testController);
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
router.post("/forgot-password", forgotPasswordController);
module.exports = router;
