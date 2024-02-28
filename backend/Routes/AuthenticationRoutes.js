const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');

// Route for user login
router.post('/login', UserController.authenticateUser);

// Route for user registration
router.post('/register', UserController.createUserByAdmin);

// Add more authentication routes as needed, such as logout, forgot password, etc.

module.exports = router;
