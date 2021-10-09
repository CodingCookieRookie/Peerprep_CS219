const cors = require("cors");
const router = require("express").Router();
router.all("*", cors());

// Import usersController
const userController = require("./controllers/userController");

router
    .route("/user/user/")
    .get(userController.index)
    .post(userController.new);

router
    .route("/user/:username")
    .get(userController.view)
    .put(userController.update)
    .delete(userController.delete);

module.exports = router;
