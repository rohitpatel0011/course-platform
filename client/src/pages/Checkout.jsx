// src/pages/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/course/${id}`);
        if (data.success) setCourse(data.data);
      } catch (error) {
        toast.error("Course load failed");
        console.error(error.message)
      }
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      // Backend Endpoint: POST /api/enrollment [cite: 90]
      const response = await api.post(`/enrollment/${id}`);

      if (response.data.success) {
        toast.success("Enrolled Successfully! 🎉");
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    } finally {
      setProcessing(false);
    }
  };

  if (!course) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold mb-6">Confirm Enrollment</h2>
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg flex gap-6 border dark:border-gray-800">
        <img src={course.thumbnail} className="w-40 h-24 object-cover rounded-md" alt="" />
        <div className="flex-1">
          <h3 className="text-xl font-bold">{course.title}</h3>
          <p className="text-blue-600 font-bold mt-2">Price: ₹{course.price}</p>
          <button
            onClick={handleEnroll}
            disabled={processing}
            className="mt-4 bg-blue-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {processing ? "Processing..." : "Pay & Enroll Now"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Checkout;