const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// Route for creating a new user by admin
// router.post('/', UserController.createUserByAdmin);

// Route for fetching a user by ID
router.get('/:userId', UserController.getUserById);

// Add more user-related routes as needed, such as updating user information, deleting users, etc.

module.exports = router;
