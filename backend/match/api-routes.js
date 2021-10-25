// api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'success',
        message: 'Success getting matches',
    });
});
// Import contact controller
var matchController = require('./matchController');

router.route('/matches')
    .get(matchController.match)
    .post(matchController.new)
    .put(matchController.update)
    .delete(matchController.delete);   
// Export API routes
module.exports = router;