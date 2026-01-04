const express = require('express');
const router = express.Router();
const { enrollCourse, getMyCourses, checkEnrollment } = require('../controllers/enrollmentController');
const { protect } = require('../middlewares/authMiddleware');

// Enrollment Routes (All Protected)
router.use(protect); // Ye line neeche ke sabhi routes pe protect laga degi automatically

router.post('/:courseId', enrollCourse);       // Enroll karne ke liye
router.get('/my-courses', getMyCourses);       // Dashboard ke liye
router.get('/check/:courseId', checkEnrollment); // Button status ke liye (Buy vs Go to Course)

module.exports = router;