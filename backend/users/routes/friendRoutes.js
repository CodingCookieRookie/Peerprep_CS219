const cors = require("cors");
const router = require("express").Router();

// Import friendController
const friendController = require("../controllers/friendController");

router
    .route("/")
    .get(friendController.index)
    .post(friendController.new)
    .delete(friendController.delete)

router
    .route("/user2/")
    .post(friendController.new_by_username)

module.exports = router;
