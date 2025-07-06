import { useState } from "react";
import Projects from "../Home/Home/Projects";
import { motion } from "framer-motion";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Portfolio = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="min-h-screen pt-24">
            {/* Full Width Gradient Header */}
            <div className="container mx-auto max-w-11/12 px-8 py-8 bg-[#04071B] rounded-[30px] relative">
                {/* Animated Border Container */}
                <div className="absolute inset-0 rounded-[30px]">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F050]/50 to-transparent animate-border-flow-x"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F050]/50 to-transparent animate-border-flow-x-reverse"></div>
                    <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#00F050]/50 to-transparent animate-border-flow-y"></div>
                    <div className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#00F050]/50 to-transparent animate-border-flow-y-reverse"></div>
                </div>

                {/* Main Content Container */}
                <div className="relative">
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#04071B] via-[#00F050]/5 to-[#04071B] animate-gradient-x">
                        <div className="absolute inset-0 bg-[url('/grid.png')] opacity-20"></div>
                    </div>

                    {/* Animated Dots */}
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-5 left-10 w-2 h-2 bg-[#00F050]/30 rounded-full animate-ping"></div>
                        <div className="absolute bottom-5 right-10 w-2 h-2 bg-[#00F050]/30 rounded-full animate-ping delay-300"></div>
                        <div className="absolute top-1/2 left-5 w-2 h-2 bg-[#00F050]/30 rounded-full animate-ping delay-700"></div>
                        <div className="absolute top-1/2 right-5 w-2 h-2 bg-[#00F050]/30 rounded-full animate-ping delay-500"></div>
                    </div>

                    {/* Gradient Orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-10 left-1/4 w-40 h-40 bg-[#00F050]/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute -bottom-10 right-1/4 w-40 h-40 bg-[#00F050]/10 rounded-full blur-3xl animate-pulse delay-300"></div>
                    </div>

                    {/* Content */}
                    <div className="relative container mx-auto px-4">
                        <div className="h-[200px] flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center z-10 bg-[#04071B]/50 rounded-[30px] px-12 py-6 backdrop-blur-sm relative"
                            >
                                {/* Animated Border Container */}
                                <div className="absolute inset-0 rounded-[30px] overflow-hidden">
                                    {/* Top Border */}
                                    <div className="absolute top-0 -left-full w-[200%] h-[2px]">
                                        <div className="absolute w-1/2 h-full bg-gradient-to-r from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-x"></div>
                                        <div className="absolute left-1/2 w-1/2 h-full bg-gradient-to-r from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-x"></div>
                                    </div>
                                    {/* Bottom Border */}
                                    <div className="absolute bottom-0 -left-full w-[200%] h-[2px]">
                                        <div className="absolute w-1/2 h-full bg-gradient-to-r from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-x-reverse"></div>
                                        <div className="absolute left-1/2 w-1/2 h-full bg-gradient-to-r from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-x-reverse"></div>
                                    </div>
                                    {/* Left Border */}
                                    <div className="absolute left-0 -top-full h-[200%] w-[2px]">
                                        <div className="absolute h-1/2 w-full bg-gradient-to-b from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-y"></div>
                                        <div className="absolute top-1/2 h-1/2 w-full bg-gradient-to-b from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-y"></div>
                                    </div>
                                    {/* Right Border */}
                                    <div className="absolute right-0 -top-full h-[200%] w-[2px]">
                                        <div className="absolute h-1/2 w-full bg-gradient-to-b from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-y-reverse"></div>
                                        <div className="absolute top-1/2 h-1/2 w-full bg-gradient-to-b from-[#00F050]/50 via-[#4F46E5]/50 via-[#EC4899]/50 to-[#00F050]/50 animate-border-flow-y-reverse"></div>
                                    </div>
                                </div>
                                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-[#00F050] via-white to-[#00F050] bg-clip-text text-transparent animate-gradient-text">
                                    Portfolio Gallery
                                </h1>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Section */}
            <div className="container mx-auto px-4">
                <Projects 
                    currentPage={currentPage} 
                    itemsPerPage={itemsPerPage} 
                    onPageChange={handlePageChange}
                    isPaginationEnabled={true}
                />
            </div>
        </div>
    );
};

export default Portfolio; 