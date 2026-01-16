// server/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe
} = require('../controllers/authController');

const bypassProtect = (req, res, next) => {
  req.user = { id: '65f8a1b2c8e7f4001a2345b0' };
  next();
};

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', bypassProtect, getMe);



module.exports = router;