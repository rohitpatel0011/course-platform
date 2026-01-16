import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios'; // Path check kar lena
import toast from 'react-hot-toast';
import {
  FaCloudUploadAlt, FaMoneyBillWave, FaLayerGroup, FaPlus,
  FaTrash, FaVideo, FaHeading, FaClock, FaImage, FaArrowLeft
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // 1. Basic Course Details
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Web Dev', // Default
    thumbnail: '',
    level: 'Beginner'
  });

  // 2. Lessons State (Dynamic Array)
  const [lessons, setLessons] = useState([
    { title: '', videoUrl: '', duration: '' }
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Lesson Input Handler
  const handleLessonChange = (index, e) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][e.target.name] = e.target.value;
    setLessons(updatedLessons);
  };

  // Add New Lesson Button
  const addLessonField = () => {
    setLessons([...lessons, { title: '', videoUrl: '', duration: '' }]);
  };

  // Remove Lesson Button
  const removeLessonField = (index) => {
    const updatedLessons = lessons.filter((_, i) => i !== index);
    setLessons(updatedLessons);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.title || !formData.description || !formData.price || !formData.thumbnail) {
      toast.error("Please fill all basic course fields");
      setLoading(false);
      return;
    }

    // Combine Data
    const payload = {
      ...formData,
      lessons: lessons // Backend ab array expect kar raha hai
    };

    try {
      const { data } = await api.post('/course', payload);

      if (data.success) {
        toast.success("Course Published Successfully! 🎉");
        navigate('/courses'); // Redirect to courses page
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to create course";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 font-sans">
      <div className="container mx-auto max-w-4xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-purple-600 mb-2 transition-colors">
              <FaArrowLeft /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Create New <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Course</span>
            </h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* --- Section 1: Basic Info Card --- */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <FaHeading className="text-purple-600" /> Basic Information
            </h3>

            <div className="grid grid-cols-1 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Course Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Full Stack Web Development Bootcamp"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" placeholder="What will students learn in this course?"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><FaMoneyBillWave className="inline mr-1 text-green-500" /> Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="499"
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none" required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><FaLayerGroup className="inline mr-1 text-blue-500" /> Category</label>
                  <select name="category" value={formData.category} onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    <option value="Web Dev">Web Development</option>
                    <option value="Mobile Dev">Mobile Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">UI/UX Design</option>
                    <option value="Backend">Backend</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail */}
              <div>
                <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"><FaImage className="inline mr-1 text-pink-500" /> Thumbnail URL</label>
                <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="https://image-url.com/banner.jpg"
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" required
                />
                <p className="text-xs text-gray-400 mt-2">Tip: Use an image from Unsplash or direct link.</p>
              </div>
            </div>
          </div>

          {/* --- Section 2: Lessons Builder Card --- */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-100 dark:border-gray-800 shadow-xl">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FaVideo className="text-red-500" /> Course Content
              </h3>
              <button type="button" onClick={addLessonField}
                className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full font-bold text-sm hover:bg-purple-200 transition-colors"
              >
                <FaPlus /> Add Lesson
              </button>
            </div>

            <div className="space-y-4">
              {lessons.map((lesson, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 relative group hover:border-purple-500/30 transition-all">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                    {/* Number */}
                    <div className="md:col-span-1 flex justify-center pb-3">
                      <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-400">
                        {index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-5">
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Lesson Title</label>
                      <input type="text" name="title" value={lesson.title} onChange={(e) => handleLessonChange(index, e)} placeholder="e.g. Introduction to React"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none" required
                      />
                    </div>

                    {/* Video URL */}
                    <div className="md:col-span-4">
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Video URL</label>
                      <input type="text" name="videoUrl" value={lesson.videoUrl} onChange={(e) => handleLessonChange(index, e)} placeholder="http://..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 outline-none" required
                      />
                    </div>

                    {/* Duration */}
                    <div className="md:col-span-1">
                      <label className="text-xs font-bold text-gray-500 uppercase mb-1 block">Min</label>
                      <input type="text" name="duration" value={lesson.duration} onChange={(e) => handleLessonChange(index, e)} placeholder="10"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 outline-none"
                      />
                    </div>

                    {/* Delete */}
                    <div className="md:col-span-1 flex justify-end pb-2">
                      {lessons.length > 1 && (
                        <button type="button" onClick={() => removeLessonField(index)} className="text-red-400 hover:text-red-600 p-2 transition-colors">
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}
            className={`w-full py-5 rounded-2xl font-bold text-xl text-white shadow-xl transition-all transform hover:scale-[1.01] flex items-center justify-center gap-3
              ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/30'}
            `}
          >
            {loading ? (
              <>Processing...</>
            ) : (
              <>
                <FaCloudUploadAlt className="text-2xl" /> Publish Course
              </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddCourse;