const cors = require("cors");
const router = require("express").Router();
router.all("*", cors());

// Import userController
const userController = require("../controllers/userController");

router
    .route("/user/user/")
    .get(userController.index)
    .post(userController.new);

router
    .route("/user/:username")
    .get(userController.view)
    .put(userController.update)
    .delete(userController.delete);

router
    .route("/user/login/:username")
    .post(userController.login);

module.exports = router;
