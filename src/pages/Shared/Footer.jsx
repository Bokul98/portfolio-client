import React from 'react';
import { Link } from 'react-router-dom';
import { FaLinkedinIn, FaGithub, FaFacebookF } from 'react-icons/fa';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-12 font-poppins">
            <div className="container mx-auto px-4">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        {/* Main Footer Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Brand Section */}
                            <div className="space-y-4">
                                <Link to="/" className="text-2xl font-bold text-white">
                                    Bokul<span className="text-[#00F050]">DEV</span>
                                </Link>
                                <p className="text-white/70">Passionate Web Developer</p>
                                <p className="text-sm text-white/60">5 years of experience crafting modern web solutions</p>
                                <div className="flex gap-4 pt-4">
                                    <a 
                                        href="https://www.linkedin.com/in/bokul-kumar-badyakar-677369191/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-[#00F050]/20 flex items-center justify-center text-white/70 hover:text-[#00F050] hover:border-[#00F050] hover:scale-110 transition-all duration-300"
                                    >
                                        <FaLinkedinIn />
                                    </a>
                                    <a 
                                        href="https://github.com/Bokul98"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-[#00F050]/20 flex items-center justify-center text-white/70 hover:text-[#00F050] hover:border-[#00F050] hover:scale-110 transition-all duration-300"
                                    >
                                        <FaGithub />
                                    </a>
                                    <a 
                                        href="https://www.facebook.com/bokuldeveloper70/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full bg-white/5 border border-[#00F050]/20 flex items-center justify-center text-white/70 hover:text-[#00F050] hover:border-[#00F050] hover:scale-110 transition-all duration-300"
                                    >
                                        <FaFacebookF />
                                    </a>
                                </div>
                            </div>

                            {/* Quick Links */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Quick Links</h3>
                                <div className="w-12 h-0.5 bg-[#00F050]/30"></div>
                                <nav className="flex flex-col gap-3">
                                    <Link 
                                        to="/" 
                                        className="text-white/70 hover:text-[#00F050] transition-colors duration-300 w-fit after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#00F050] after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        Home
                                    </Link>
                                    <Link 
                                        to="/about" 
                                        className="text-white/70 hover:text-[#00F050] transition-colors duration-300 w-fit after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#00F050] after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        About
                                    </Link>
                                    <Link 
                                        to="/portfolio" 
                                        className="text-white/70 hover:text-[#00F050] transition-colors duration-300 w-fit after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#00F050] after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        Portfolio
                                    </Link>
                                    <Link 
                                        to="/contact" 
                                        className="text-white/70 hover:text-[#00F050] transition-colors duration-300 w-fit after:content-[''] after:block after:w-0 after:h-0.5 after:bg-[#00F050] after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        Contact
                                    </Link>
                                </nav>
                            </div>

                            {/* Tech Stack */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Tech Stack</h3>
                                <div className="w-12 h-0.5 bg-[#00F050]/30"></div>
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <span className="text-white/70">HTML</span>
                                    <span className="text-white/70">CSS</span>
                                    <span className="text-white/70">Tailwind</span>
                                    <span className="text-white/70">React</span>
                                    <span className="text-white/70">Node.js</span>
                                    <span className="text-white/70">MongoDB</span>
                                    <span className="text-white/70">Firebase</span>
                                    <span className="text-white/70">AWS</span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-semibold text-white">Contact Info</h3>
                                <div className="w-12 h-0.5 bg-[#00F050]/30"></div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-white/70">
                                        <HiLocationMarker className="text-[#00F050]" />
                                        <span className="text-sm">Natore Sadar, Rajshahi, Bangladesh - 6400</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/70">
                                        <HiPhone className="text-[#00F050]" />
                                        <a 
                                            href="tel:+8801796702470" 
                                            className="text-sm hover:text-[#00F050] transition-colors duration-300"
                                        >
                                            +880 1796 702470
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/70">
                                        <HiMail className="text-[#00F050]" />
                                        <a 
                                            href="mailto:bokulsorkar96@gmail.com" 
                                            className="text-sm hover:text-[#00F050] transition-colors duration-300"
                                        >
                                            bokulsorkar96@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00F050]/20 to-transparent my-8"></div>

                        {/* Copyright */}
                        <div className="text-center text-white/60 text-sm">
                            © {currentYear} Bokul Kumar. All Rights Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;