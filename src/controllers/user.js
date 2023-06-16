const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    create user
// @route   POST /users/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(422);
    throw new Error('Please add all fields');
  }

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(422).send('Email Sudah Ada!');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    // Create user
    let user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await user;
    res.status(200).json({
      message: 'Register Success',
      user: {
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @desc    Authenticate a user
// @route   POST /users/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      message: 'Login Success',
      user: {
        token: generateToken(user._id),
        isAdmin: user.isAdmin,
      },
    });
  } else {
    res.status(400).send('Invalid credentials');
  }
});

// @desc    delete user
// @route   DELETE /users/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;

  try {
    let user = await User.findByIdAndRemove(id);

    await user;
    res.status(200).json({
      message: 'User has been delete',
      user: user,
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = { register, login, deleteUser };
