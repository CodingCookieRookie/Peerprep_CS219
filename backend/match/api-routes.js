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
    .get(matchController.matches)
    .post(matchController.new)
    .delete(matchController.delete);   

//Operations to get/update user's status with corresponding username  
router.route('/matches/match')
    .get(matchController.getCurrentUserMatch)
    .put(matchController.updateCurrentUserMatch);

// Export API routes
module.exports = router;