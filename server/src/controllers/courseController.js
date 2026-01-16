const Course = require('../models/Course');
const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');


const createCourse = asyncHandler(async (req, res) => {
  try {
    const { title, description, price, category, thumbnail, level, lessons } = req.body;

    // Basic Validation
    if (!title || !description || !category) {
      return res.status(400).json({ success: false, message: 'Please fill required fields' });
    }

    const slug = title.toLowerCase().split(' ').join('-');

    const course = await Course.create({
      title,
      slug,
      description,
      price: Number(price) || 0,
      category,
      thumbnail,
      level: level || 'Beginner',
      instructor: req.user.id,
      lessons: lessons || [],
      studentsEnrolled: 0
    });

    console.log("✅ Course Created:", course.title);
    res.status(201).json({ success: true, data: course });

  } catch (error) {
    console.error("❌ Create Course Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || 'Server Error'
    });
  }
});



const getAllCourses = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  let query = {};
  if (category && category !== 'All') query.category = category;
  if (search) query.title = { $regex: search, $options: 'i' };

  const courses = await Course.find(query).populate('instructor', 'name');
  res.status(200).json({ success: true, data: courses });
});

const getCourseById = asyncHandler(async (req, res) => {
  const course = await Course.findById(req.params.id).populate('instructor', 'name');
  if (!course) return res.status(404).json({ success: false, message: 'Not found' });
  res.status(200).json({ success: true, data: course });
});

const updateCourse = asyncHandler(async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json({ success: true, data: course });
});


const deleteCourse = asyncHandler(async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, message: 'Course deleted' });
});


const getCourseStats = asyncHandler(async (req, res) => {
  const stats = await Course.aggregate([
    { $group: { _id: null, totalCourses: { $sum: 1 }, totalStudents: { $sum: '$studentsEnrolled' } } }
  ]);
  res.status(200).json({ success: true, data: stats[0] });
});

// ... Upar ke saare imports same rahenge

// @desc    Create new review
// @route   POST /api/course/:id/reviews
const addCourseReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const course = await Course.findById(req.params.id);

  if (course) {
    // 1. Check if user already reviewed
    const alreadyReviewed = course.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({ success: false, message: 'Course already reviewed' });
    }

    // 2. Add new review
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    course.reviews.push(review);

    // 3. Update stats
    course.numReviews = course.reviews.length;

    // Calculate Average Rating
    course.rating =
      course.reviews.reduce((acc, item) => item.rating + acc, 0) /
      course.reviews.length;

    await course.save();
    res.status(201).json({ success: true, message: 'Review added' });
  } else {
    res.status(404).json({ success: false, message: 'Course not found' });
  }
});

// Module Exports ko update karna na bhulein
module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseStats,
  addCourseReview 
};