// server/src/app.js
const express = require('express');
const cors = require('cors');
const app = express();

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/course', require('./routes/courseRoutes'));
app.use('/api/enrollment', require('./routes/enrollmentRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'OK',
    message: 'API is running live!',
    endpoints: {
      auth: '/api/auth',
      courses: '/api/course',
      enrollment: '/api/enrollment'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

module.exports = app;