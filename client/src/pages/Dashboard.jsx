import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import {
  FaBook, FaPlayCircle, FaChartLine, FaClock, FaCheckCircle,
  FaRocket, FaTrophy, FaFire, FaLayerGroup, FaArrowRight,
  FaCertificate, FaExclamationTriangle, FaSpinner
} from 'react-icons/fa';

const Dashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    totalHours: 0
  });

  useEffect(() => {
    const fetchMyLearning = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get('/enrollment/my-courses');

        if (data.success) {
          const enrollmentData = data.data || [];
          setEnrollments(enrollmentData);

          const totalCoursesCount = enrollmentData.length;

          const completedCoursesCount = enrollmentData.filter(item => {
            const course = item?.courseId;
            if (!course) return false;

            const totalLessons = Array.isArray(course.lessons) ? course.lessons.length : (Number(course.lessons) || 0);
            const completedCount = Array.isArray(item.completedVideos) ? item.completedVideos.length : 0;

            return totalLessons > 0 && completedCount >= totalLessons;
          }).length;

          const inProgressCount = totalCoursesCount - completedCoursesCount;

          const totalHoursCount = Math.round(enrollmentData.reduce((acc, item) => {
            const course = item?.courseId;
            return acc + (Number(course?.duration) || 0);
          }, 0) / 60);

          setStats({
            totalCourses: totalCoursesCount,
            completedCourses: completedCoursesCount,
            inProgressCourses: inProgressCount,
            totalHours: totalHoursCount
          });
        } else {
          setError(data.message || 'Failed to fetch data');
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.response?.data?.message || 'Connection Error: Backend server is not responding');
      } finally {
        setLoading(false);
      }
    };
    fetchMyLearning();
  }, []);

  // --- 🔥 FIXED: Dummy Boxes Removed -> Simple Loader Added ---
  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center">
        <FaSpinner className="text-4xl text-purple-600 animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading your dashboard...</p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center p-8 bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-red-100 dark:border-red-900/30 max-w-md">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500 text-2xl">
            <FaExclamationTriangle />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h3>
          <p className="text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-semibold"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-4 transition-all duration-500 font-sans relative selection:bg-purple-500/30">

      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10 pt-16">

        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm tracking-wider uppercase mb-2">
              <FaRocket /> Student Dashboard
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Learning</span>
            </h1>
          </div>
          <Link to="/courses" className="flex items-center gap-2 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors font-medium">
            Browse All Courses <FaArrowRight />
          </Link>
        </div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">

          {/* Card 1: Total Courses */}
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Enrolled Courses</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalCourses}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <FaBook className="text-xl" />
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full rounded-full" style={{ width: '70%' }}></div>
            </div>
          </div>

          {/* Card 2: In Progress */}
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Learning</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.inProgressCourses}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <FaPlayCircle className="text-xl" />
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: '45%' }}></div>
            </div>
          </div>

          {/* Card 3: Completed */}
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Completed</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.completedCourses}</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                <FaTrophy className="text-xl" />
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>

          {/* Card 4: Hours */}
          <div className="bg-white dark:bg-gray-900/60 backdrop-blur-md p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Learning Hours</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.totalHours}h</h3>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <FaClock className="text-xl" />
              </div>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-orange-500 h-full rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* --- COURSES SECTION --- */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
              <FaLayerGroup />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Courses in Progress</h2>
          </div>

          {enrollments.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-300 dark:border-gray-700">
              <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400 text-3xl">
                <FaBook />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Courses Yet</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't enrolled in any courses. Start your journey today!</p>
              <Link to="/courses" className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:scale-105 transition-all">
                Explore Courses
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {enrollments.map((item) => {
                const course = item?.courseId || {};
                const totalLessons = Array.isArray(course.lessons) ? course.lessons.length : (Number(course.lessons) || 0);
                const completedVideos = Array.isArray(item.completedVideos) ? item.completedVideos.length : 0;

                // Progress Calculation
                const progressPercent = totalLessons > 0 ? Math.round((completedVideos / totalLessons) * 100) : 0;
                const isCompleted = progressPercent === 100;

                return (
                  <div key={item._id} className="group relative flex flex-col bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-purple-500/20 transition-all duration-300 hover:-translate-y-2">

                    {/* Image */}
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={course.thumbnail || 'https://via.placeholder.com/400'}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>

                      {/* Floating Status Badge */}
                      <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-md ${isCompleted ? 'bg-green-500/90' : 'bg-purple-600/90'}`}>
                        {isCompleted ? 'Completed' : 'In Progress'}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2 block">
                          {course.category || 'Development'}
                        </span>
                        <h3 className="font-bold text-xl text-gray-900 dark:text-white line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors">
                          {course.title}
                        </h3>
                      </div>

                      {/* Progress Stats */}
                      <div className="mt-auto">
                        <div className="flex justify-between items-center text-sm mb-2 font-medium">
                          <span className="text-gray-500 dark:text-gray-400">
                            {completedVideos} / {totalLessons} Lessons
                          </span>
                          <span className={isCompleted ? 'text-green-500' : 'text-purple-600'}>
                            {progressPercent}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden mb-6">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-green-500' : 'bg-gradient-to-r from-purple-600 to-pink-600'}`}
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>

                        {/* Action Button */}
                        <Link
                          to={isCompleted ? `/course/${course._id}/certificate` : `/course/${course._id}/learn`}

                          className={`w-full py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${isCompleted
                              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 border border-green-200 dark:border-green-800 hover:bg-green-100'
                              : 'bg-gray-900 dark:bg-white text-white dark:text-black hover:opacity-90 hover:scale-[1.02]'
                            }`}
                        >
                          {isCompleted ? (
                            <><FaCertificate /> View Certificate</>
                          ) : (
                            <><FaPlayCircle /> Continue Learning</>
                          )}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;