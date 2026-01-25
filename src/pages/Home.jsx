import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import ToolsStack from '../components/ToolsStack';
import FeaturedProjects from '../components/FeaturedProjects';

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <FeaturedProjects />
            <ToolsStack />
        </>
    );
};

export default Home;
