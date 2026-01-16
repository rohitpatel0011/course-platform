import React from "react";
import { Link } from "react-router-dom";
import {
  Code2, Laptop, Zap, ArrowRight, Rocket, Users, Shield,
  Sparkles, Target, Clock, Globe, CheckCircle2, PlayCircle
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white dark:bg-black min-h-screen overflow-hidden relative selection:bg-purple-500/30">

      {/* --- PROFESSIONAL BACKGROUND PATTERN --- */}
      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Subtle Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10">

        {/* --- HERO SECTION --- */}
        <section className="pt-32 pb-20 px-4 text-center">
          <div className="max-w-5xl mx-auto">

            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 border border-purple-500/20 bg-purple-500/5 dark:bg-purple-900/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-xs font-bold tracking-widest text-purple-700 dark:text-purple-300 uppercase">
                The Future of Coding
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 leading-tight">
           Start building your <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient">
               dream career today.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Build production-ready applications with modern technologies.
              From React to Node.js, we provide the roadmap to your dream career.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-5">
              <Link
                to="/courses"
                className="group relative px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2"
              >
                Browse Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/register"
                className="group px-8 py-4 bg-transparent border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-all flex items-center justify-center gap-2"
              >
                <PlayCircle className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 transition-colors" />
                Start Free Trial
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex items-center justify-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-sm font-semibold text-gray-400">TRUSTED BY DEVELOPERS FROM</span>
              {/* Simple text representation for professional look */}
              <div className="flex gap-6 text-gray-500 font-bold">
                <span>GOOGLE</span>
                <span>META</span>
                <span>AMAZON</span>
                <span>NETFLIX</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Different</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                We don't just teach code; we teach engineering.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

              {/* Feature 1 */}
              <div className="p-8 rounded-3xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-purple-500/30 transition-all hover:shadow-2xl hover:-translate-y-1 group">
                <div className="mb-6 inline-block">
                  <Laptop className="w-12 h-12 text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Project-Based Learning</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  Build real applications like e-commerce sites, social networks, and SaaS platforms. No boring theory.
                </p>
                <ul className="space-y-2">
                  {['Portfolio Ready', 'Real Scenarios'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-3xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 transition-all hover:shadow-2xl hover:-translate-y-1 group">
                <div className="mb-6 inline-block">
                  <Code2 className="w-12 h-12 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Clean Architecture</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  Write scalable, maintainable code. Master design patterns, SOLID principles, and system design.
                </p>
                <ul className="space-y-2">
                  {['Scalable Code', 'Best Practices'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-3xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-pink-500/30 transition-all hover:shadow-2xl hover:-translate-y-1 group">
                <div className="mb-6 inline-block">
                  <Zap className="w-12 h-12 text-pink-600 dark:text-pink-400 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">High Performance</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  Learn optimization, caching, and security. Build apps that are fast and secure from day one.
                </p>
                <ul className="space-y-2">
                  {['Fast Loading', 'Secure'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>

        {/* --- STATS SECTION (Minimalist) --- */}
        <section className="py-20 border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { num: "10K+", label: "Students", icon: <Users className="w-5 h-5" /> },
                { num: "500+", label: "Projects", icon: <Target className="w-5 h-5" /> },
                { num: "50+", label: "Instructors", icon: <Globe className="w-5 h-5" /> },
                { num: "4.9", label: "Rating", icon: <Sparkles className="w-5 h-5" /> },
              ].map((stat, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2 opacity-80">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">{stat.num}</h3>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-28 px-4 relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-500/5 pointer-events-none"></div>
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8">
                Master Full Stack  <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                development today
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-10">
              Join 10,000+ developers shipping code to production.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-full hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.6)] transition-all transform hover:scale-105"
            >
              <Rocket className="w-6 h-6" />
              Get Started for Free
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;