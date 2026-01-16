import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';
import {
  FaPlay, FaCheckCircle, FaBars, FaTimes, FaSpinner,
  FaTrophy, FaArrowLeft, FaStar, FaRegStar, FaUserCircle
} from 'react-icons/fa';

const CoursePlayer = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Review States
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviewLoading, setReviewLoading] = useState(false);

  // --- Fetch Data ---
  const fetchData = async () => {
    try {
      const courseRes = await api.get(`/course/${id}`);
      const progressRes = await api.get('/enrollment/my-courses');

      if (courseRes.data.success) {
        setCourse(courseRes.data.data);
        const myProgress = progressRes.data.data.find(p => p.courseId._id === id);
        if (myProgress) {
          setCompletedLessons(myProgress.completedVideos || []);
        }
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // --- Mark Complete ---
  const handleMarkComplete = async (lessonId) => {
    if (completedLessons.includes(lessonId)) return;
    try {
      const { data } = await api.put(`/enrollment/${id}/progress`, { lessonId });
      if (data.success) {
        setCompletedLessons(prev => [...prev, lessonId]);
        toast.success("Progress Saved!");
        if (currentLessonIndex < (course?.lessons?.length || 0) - 1) {
          setTimeout(() => setCurrentLessonIndex(prev => prev + 1), 1500);
        }
      }
    } catch (err) {
      toast.error("Could not save progress");
      console.error(err);
    }
  };

  // --- Submit Review ---
  const submitReview = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please select a rating");

    try {
      setReviewLoading(true);
      await api.post(`/course/${id}/reviews`, { rating, comment });
      toast.success("Review Submitted!");
      setComment('');
      setRating(0);
      fetchData();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error submitting review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <FaSpinner className="text-4xl animate-spin text-purple-600 mb-4" />
      <p>Loading Classroom...</p>
    </div>
  );

  if (!course) return <div className="text-white text-center p-20">Course not found.</div>;

  const lessons = course.lessons || [];
  const currentLesson = lessons[currentLessonIndex];
  const progressPercent = lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0;

  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">

      {/* --- SIDEBAR --- */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-gray-900">
          <Link to="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-bold">
            <FaArrowLeft /> Back
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400"><FaTimes /></button>
        </div>
        <div className="p-6 border-b border-gray-800">
          <h2 className="font-bold text-lg leading-tight mb-2 text-gray-100">{course.title}</h2>
          <div className="flex items-center gap-2 text-xs font-medium">
            <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <span className="text-green-400">{progressPercent}% Done</span>
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson._id);
            const isActive = currentLessonIndex === index;
            return (
              <button
                key={lesson._id}
                onClick={() => {
                  setCurrentLessonIndex(index);
                  if (window.innerWidth < 768) setIsSidebarOpen(false);
                }}
                className={`w-full text-left p-4 border-b border-gray-800 flex items-start gap-3 transition-all hover:bg-gray-800/50 ${isActive ? 'bg-purple-900/20 border-l-4 border-l-purple-500' : 'border-l-4 border-l-transparent'
                  }`}
              >
                <div className="mt-1">
                  {isCompleted ? <FaCheckCircle className="text-green-500 text-sm" /> : isActive ? <FaPlay className="text-purple-500 text-xs" /> : <span className="text-xs font-bold text-gray-600">{index + 1}</span>}
                </div>
                <div>
                  <h4 className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-400'} ${isCompleted && !isActive && 'line-through opacity-50'}`}>{lesson.title}</h4>
                  <span className="text-[10px] text-gray-600">{lesson.duration} min</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="flex-1 flex flex-col h-full relative">
        <div className="h-16 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-gray-400 hover:text-white md:hidden"><FaBars /></button>
            <h3 className="font-bold text-sm md:text-lg truncate max-w-[200px] md:max-w-xl">{currentLesson?.title}</h3>
          </div>
          <div className="flex gap-2">
            <button disabled={currentLessonIndex === 0} onClick={() => setCurrentLessonIndex(prev => prev - 1)} className="px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-xs font-bold disabled:opacity-30 transition-all">Prev</button>
            <button disabled={currentLessonIndex === lessons.length - 1} onClick={() => setCurrentLessonIndex(prev => prev + 1)} className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-gray-200 text-xs font-bold disabled:opacity-30 transition-all">Next</button>
          </div>
        </div>

        <div className="flex-1 bg-black flex flex-col overflow-y-auto">
          {/* Video Player */}
          <div className="w-full aspect-video bg-gray-900 relative group">
            {currentLesson?.videoUrl ? (
              <video key={currentLesson._id} src={currentLesson.videoUrl} controls autoPlay className="w-full h-full object-contain" onEnded={() => handleMarkComplete(currentLesson._id)} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">Video URL not available</div>
            )}
          </div>

          {/* Content Tabs */}
          <div className="p-6 md:p-10 max-w-5xl mx-auto w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">{currentLesson?.title}</h1>
                <div className="flex gap-4 border-b border-gray-800 mt-4">
                  <button onClick={() => setActiveTab('overview')} className={`pb-2 text-sm font-bold transition-colors ${activeTab === 'overview' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>Overview</button>
                  <button onClick={() => setActiveTab('reviews')} className={`pb-2 text-sm font-bold transition-colors ${activeTab === 'reviews' ? 'text-purple-500 border-b-2 border-purple-500' : 'text-gray-500 hover:text-gray-300'}`}>Reviews ({course.reviews?.length || 0})</button>
                </div>
              </div>

              <button onClick={() => handleMarkComplete(currentLesson?._id)} className={`hidden md:flex px-6 py-2.5 rounded-xl font-bold items-center gap-2 transition-all ${completedLessons.includes(currentLesson?._id) ? 'bg-green-500/10 text-green-500 border border-green-500/20 cursor-default' : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'}`}>
                {completedLessons.includes(currentLesson?._id) ? <><FaCheckCircle /> Completed</> : <><FaTrophy /> Mark Complete</>}
              </button>
            </div>

            {activeTab === 'overview' ? (
              <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold text-lg mb-4 text-gray-200">About this Course</h3>
                <p className="text-gray-400 leading-relaxed">{course.description}</p>
              </div>
            ) : (
              <div>
                {/* Review Form */}
                <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 mb-8">
                  <h3 className="font-bold text-lg mb-4 text-white">Write a Review</h3>
                  <form onSubmit={submitReview}>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button type="button" key={star} onClick={() => setRating(star)} className="text-2xl focus:outline-none transition-transform hover:scale-110">
                          {rating >= star ? <FaStar className="text-yellow-500" /> : <FaRegStar className="text-gray-600" />}
                        </button>
                      ))}
                    </div>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your experience..." className="w-full bg-black border border-gray-700 rounded-xl p-4 text-white focus:border-purple-500 outline-none mb-4" rows="3"></textarea>
                    <button type="submit" disabled={reviewLoading} className="px-6 py-2 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition disabled:opacity-50">
                      {reviewLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </form>
                </div>

                {/* Review List - With Safety Check */}
                <div className="space-y-4">
                  {course.reviews && course.reviews.length > 0 ? (
                    course.reviews.map((rev, idx) => {
                      // Safety Check: Agar review object sahi nahi hai to skip karo
                      if (!rev || typeof rev !== 'object') return null;

                      return (
                        <div key={idx} className="bg-gray-900/30 p-4 rounded-xl border border-gray-800">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold text-xs">
                              {rev.name ? rev.name.charAt(0) : <FaUserCircle />}
                            </div>
                            <div>
                              <p className="font-bold text-sm text-white">{rev.name || 'Anonymous User'}</p>
                              <div className="flex text-yellow-500 text-xs">
                                {[...Array(5)].map((_, i) => (
                                  i < (rev.rating || 0) ? <FaStar key={i} /> : <FaRegStar key={i} className="text-gray-600" />
                                ))}
                              </div>
                            </div>
                            <span className="ml-auto text-xs text-gray-500">
                              {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : ''}
                            </span>
                          </div>
                          <p className="text-gray-400 text-sm ml-11">{rev.comment || 'No comment'}</p>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-center py-4">No reviews yet. Be the first!</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;