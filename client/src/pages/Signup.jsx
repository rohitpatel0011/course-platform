import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaUser, FaEnvelope, FaLock, FaArrowRight, FaRocket, FaCheckCircle,FaEye
} from 'react-icons/fa';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    // Role argument hata diya (User only)
    const result = await register(name, email, password);

    if (result.success) {
      toast.success(' Welcome to CoursePlatform!');
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4 py-12">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[700px] h-[700px] bg-gradient-to-br from-purple-500/15 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl -left-[250px] top-1/4"></div>
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-tl from-blue-500/10 to-teal-500/10 rounded-full blur-3xl -right-[200px] bottom-1/4"></div>
      </div>

      <div className="max-w-2xl w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FaRocket className="text-white text-sm" />
            </div>
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">START YOUR JOURNEY</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">CoursePlatform</span>
          </h1>
        </div>

    

          {/* Right Column - Signup Form (Clean) */}
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-white/30 dark:border-gray-700/50 shadow-2xl p-8">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaUser className="text-purple-600 dark:text-purple-400" /> Full Name
                </label>
                <div className="relative">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="w-full px-5 py-4 pl-12 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm" required />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaUser className="text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaEnvelope className="text-purple-600 dark:text-purple-400" /> Email Address
                </label>
                <div className="relative">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full px-5 py-4 pl-12 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm" required />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                    <FaEnvelope className="text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
              </div>

              {/* 🔥 ROLE SELECTION REMOVED (As per PDF) 🔥 */}

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaLock className="text-purple-600 dark:text-purple-400" /> Password
                </label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full px-5 py-4 pl-12 pr-12 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                  <FaLock className="text-purple-600 dark:text-purple-400" /> Confirm Password
                </label>
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" className="w-full px-5 py-4 pl-12 pr-12 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm" required />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isSubmitting} className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 mt-6 group ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-2xl'}`}>
                <span className="text-white">{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
                <FaArrowRight className="text-white" />
              </button>
            </form>
            <div className="mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
              <p className="text-gray-600 dark:text-gray-400">Already have an account? <Link to="/login" className="font-bold text-purple-600 hover:text-purple-700 hover:underline">Sign in here</Link></p>
            </div>
          </div>

      </div>
    </div>
  );
};

export default Signup;