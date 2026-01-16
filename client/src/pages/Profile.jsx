import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  FaUser, FaLock, FaEnvelope, FaCamera, FaShieldAlt,
  FaCheckCircle, FaExclamationCircle, FaUserCircle
} from 'react-icons/fa';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Profile updated successfully!');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black py-20 px-4 font-sans relative selection:bg-purple-500/30">

      {/* --- BACKGROUND PATTERN --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto max-w-5xl relative z-10 pt-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Account Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your profile details and security settings</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* --- LEFT SIDEBAR (Navigation) --- */}
          <div className="w-full lg:w-72 space-y-3">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 group ${activeTab === 'general'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800'
                }`}
            >
              <FaUserCircle className={`text-xl ${activeTab === 'general' ? 'text-white' : 'text-purple-500'}`} />
              General Info
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all duration-300 group ${activeTab === 'security'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg transform scale-105'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800'
                }`}
            >
              <FaShieldAlt className={`text-xl ${activeTab === 'security' ? 'text-white' : 'text-blue-500'}`} />
              Security
            </button>
          </div>

          {/* --- RIGHT CONTENT AREA --- */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl p-8 lg:p-10">

              {/* --- GENERAL TAB --- */}
              {activeTab === 'general' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Details</h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Update your photo and personal details here.</p>
                    </div>
                  </div>

                  {/* Avatar Section */}
                  <div className="flex items-center gap-8 mb-10 pb-10 border-b border-gray-100 dark:border-gray-800">
                    <div className="relative group">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 p-1 shadow-2xl">
                        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 text-purple-600 hover:text-purple-700 hover:scale-110 transition-all cursor-pointer">
                        <FaCamera size={16} />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-1">Profile Photo</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Recommended 300x300px. JPG, PNG.</p>
                      <div className="flex gap-3">
                        <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Change</button>
                        <button className="px-4 py-2 text-red-500 text-xs font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Full Name</label>
                        <div className="relative">
                          <FaUser className="absolute left-4 top-3.5 text-gray-400" />
                          <input
                            type="text"
                            defaultValue={user?.name}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all font-medium"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email Address</label>
                        <div className="relative">
                          <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                          <input
                            type="email"
                            defaultValue={user?.email}
                            disabled
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-500 cursor-not-allowed font-medium"
                          />
                          <FaLock className="absolute right-4 top-3.5 text-gray-400 text-xs" />
                        </div>
                        <p className="text-[10px] text-gray-400 mt-1 ml-1">Email cannot be changed.</p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* --- SECURITY TAB --- */}
              {activeTab === 'security' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Password & Security</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage your password and account security settings.</p>
                  </div>

                  <form onSubmit={handleUpdate} className="space-y-6 max-w-lg">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Current Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                      />
                      {/* Password Strength Indicator (Visual Only) */}
                      <div className="flex gap-1 mt-2">
                        <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-green-500 rounded-full"></div>
                        <div className="h-1 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      </div>
                      <p className="text-xs text-green-500 mt-1 font-medium">Strong password</p>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-1 transition-all"
                      >
                        {isLoading ? 'Updating...' : 'Update Password'}
                      </button>
                    </div>
                  </form>

                  {/* Security Alert Box */}
                  <div className="mt-10 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-xl flex items-start gap-3">
                    <FaExclamationCircle className="text-yellow-600 dark:text-yellow-500 mt-1" />
                    <div>
                      <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-500">Secure Your Account</h4>
                      <p className="text-xs text-yellow-700 dark:text-yellow-600 mt-1">Two-factor authentication is currently disabled. Enable it to add an extra layer of security to your account.</p>
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;