const express = require("express");
const {
  registerUser,
  authUser
} = require("../controllers/authController");
const authValidation = require("../validations/authValidation");
const router = express.Router();
const validate = require("../middlewares/validate");


router.route("/").post(registerUser),
validate(authValidation.registerValidation);
router.post("/login", authUser),validate(authValidation.loginValidation);

module.exports = router;