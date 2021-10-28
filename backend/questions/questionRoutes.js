const cors = require("cors");
const router = require("express").Router();

// Import questionController
const questionController = require("./questionController.js");

router
    .route("/questions/")
    .get(questionController.index)
    .post(questionController.new);;

router
    .route("/questions/:title")
    .get(questionController.view)
    // .put(questionController.update)
    .delete(questionController.delete);

module.exports = router;
