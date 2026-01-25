import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import FluidBackground from './components/FluidBackground';
import Home from './pages/Home';
import ProjectsBlog from './pages/ProjectsBlog';
import ProjectDetails from './pages/ProjectDetails';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0E0E10] selection:bg-accent/30 selection:text-text-primary overflow-x-hidden">
        <FluidBackground />
        <Header />
        <main className="relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsBlog />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
