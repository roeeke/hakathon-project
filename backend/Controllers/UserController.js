const User = require('../Models/User');

// Controller for user authentication
const authenticateUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username and password
    const user = await User.findOne({ username, password });
    
    if (user) {
      res.status(200).json({ message: 'Authentication successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller for user creation by admin
const createUserByAdmin = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = new User({ username, password, role });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller for fetching user by ID
const getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add more user-related controllers as needed

module.exports = {
  authenticateUser,
  createUserByAdmin,
  getUserById,
  // Add more controllers here
};
