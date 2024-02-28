// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, logout,getAllUsers,getUserById,uploadProfilePicture,deleteProfilePicture,updateUserById } = require('../Controllers/UserController');
router.post('/register', register);
router.post('/login', login);
router.post('/logout',logout);
router.get('/users',getAllUsers);
router.get('/users/:userId',getUserById);
router.post('/users/:userId',updateUserById);
module.exports = router;