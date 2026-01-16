const express = require('express');
const router = express.Router();
const {
  enrollCourse,
  getMyCourses,
  updateProgress,
  checkEnrollment
} = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/authMiddleware');

// Enrollment Routes
router.post('/:courseId', protect, enrollCourse);
router.get('/my-courses', protect, getMyCourses);
router.get('/check/:courseId', protect, checkEnrollment);
router.put('/:id/progress', protect, updateProgress);


module.exports = router;