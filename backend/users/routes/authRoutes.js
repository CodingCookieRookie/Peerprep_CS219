const cors = require("cors");
const router = require("express").Router();

// Import authcontroller
const authController = require("../controllers/authController");

router
    .route("/auth/register")
    .post(authController.new);

router
    .route("/auth/login")
    .post(authController.login);

module.exports = router;