// server/src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Simplified for development
const protect = asyncHandler(async (req, res, next) => {
  // For development, always pass
  req.user = {
    id: '65f8a1b2c8e7f4001a2345b0',
    role: 'instructor'
  };
  next();
});

const instructorOnly = asyncHandler(async (req, res, next) => {
  // For development, always pass
  next();
});

const adminOnly = asyncHandler(async (req, res, next) => {
  // For development, always pass
  next();
});

module.exports = {
  protect,
  instructorOnly,
  adminOnly
};