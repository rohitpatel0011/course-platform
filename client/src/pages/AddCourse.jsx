import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt, FaMoneyBillWave, FaLayerGroup, FaPlus, FaTrash, FaVideo } from 'react-icons/fa';

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Course Basic Details
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'web-dev',
    thumbnail: '',
    difficulty: 'beginner'
  });

  // Lessons State (Array of objects)
  const [lessons, setLessons] = useState([
    { title: 'Introduction', duration: '5:00', videoUrl: '' } // Default 1st lesson
  ]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Lesson Input Change Handler
  const handleLessonChange = (index, e) => {
    const updatedLessons = [...lessons];
    updatedLessons[index][e.target.name] = e.target.value;
    setLessons(updatedLessons);
  };

  // Add New Lesson Field
  const addLessonField = () => {
    setLessons([...lessons, { title: '', duration: '', videoUrl: '' }]);
  };

  // Remove Lesson Field
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
      lessons: lessons // Backend ab is array ko expect kar raha hai
    };

    try {
      // API call: POST /api/course
      const { data } = await api.post('/course', payload);

      if (data.success) {
        toast.success("Course & Lessons Added Successfully! 🎉");
        navigate('/courses');
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 transition-colors duration-300">
      <div className="container mx-auto max-w-3xl">

        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-800">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Create New Course</h1>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* --- Section 1: Basic Info --- */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 border-b pb-2">1. Basic Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Master React JS"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Course details..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><FaMoneyBillWave className="inline mr-1" /> Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="499"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                    <FaLayerGroup className="inline mr-1 text-blue-500" /> Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
                  >
                    {/* Values ab backend mein bina error ke save hongi */}
                    <option value="Web Dev">Web Development</option>
                    <option value="Mobile Dev">Mobile Development</option>
                    <option value="Data Science">Data Science</option>
                    <option value="Design">UI/UX Design</option>
                    <option value="Backend">Backend</option>
                    <option value="Frontend">Frontend</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"><FaCloudUploadAlt className="inline mr-1" /> Thumbnail URL</label>
                <input type="text" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="https://image-url.com/pic.jpg"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 outline-none" required
                />
              </div>
            </div>

            {/* --- Section 2: Lessons Builder --- */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">2. Course Content (Lessons)</h3>
                <button type="button" onClick={addLessonField} className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-bold hover:bg-blue-200 transition flex items-center gap-1">
                  <FaPlus /> Add Lesson
                </button>
              </div>

              {lessons.map((lesson, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700 relative group">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

                    {/* Lesson Number */}
                    <div className="md:col-span-1 flex justify-center items-center">
                      <span className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center font-bold text-gray-600 dark:text-gray-400">
                        {index + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="md:col-span-4">
                      <label className="text-xs text-gray-500 mb-1 block">Lesson Title</label>
                      <input type="text" name="title" value={lesson.title} onChange={(e) => handleLessonChange(index, e)} placeholder="Intro to Topic"
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-1 focus:ring-blue-500 outline-none" required
                      />
                    </div>

                    {/* Video URL */}
                    <div className="md:col-span-5">
                      <label className="text-xs text-gray-500 mb-1 block">Video URL (.mp4 only for now)</label>
                      <input type="text" name="videoUrl" value={lesson.videoUrl} onChange={(e) => handleLessonChange(index, e)} placeholder="https://site.com/video.mp4"
                        className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm focus:ring-1 focus:ring-blue-500 outline-none" required
                      />
                    </div>

                    {/* Duration (Optional for UI) */}
                    <div className="md:col-span-1">
                      <label className="text-xs text-gray-500 mb-1 block">Time</label>
                      <input type="text" name="duration" value={lesson.duration} onChange={(e) => handleLessonChange(index, e)} placeholder="10:00"
                        className="w-full px-2 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm outline-none"
                      />
                    </div>

                    {/* Delete Button */}
                    <div className="md:col-span-1 flex justify-end">
                      {lessons.length > 1 && (
                        <button type="button" onClick={() => removeLessonField(index)} className="text-red-500 hover:text-red-700 p-2">
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={loading}
              className={`w-full text-white py-4 rounded-xl font-bold text-xl transition shadow-lg mt-8
                ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:scale-[1.01]'}
              `}
            >
              {loading ? 'Publishing Course...' : 'Publish Course'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;