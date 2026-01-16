import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaStar, FaBookOpen, FaFilter, FaTimes, FaPlayCircle,
  FaClock, FaUserGraduate, FaFire, FaLayerGroup, FaArrowRight,
  FaSpinner, FaLaptopCode
} from 'react-icons/fa';
import api from '../api/axios';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  const categories = [
    'All', 'Web Dev', 'Mobile Dev', 'Data Science', 'Design', 'Backend', 'Frontend'
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const { data } = await api.get('/course');
        if (data.success) {
          setCourses(data.data);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  // Filter Logic
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center">
      <FaSpinner className="text-4xl text-purple-600 animate-spin mb-4" />
      <p className="text-gray-500 font-medium">Loading courses...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black py-20 px-4 font-sans relative selection:bg-purple-500/30">

      {/* --- BACKGROUND PATTERN (Matches Dashboard) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl relative z-10 pt-10">

        {/* --- HEADER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-purple-500/20 bg-purple-500/5 dark:bg-purple-900/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
            <FaLaptopCode className="text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-700 dark:text-purple-300 uppercase">
              Expert Led Courses
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Catalog</span>
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Master new skills with our project-based learning paths.
          </p>
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">

          {/* Search Input */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative flex items-center bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1">
              <FaSearch className="ml-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 outline-none"
              />
            </div>
          </div>

          {/* Category Tabs (Desktop) */}
          <div className="hidden md:flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${selectedCategory === cat
                    ? 'bg-gray-900 dark:bg-white text-white dark:text-black border-transparent shadow-lg'
                    : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-purple-500/50'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="md:hidden w-full flex items-center justify-center gap-2 px-5 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl font-bold text-gray-700 dark:text-gray-300"
          >
            <FaFilter /> Filter Categories
          </button>
        </div>

        {/* Mobile Filter Menu */}
        {showFilter && (
          <div className="md:hidden grid grid-cols-2 gap-2 mb-8 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setShowFilter(false); }}
                className={`px-4 py-2 rounded-lg text-xs font-bold ${selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* --- COURSES GRID --- */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <div key={course._id} className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-purple-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">

                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail || 'https://via.placeholder.com/400'}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-gray-900 dark:text-white shadow-sm">
                    {course.category}
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 text-white shadow-xl">
                      <FaPlayCircle className="text-2xl" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-1 text-yellow-500 text-xs font-bold">
                      <FaStar /> <span>{course.rating ? course.rating.toFixed(1) : '4.5'}</span>
                      <span className="text-gray-400 font-normal ml-1">({course.numReviews || 0})</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400 text-xs font-medium">
                      <FaClock className="text-[10px]" /> {course.duration || '6h'}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-auto mb-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                      {course.instructor?.name?.charAt(0) || 'I'}
                    </div>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 truncate">
                      {course.instructor?.name || 'Instructor'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      {course.price === 0 ? 'Free' : `₹${course.price}`}
                    </span>
                    <Link
                      to={`/course/${course._id}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-purple-600 hover:text-white dark:hover:bg-purple-600 text-gray-900 dark:text-white text-xs font-bold rounded-lg transition-all flex items-center gap-2"
                    >
                      View Details <FaArrowRight />
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-24 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <div className="w-20 h-20 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400 text-3xl">
              <FaBookOpen />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No courses found</h3>
            <p className="text-gray-500 mb-6">We couldn't find any courses matching your search.</p>
            <button onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }} className="text-purple-600 font-bold hover:underline">
              Clear Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;