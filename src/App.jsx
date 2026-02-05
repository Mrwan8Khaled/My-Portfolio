import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FluidBackground from './components/FluidBackground';
import BlogPopup from './components/BlogPopup';
import Home from './pages/Home';
import ProjectsBlog from './pages/ProjectsBlog';
import ProjectDetails from './pages/ProjectDetails';
import Dashboard from './pages/Dashboard';
import MyBlog from './pages/MyBlog';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0E0E10] selection:bg-accent/30 selection:text-text-primary overflow-x-hidden">
        <FluidBackground />
        <BlogPopup />
        <Header />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsBlog />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/MyBlog" element={<MyBlog />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
