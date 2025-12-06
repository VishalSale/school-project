const bcrypt = require('bcryptjs');
const db = require('../config/database');
const { generateToken } = require('../utils/jwt');

// Login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate token
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get current user
const getMe = async (req, res, next) => {
  try {
    const user = await db('users')
      .where({ id: req.user.id })
      .select('id', 'email', 'role')
      .first();

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Logout (client-side token removal, but can log here)
const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful',
  });
};

module.exports = {
  login,
  getMe,
  logout,
};
