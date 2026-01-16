import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FaStar,
  FaBookOpen,
  FaClock,
  FaUsers,
  FaPlayCircle,
  FaArrowLeft,
  FaCheckCircle,
  FaShareAlt,
  FaBookmark,
  FaChevronRight,
  FaCalendarAlt,
  FaTag,
  FaCertificate,
  FaGlobe,
  FaLaptop
} from 'react-icons/fa';
import api from '../api/axios';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const { data } = await api.get(`/course/${id}`);
        if (data.success) {
          setCourse(data.data);
        } else {
          setError('Course not found');
        }
      } catch (err) {
        console.error("Error:", err);
        setError('Server Error or Course not found');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white dark:bg-gray-950">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <FaBookOpen className="text-gray-400 text-2xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{error || 'Course Not Found'}</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The course you're looking for might have been removed or is temporarily unavailable.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            <FaArrowLeft /> Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const studentCount = course.students || '2.5k';
  const ratingCount = course.rating || 4.8;
  const lectureCount = course.lectures ? course.lectures.length : 0;

  const totalDuration = course.lectures
    ? Math.round(course.lectures.reduce((acc, curr) => acc + (curr.duration || 0), 0) / 60) + ' hours'
    : '10 hours';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* Header */}
      <div className="relative bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-6"
            >
              <FaArrowLeft /> All Courses
            </Link>
          </div>

          <div className="max-w-4xl">
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                <FaTag className="text-sm" /> {course.category || 'Programming'}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {course.title}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                    {course.instructor?.name?.charAt(0) || 'I'}
                  </span>
                </div>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {course.instructor?.name || 'Expert Instructor'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                <span className="font-semibold text-gray-900 dark:text-white">{ratingCount}</span>
                <span className="text-gray-500">({studentCount} students)</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCalendarAlt className="text-gray-400" />
                <span>Last updated: {new Date(course.updatedAt || Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8">

            {/* Course Preview */}
            <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
              <div className="relative aspect-video bg-gray-900">
                <img
                  src={course.thumbnail || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop'}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                    <FaPlayCircle className="text-blue-600 text-2xl" />
                  </button>
                </div>
              </div>
            </div>

            {/* What You'll Learn */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                What you'll learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Master core concepts through practical examples',
                  'Build real-world applications from scratch',
                  'Understand best practices and industry standards',
                  'Get hands-on with projects and exercises',
                  'Learn debugging and problem-solving techniques',
                  'Prepare for interviews and career advancement'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Course Content
                </h2>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {lectureCount} sections • {totalDuration}
                </div>
              </div>

              <div className="space-y-2">
                {course.lectures && course.lectures.length > 0 ? (
                  course.lectures.map((lecture, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-gray-100 dark:border-gray-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-semibold">{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{lecture.title}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {lecture.description || 'Video lecture with practical examples'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {lecture.duration || 30} min
                        </span>
                        <FaPlayCircle className="text-gray-400" />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FaBookOpen className="text-gray-400 text-3xl mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">Course content will be added soon</p>
                  </div>
                )}
              </div>
            </div>

            {/* Requirements */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Requirements</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Basic computer literacy
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Internet connection
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Eagerness to learn and practice
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Code editor (VS Code recommended)
                </li>
              </ul>
            </div>

            {/* Description */}
            <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Description</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                  {course.detailedDescription || course.description}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">

              {/* Enrollment Card */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {course.price === 0 ? 'Free' : `₹${course.price}`}
                  </div>
                  {course.originalPrice && course.price < course.originalPrice && (
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 dark:text-gray-400 line-through">₹{course.originalPrice}</span>
                      <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Save {Math.round((1 - course.price / course.originalPrice) * 100)}%
                      </span>
                    </div>
                  )}
                </div>

                <Link
                  to={`/checkout/${course._id}`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  Enroll Now <FaChevronRight />
                </Link>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                  30-day money-back guarantee
                </p>

                <div className="space-y-4 border-t border-gray-100 dark:border-gray-800 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FaLaptop /> Includes
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {lectureCount} video lectures
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FaCertificate /> Certificate
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Completion certificate
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FaGlobe /> Access
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Lifetime access
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FaClock /> Duration
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {totalDuration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Course Stats */}
              <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Course Stats</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Student Rating</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{ratingCount}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: `${(ratingCount / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Enrolled Students</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{studentCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Difficulty Level</span>
                    <span className="font-semibold text-gray-900 dark:text-white capitalize">{course.difficulty || 'Beginner'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {new Date(course.updatedAt || Date.now()).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                  <FaShareAlt /> Share
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                  <FaBookmark /> Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;