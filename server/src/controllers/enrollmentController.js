const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');

// @desc    Enroll in a course
// @route   POST /api/enrollment/:courseId
// @access  Private
const enrollCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    // 1. Check if course actually exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    // 2. Check if user is ALREADY enrolled
    const exists = await CourseProgress.findOne({ userId, courseId });
    if (exists) {
      return res.status(400).json({ success: false, message: 'You are already enrolled in this course' });
    }

    // 3. Create Enrollment Record
    await CourseProgress.create({
      userId,
      courseId,
      completedVideos: []
    });

    res.status(201).json({
      success: true,
      message: 'Enrollment successful! Welcome to the course.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Get logged in user's enrolled courses
// @route   GET /api/enrollment/my-courses
// @access  Private
const getMyCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    // Logic: Find all progress records for this user
    // .populate('courseId') ka matlab: Course ki details (title, image) bhi le aao
    const enrollments = await CourseProgress.find({ userId })
      .populate({
        path: 'courseId',
        select: 'title description thumbnail difficulty instructor', // Sirf ye fields chahiye
        populate: {
          path: 'instructor',
          select: 'name'
        }
      });

    if (!enrollments) {
      return res.status(200).json({ success: true, data: [] });
    }

    // Response structure clean karte hain
    // Hum "CourseProgress" object bhej rahe hain jisme course details embedded hain
    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// @desc    Check enrollment status for a specific course (For UI buttons)
// @route   GET /api/enrollment/check/:courseId
// @access  Private
const checkEnrollment = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const userId = req.user.id;

    const enrollment = await CourseProgress.findOne({ userId, courseId });

    res.status(200).json({
      success: true,
      isEnrolled: !!enrollment, // Converts object to boolean (true/false)
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
}

module.exports = {
  enrollCourse,
  getMyCourses,
  checkEnrollment
};