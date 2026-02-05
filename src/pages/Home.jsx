import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ToolsStack from '../components/ToolsStack';
import FeaturedProjects from '../components/FeaturedProjects';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <FeaturedProjects />
            <ToolsStack />
            <Contact />
        </>
    );
};

export default Home;
