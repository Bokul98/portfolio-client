import React from 'react';
import Banner from './Banner';
import Projects from './Projects';
import Skills from './Skills';
import Awards from './Awards';
import Contact from './Contact';

const Home = () => {
    return (
        <main className="overflow-x-hidden">
            <Banner />
            <Projects />
            <Skills />
            <Awards />
            <Contact />
        </main>
    );
};

export default Home;