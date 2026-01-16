import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  FaEnvelope, FaLock, FaArrowRight, FaUser, FaChalkboardTeacher, FaGraduationCap, FaEye, FaEyeSlash
} from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!email || !password) {
      toast.error('Please fill all fields');
      setIsSubmitting(false);
      return;
    }
    const result = await login(email, password);
    if (result.success) {
      toast.success(`Welcome back, ${result.user.name}!`);
      navigate('/dashboard');
    } else {
      toast.error(result.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 px-4">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl -left-[200px] top-1/4"></div>
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/10 to-teal-500/10 rounded-full blur-3xl -right-[150px] bottom-1/4"></div>
      </div>

      <div className="max-w-lg w-full relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-4 py-2 rounded-full mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">WELCOME BACK</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Sign In to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">CoursePlatform</span>
          </h1>
        </div>

        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 dark:border-gray-700/50 p-8 md:p-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaEnvelope className="text-purple-600 dark:text-purple-400" /> Email Address
              </label>
              <div className="relative">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" className="w-full px-5 py-4 pl-12 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm" required />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FaEnvelope className="text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                <FaLock className="text-purple-600 dark:text-purple-400" /> Password
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-5 py-4 pl-12 pr-12 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm" required />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <FaLock className="text-purple-600 dark:text-purple-400" />
                </div>
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={isSubmitting} className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 group ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl'}`}>
              <span className="text-white">{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
              <FaArrowRight className="text-white" />
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-gray-200/50 dark:border-gray-700/50 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account? <Link to="/signup" className="font-bold text-purple-600 hover:text-purple-700 hover:underline">Create one now</Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials Updated for PDF Requirement */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl border border-purple-500/20">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">Demo Credentials:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
              <div className="font-medium text-gray-700 dark:text-gray-300">User (Student):</div>
              <div className="text-gray-600 dark:text-gray-400">Email: amankumar@gmail.com</div>
              <div className="text-gray-600 dark:text-gray-400">Password: 123456789</div>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
              <div className="font-medium text-purple-700 dark:text-purple-300">Admin:</div>
              <div className="text-gray-600 dark:text-gray-400">Email: rohitpatel@gmail.com</div>
              <div className="text-gray-600 dark:text-gray-400">Password: 123456789</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;