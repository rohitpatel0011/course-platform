import React from 'react';
import {
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBookReader,
  FaGithub, FaHeart, FaArrowRight, FaEnvelope, FaShieldAlt, FaFileAlt
} from 'react-icons/fa';
import { SiDiscord } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="relative bg-white dark:bg-gray-950 pt-20 pb-10 border-t border-gray-100 dark:border-gray-900 transition-all duration-500 overflow-hidden">

      {/* Subtle Background Gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-pink-500/5 rounded-full blur-3xl -bottom-20 -right-20"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Brand & Bio */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <FaBookReader className="text-3xl text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-pink-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CoursePlatform
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6 text-sm">
              Empowering developers with industry-relevant skills through expert-led courses and hands-on projects.
            </p>
            <div className="flex gap-4">
              {[<FaTwitter />, <FaGithub />, <FaLinkedin />, <SiDiscord />].map((icon, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-lg">
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Platform</h4>
            <ul className="space-y-4 text-sm">
              {['Home', 'All Courses', 'Dashboard', 'About Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Support</h4>
            <ul className="space-y-4 text-sm">
              {['Help Center', 'Terms of Service', 'Privacy Policy', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-purple-600 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter - Minimalist */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-6">Stay Updated</h4>
            <div className="relative group">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-full py-3 px-5 text-sm outline-none focus:border-purple-500 transition-all"
              />
              <button className="absolute right-2 top-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full hover:shadow-lg transition-all">
                <FaArrowRight className="text-xs" />
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-4 px-2">
              Get the latest course updates and developer news.
            </p>
          </div>

        </div>

        {/* Bottom Bar: Ultra Clean */}
        <div className="pt-8 border-t border-gray-50 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CoursePlatform. Enhanced your Skills.
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            Made with <FaHeart className="text-pink-500 text-[10px]" /> Enginow
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;