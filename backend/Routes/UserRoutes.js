const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

router.get('/all-stars', UserController.getAllUsersWithStars); // This should come first
router.get('/:userId', UserController.getUserById); // Specific routes come after more general routes
router.get('/details/:userId', UserController.getUserDetails);
module.exports = router;
