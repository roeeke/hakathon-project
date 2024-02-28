// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ username, email, password });
    res.status(201).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true });
    res.status(200).json({ message: 'Login successful',userid:user._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const logout = (req, res) => {
    try {
      // Clear the authentication token cookie
      res.clearCookie('token');
      res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  const getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  const getUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

const uploadProfilePicture = async (req, res) => {
  try {

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    
    user.profilePicture = req.file.path; // Save the path to the profile picture
    await user.save();
    
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// userController.js
const fs = require('fs');

const deleteProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    // Check if user has a profile picture
    if (user.profilePicture) {
      // Remove the profile picture file from the server
      fs.unlinkSync(user.profilePicture);
      // Update the user's profile picture field in the database to null
      user.profilePicture = null;
      await user.save();
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updates = req.body; // Assuming the updates are sent in the request body
    const user = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

  
  
  module.exports = { register, login, logout, getAllUsers, getUserById,uploadProfilePicture,deleteProfilePicture,updateUserById };
  
