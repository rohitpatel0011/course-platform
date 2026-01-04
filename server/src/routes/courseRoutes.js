const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../controllers/courseController');

// Import Middleware
const { protect, admin } = require('../middlewares/authMiddleware');

// Route: /api/courses
router
  .route('/')
  .get(getAllCourses) // Public: Koi bhi course dekh sakta hai
  .post(protect, admin, createCourse); // Private: Sirf Admin naya course bana sakta hai

// Route: /api/courses/:id
router
  .route('/:id')
  .get(getSingleCourse) // Public: Detail dekhna
  .put(protect, admin, updateCourse) // Private: Edit karna
  .delete(protect, admin, deleteCourse); // Private: Delete karna

module.exports = router;