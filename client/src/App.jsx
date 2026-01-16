import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast'

import Navbar from './components/common/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetails from './pages/CourseDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import RequireAuth from './components/RequireAuth';
import ScrollToTop from './components/ScrollToTop';
import CoursePlayer from './pages/CoursePlayer';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import AddCourse from './pages/AddCourse';
import RequireAdmin from './components/RequireAdmin';
import Certificate from './pages/Certificate';

function App() {
  return (

    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Toaster position='top-center' reverseOrder={false} />
        <div className="pt-16 min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:id" element={<CourseDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/dashboard' element={<RequireAuth> <Dashboard /> </RequireAuth>}></Route>

              <Route
                path="/course/:id/learn"
                element={
                  <RequireAuth>
                    <CoursePlayer />
                  </RequireAuth>
                }
              />

              <Route
                path='/checkout/:id'
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }

              />
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <Profile />
                  </RequireAuth>
                }
              />
              <Route
                path="/admin/add-course"
                element={
                  <RequireAdmin>
                    <AddCourse/>
                </RequireAdmin>
                }
              />

              <Route path="/course/:id/certificate" element={<Certificate />} />
              <Route path='*' element={<NotFound />} />

            </Routes>

          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;