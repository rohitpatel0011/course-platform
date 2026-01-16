import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaArrowLeft, FaCertificate, FaSpinner } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const Certificate = () => {
  const { id } = useParams();
  const certificateRef = useRef(null);
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await api.get(`/course/${id}`);
        if (data.success) {
          setCourse(data.data);
        }
      } catch (err) {
        console.error("Certificate Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);


  const handleDownload = async () => {
    const element = certificateRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('landscape', 'px', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${user.name}_Certificate.pdf`);
  };

  if (loading) return <div className="flex h-screen items-center justify-center bg-gray-900"><FaSpinner className="animate-spin text-4xl text-purple-600" /></div>;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 font-sans">

      {/* Action Bar */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8">
        <button onClick={() => navigate('/dashboard')} className="flex items-center gap-2 text-white hover:text-purple-400 transition">
          <FaArrowLeft /> Back to Dashboard
        </button>
        <button
          onClick={handleDownload}
          className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <FaDownload /> Download PDF
        </button>
      </div>

      {/* --- CERTIFICATE DESIGN --- */}
      <div className="overflow-auto max-w-full p-4">
        <div
          ref={certificateRef}
          className="relative w-[1000px] h-[700px] bg-white text-black p-10 shadow-2xl mx-auto flex items-center justify-center"
        >
          {/* Border Design */}
          <div className="w-full h-full border-[20px] border-double border-gray-200 relative p-10 flex flex-col items-center justify-center text-center">

            {/* Corner Ornaments */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-[8px] border-l-[8px] border-yellow-600"></div>
            <div className="absolute top-0 right-0 w-24 h-24 border-t-[8px] border-r-[8px] border-yellow-600"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[8px] border-l-[8px] border-yellow-600"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[8px] border-r-[8px] border-yellow-600"></div>

            {/* Logo/Icon */}
            <div className="mb-6">
              <FaCertificate className="text-6xl text-yellow-600" />
            </div>

            {/* Header Text */}
            <h1 className="text-6xl font-black text-gray-800 mb-2 uppercase tracking-widest font-serif">Certificate</h1>
            <h2 className="text-2xl text-yellow-600 font-bold uppercase tracking-[0.2em] mb-10">Of Completion</h2>

            {/* Body Text */}
            <p className="text-lg text-gray-500 mb-4">This certificate is proudly presented to</p>

            {/* Student Name */}
            <h3 className="text-5xl font-bold text-gray-900 mb-4 font-serif italic border-b-2 border-gray-300 px-10 pb-2 inline-block min-w-[400px]">
              {user?.name}
            </h3>

            <p className="text-lg text-gray-500 mt-6 mb-2">For successfully completing the course</p>

            {/* Course Name */}
            <h4 className="text-3xl font-bold text-purple-700 mb-12 max-w-3xl">
              {course?.title || "Course Title"}
            </h4>

            {/* Footer / Signatures */}
            <div className="w-full flex justify-between items-end px-20 mt-10">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 border-t border-gray-400 pt-2 px-10">
                  {new Date().toLocaleDateString()}
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Date</p>
              </div>

              {/* Badge */}
              <div className="w-24 h-24 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold shadow-inner mb-4">
                <div className="w-20 h-20 border-2 border-white rounded-full flex items-center justify-center text-xs text-center leading-none">
                  OFFICIAL<br />CERTIFIED
                </div>
              </div>

              <div className="text-center">
                <div className="text-lg font-bold text-gray-800 font-serif italic border-t border-gray-400 pt-2 px-10">
                  CoursePlatform
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mt-1">Instructor Signature</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Certificate;