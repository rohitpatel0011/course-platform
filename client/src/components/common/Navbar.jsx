import React, { useState, useEffect, useRef } from 'react';
import {
  FaBookReader, FaBars, FaTimes, FaMoon, FaSun, FaCaretDown,
  FaHome, FaBookOpen, FaChalkboardTeacher, FaUserCircle
} from 'react-icons/fa';
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutModal from '../LogoutModal';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Dark Mode
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleLogoutClick = () => {
    setShowUserMenu(false);
    setIsMobile(false);
    setIsModalOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setIsModalOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      {/* Background Blur Circles */}
      <div className="fixed top-0 left-0 right-0 h-16 overflow-hidden -z-10">
        <div className="absolute w-64 h-64 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl -top-20 -left-10"></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center font-sans transition-all duration-500 ${scrolled
        ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800'
        : 'bg-transparent'
        }`}>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center w-full">

          {/* Logo - Box Removed, Only Gradient Icon */}
          <Link to="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <FaBookReader className="text-3xl text-transparent bg-clip-text bg-gradient-to-br from-purple-500 to-pink-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CoursePlatform
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-1 items-center">
            <li>
              <Link to="/" className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Courses
              </Link>
            </li>
            {user && (
              <li>
                <Link to="/dashboard" className="px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 font-medium hover:text-green-600 dark:hover:text-green-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            )}

            {/* Admin Panel Link */}
            {user && user.role === 'admin' && (
              <li>
                <Link
                  to="/admin/add-course"
                  className="ml-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all"
                >
                  Admin Panel
                </Link>
              </li>
            )}
          </ul>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setDarkMode(!darkMode)} className="text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors">
              {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>

            {user ? (
              <div className="relative" ref={menuRef}>
                {/* Profile Section - Background and Student Label Removed */}
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 group transition-all"
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-sm group-hover:shadow-md transition-all">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    Hi, {user.name?.split(' ')[0]}
                  </span>
                  <FaCaretDown className={`text-gray-400 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-4 border-b border-gray-50 dark:border-gray-800">
                      <p className="font-bold text-gray-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all">
                        <FaUserCircle className="text-gray-400" /> Profile
                      </Link>
                      <button onClick={handleLogoutClick} className="flex items-center gap-3 w-full text-left px-4 py-2.5 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-all">
                        <span className="text-lg">→</span> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-4 items-center">
                <Link to="/login" className="text-gray-700 dark:text-gray-300 font-medium hover:text-purple-600 transition-colors">Login</Link>
                <Link to="/signup" className="px-6 py-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold hover:scale-105 transition-all">Signup</Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMobile(!isMobile)} className="text-gray-700 dark:text-gray-200">
              {isMobile ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isMobile && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 shadow-xl z-40">
            <div className="px-6 py-8 space-y-5">
              <Link to="/" onClick={() => setIsMobile(false)} className="block text-lg font-medium">Home</Link>
              <Link to="/courses" onClick={() => setIsMobile(false)} className="block text-lg font-medium">Courses</Link>
              {user && <Link to="/dashboard" onClick={() => setIsMobile(false)} className="block text-lg font-medium">Dashboard</Link>}
              {user?.role === 'admin' && <Link to="/admin/add-course" onClick={() => setIsMobile(false)} className="block text-lg font-bold text-purple-600">Admin Panel</Link>}
              <hr className="border-gray-100 dark:border-gray-800" />
              {user ? (
                <button onClick={handleLogoutClick} className="text-red-600 font-bold">Logout</button>
              ) : (
                <Link to="/login" onClick={() => setIsMobile(false)} className="block font-bold">Login</Link>
              )}
            </div>
          </div>
        )}
      </nav>
      <LogoutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={confirmLogout} />
    </>
  );
};

export default Navbar;