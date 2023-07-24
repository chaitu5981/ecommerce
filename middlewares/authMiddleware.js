const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const requireSignin = (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Invalid token",
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role === 0) {
      res.status(401).send({
        success: false,
        message: "UnAuthorised Access",
      });
    } else next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { requireSignin, isAdmin };
