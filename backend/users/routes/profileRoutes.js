const cors = require("cors");
const router = require("express").Router();

// Import profileController
const profileController = require("../controllers/profileController");

router
    .route("/user/profile/:username")
    .get(profileController.view)
    .delete(profileController.delete);

router
    .route("/user/profile")
    .post(profileController.new);

router
    .route("/user/profile/interview/:username")
    .post(profileController.newInterview)
    .delete(profileController.deleteInterview);

module.exports = router;
