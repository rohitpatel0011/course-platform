const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseStats,
  addCourseReview
} = require('../controllers/courseController');
const { protect } = require('../middlewares/authMiddleware');
router.route('/')
  .get(getAllCourses)
  .post(protect, createCourse);

router.get('/stats', getCourseStats);

router.route('/:id')
  .get(getCourseById)
  .put(protect, updateCourse)
  .delete(protect, deleteCourse);
router.route('/:id/reviews').post(protect, addCourseReview);

module.exports = router;