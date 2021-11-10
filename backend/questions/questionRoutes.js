const cors = require("cors");
let router = require("express").Router();

// Import questionController
const questionController = require("./questionController");

router
    .route("/questions/")
    .get(questionController.index)
    .post(questionController.new);;

router
    .route("/questions/:title")
    .get(questionController.view)
    // .put(questionController.update)
    .delete(questionController.delete);

router
    .route("/random-question/")
    .get(questionController.random)

router
    .route("/questions/difficulty/:level")
    .get(questionController.level)

module.exports = router;