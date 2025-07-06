import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { HiExternalLink } from 'react-icons/hi';
import { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';
import { HiChevronLeft, HiChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';
import axios from 'axios';

const ImageGallery = ({ images, title }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [isSwiping, setIsSwiping] = useState(false);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
        setIsSwiping(true);
    };

    const onTouchMove = (e) => {
        if (touchStart) {
            setTouchEnd(e.targetTouches[0].clientX);
        }
    };

    const onTouchEnd = () => {
        setIsSwiping(false);
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextImage();
        } else if (isRightSwipe) {
            prevImage();
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    if (!images || images.length === 0) {
        return (
            <div className="relative h-[200px] overflow-hidden rounded-t-2xl bg-[#010714]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[#00F050]/20 text-lg font-medium">No Images Available</div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="relative h-[200px] overflow-hidden rounded-t-2xl group touch-pan-x"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <div 
                className={`w-full h-full transition-transform duration-300 ${isSwiping ? 'cursor-grabbing' : ''}`}
                style={{
                    transform: touchEnd && touchStart ? `translateX(${touchEnd - touchStart}px)` : 'translateX(0)',
                }}
            >
                <img 
                    src={images[currentImageIndex]}
                    alt={`${title} Preview`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://placehold.co/600x400/010714/00F050?text=No+Image&font=roboto';
                    }}
                />
            </div>
            
            {images.length > 1 && (
                <>
                    {/* Navigation Buttons - Always visible on mobile */}
                    <div className="absolute inset-0 flex items-center justify-between md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                            onClick={prevImage}
                            className="ml-2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/90 hover:bg-black/70 transition-colors"
                        >
                            <BsChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="mr-2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/90 hover:bg-black/70 transition-colors"
                        >
                            <BsChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Image Counter - Always visible on mobile */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/80">
                        {currentImageIndex + 1} / {images.length}
                    </div>

                    {/* Mobile Swipe Indicator - Only visible on touch devices */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 md:hidden">
                        <div className="text-white/60 text-xs bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                            Swipe to navigate
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => onPageChange(i)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
                        currentPage === i 
                        ? 'bg-[#00F050] text-[#04071B] shadow-lg shadow-[#00F050]/20' 
                        : 'text-white/70 hover:bg-[#00F050]/10 hover:text-[#00F050]'
                    }`}
                >
                    {i}
                </button>
            );
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-center gap-2">
            {/* First Page */}
            <button
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${
                    currentPage === 1 
                    ? 'text-white/30 cursor-not-allowed' 
                    : 'text-white/70 hover:bg-[#00F050]/10 hover:text-[#00F050]'
                }`}
            >
                <HiChevronDoubleLeft className="w-5 h-5" />
            </button>

            {/* Previous Page */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${
                    currentPage === 1 
                    ? 'text-white/30 cursor-not-allowed' 
                    : 'text-white/70 hover:bg-[#00F050]/10 hover:text-[#00F050]'
                }`}
            >
                <HiChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Numbers */}
            {renderPageNumbers()}

            {/* Next Page */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${
                    currentPage === totalPages 
                    ? 'text-white/30 cursor-not-allowed' 
                    : 'text-white/70 hover:bg-[#00F050]/10 hover:text-[#00F050]'
                }`}
            >
                <HiChevronRight className="w-5 h-5" />
            </button>

            {/* Last Page */}
            <button
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-all duration-300 ${
                    currentPage === totalPages 
                    ? 'text-white/30 cursor-not-allowed' 
                    : 'text-white/70 hover:bg-[#00F050]/10 hover:text-[#00F050]'
                }`}
            >
                <HiChevronDoubleRight className="w-5 h-5" />
            </button>

            {/* Page Info */}
            <div className="ml-4 text-white/50 text-sm">
                Page <span className="text-[#00F050] font-medium">{currentPage}</span> of <span className="text-[#00F050] font-medium">{totalPages}</span>
            </div>
        </div>
    );
};

const Projects = ({ currentPage = 1, itemsPerPage = 6, onPageChange = () => {}, isPaginationEnabled = false }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await axios.get('https://server-three-brown.vercel.app/api/portfolio');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    // Calculate pagination
    const totalPages = Math.ceil(projects.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Get displayed projects based on page or home status
    const displayedProjects = isHomePage 
        ? projects.slice(0, 6) 
        : projects.slice(startIndex, endIndex);

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        {/* Section Title */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                {isHomePage ? "Featured Projects" : "All Projects"}
                            </h2>
                            <div className="w-24 h-1 bg-gradient-to-r from-[#00F050] to-emerald-400 mx-auto rounded-full"></div>
                        </motion.div>

                        {loading ? (
                            <div className="min-h-[400px] flex flex-col items-center justify-center">
                                <div className="relative">
                                    {/* Outer spinning ring */}
                                    <div className="w-24 h-24 border-4 border-[#00F050]/20 rounded-full animate-[spin_3s_linear_infinite]"></div>
                                    
                                    {/* Middle spinning ring */}
                                    <div className="absolute top-1 left-1 w-22 h-22 border-4 border-t-[#00F050] border-r-[#00F050]/50 border-b-transparent border-l-transparent rounded-full animate-[spin_2s_linear_infinite]"></div>
                                    
                                    {/* Inner spinning ring */}
                                    <div className="absolute top-3 left-3 w-18 h-18 border-4 border-t-[#00F050]/70 border-r-transparent border-b-[#00F050]/20 border-l-transparent rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
                                    
                                    {/* Center dot */}
                                    <div className="absolute top-[42%] left-[42%] w-4 h-4 bg-[#00F050] rounded-full animate-pulse"></div>
                                </div>
                                <div className="mt-8 space-y-2 text-center">
                                    <p className="text-[#00F050] font-medium text-lg animate-pulse">Loading Projects</p>
                                    <p className="text-gray-400 text-sm">Please wait while we fetch amazing projects...</p>
                                </div>
                            </div>
                        ) : projects.length === 0 ? (
                            <div className="min-h-[400px] flex flex-col items-center justify-center">
                                <div className="w-20 h-20 bg-[#00F050]/10 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00F050]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                    </svg>
                                </div>
                                <p className="text-gray-400 text-lg">No projects found</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {displayedProjects.map((project, index) => (
                                        <motion.div 
                                            key={project._id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="group bg-[#04071B]/50 backdrop-blur-sm rounded-2xl border border-[#00F050]/10 overflow-hidden hover:border-[#00F050]/30 transition-all duration-500 hover:shadow-lg hover:shadow-[#00F050]/10"
                                        >
                                            <ImageGallery images={project.images} title={project.title} />

                                            {/* Content */}
                                            <div className="p-6">
                                                {/* Header */}
                                                <div className="space-y-4 mb-5">
                                                    <div className="space-y-2">
                                                        <h3 className="text-2xl font-bold text-white group-hover:text-[#00F050] transition-colors duration-300 line-clamp-2">
                                                            {project.title}
                                                        </h3>
                                                        <div className="flex items-center gap-2">
                                                            <span className="inline-flex items-center px-3 py-1 bg-[#00F050]/5 text-[#00F050] text-sm rounded-full border border-[#00F050]/20 group-hover:bg-[#00F050]/10 transition-all duration-300">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                </svg>
                                                                {project.platform}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="h-px w-full bg-gradient-to-r from-[#00F050]/20 via-[#00F050]/10 to-transparent"></div>
                                                </div>

                                                {/* Description */}
                                                <p className="text-white/60 mb-6 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
                                                    {project.description}
                                                </p>

                                                {/* Technologies */}
                                                <div className="mb-6 space-y-3">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-white/90 font-semibold text-sm">Technologies</h4>
                                                        <div className="h-px flex-grow bg-gradient-to-r from-[#00F050]/20 to-transparent"></div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map((tech, idx) => (
                                                            <span 
                                                                key={idx}
                                                                className="px-3 py-1 bg-[#00F050]/5 text-[#00F050]/90 text-xs font-medium rounded-full border border-[#00F050]/20 hover:bg-[#00F050]/10 transition-all duration-300 hover:scale-105"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-wrap gap-3 pt-4 border-t border-[#00F050]/10">
                                                    <a 
                                                        href={project.githubLink} 
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-[#00F050]/10 hover:bg-[#00F050]/20 text-[#00F050] rounded-full border border-[#00F050]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/10 text-sm font-medium hover:scale-105"
                                                    >
                                                        <FaGithub className="w-4 h-4" />
                                                        Source Code
                                                    </a>
                                                    <a 
                                                        href={project.livePreview}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 px-4 py-2 bg-[#00F050] text-[#04071B] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/30 group text-sm font-medium hover:scale-105"
                                                    >
                                                        <HiExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                        Live Preview
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Pagination or View More Button */}
                                {isHomePage ? (
                                    projects.length > 6 && (
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                            className="mt-12 text-center"
                                        >
                                            <Link 
                                                to="/portfolio"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#00F050]/10 hover:bg-[#00F050]/20 text-[#00F050] rounded-full border border-[#00F050]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/10 text-lg font-medium group"
                                            >
                                                View All Projects
                                                <svg 
                                                    xmlns="http://www.w3.org/2000/svg" 
                                                    className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </Link>
                                        </motion.div>
                                    )
                                ) : isPaginationEnabled && totalPages > 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="mt-12"
                                    >
                                        <Pagination 
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            onPageChange={onPageChange}
                                        />
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects; 