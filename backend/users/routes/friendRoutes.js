const cors = require("cors");
const router = require("express").Router();
router.all("*", cors());

// Import friendController
const friendController = require("../controllers/friendController");

router
    .route("/")
    .get(friendController.index)
    .post(friendController.new)
    .delete(friendController.delete)

module.exports = router;
