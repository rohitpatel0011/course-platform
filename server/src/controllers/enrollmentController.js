const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const mongoose = require('mongoose');

const updateProgress = async (req, res) => {
  try {
    const { lessonId } = req.body;
    const courseId = req.params.id;
    const userId = req.user.id;

    let enrollment = await CourseProgress.findOne({ userId, courseId });

    if (!enrollment) {
      return res.status(404).json({ success: false, message: 'Enrollment record not found' });
    }

    if (lessonId && !enrollment.completedVideos.includes(lessonId)) {
      enrollment.completedVideos.push(lessonId);
      await enrollment.save();
    }

    res.status(200).json({
      success: true,
      message: 'Progress updated',
      data: enrollment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ success: false, message: 'Invalid Course ID' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    const exists = await CourseProgress.findOne({ userId, courseId });
    if (exists) {
      return res.status(400).json({ success: false, message: 'Already enrolled' });
    }

    await CourseProgress.create({ userId, courseId, completedVideos: [] });
    await Course.findByIdAndUpdate(courseId, { $inc: { studentsEnrolled: 1 } });

    res.status(201).json({ success: true, message: 'Enrollment successful!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get my courses
const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const enrollments = await CourseProgress.find({ userId })
      .populate({
        path: 'courseId',
        select: 'title description thumbnail category lessons duration rating studentsEnrolled',
        populate: { path: 'instructor', select: 'name' }
      });

    res.status(200).json({ success: true, data: enrollments || [] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    const enrollment = await CourseProgress.findOne({ userId, courseId });
    res.status(200).json({ success: true, isEnrolled: !!enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};


module.exports = { enrollCourse, getMyCourses, updateProgress, checkEnrollment };