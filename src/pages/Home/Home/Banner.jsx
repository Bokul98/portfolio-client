import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGithub, FaFigma } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiFirebase } from 'react-icons/si';

const techStack = [
    { name: "HTML", Icon: FaHtml5, color: "#E44D26", position: { x: -120, y: 0 } },
    { name: "CSS", Icon: FaCss3Alt, color: "#1572B6", position: { x: -80, y: -100 } },
    { name: "Tailwind", Icon: SiTailwindcss, color: "#38B2AC", position: { x: 0, y: -120 } },
    { name: "React", Icon: FaReact, color: "#61DAFB", position: { x: 80, y: -100 } },
    { name: "Node.js", Icon: FaNodeJs, color: "#339933", position: { x: 120, y: 0 } },
    { name: "MongoDB", Icon: SiMongodb, color: "#47A248", position: { x: 80, y: 100 } },
    { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", position: { x: 0, y: 120 } },
    { name: "GitHub", Icon: FaGithub, color: "#F5F5F5", position: { x: -80, y: 100 } },
    { name: "Figma", Icon: FaFigma, color: "#F24E1E", position: { x: -120, y: 50 } }
];

// Separate TechStack component for better organization
const TechStack = ({ onRef }) => {
    const techIconsRef = useRef(null);
    const glowingDotRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const icons = techIconsRef.current.children;
            
            // Set initial positions and start floating animations
            Array.from(icons).forEach((icon, index) => {
                const { x, y } = techStack[index].position;
                
                // Initial fade in animation
                gsap.from(icon, {
                    opacity: 0,
                    scale: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)"
                });
                
                // Set position
                gsap.set(icon, {
                    x: x,
                    y: y
                });

                // Create floating animation with smaller movement
                gsap.to(icon, {
                    x: x + gsap.utils.random(-10, 10),
                    y: y + gsap.utils.random(-10, 10),
                    rotation: gsap.utils.random(-5, 5),
                    duration: gsap.utils.random(2, 3),
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut",
                    delay: index * 0.1
                });
            });

            // Create timeline for glowing dot with faster movement
            const dotTimeline = gsap.timeline({
                repeat: -1,
                defaults: {
                    duration: 1.5,
                    ease: "power2.inOut"
                }
            });

            // Add animations for each icon position
            techStack.forEach((tech, index) => {
                const { x, y } = tech.position;
                
                dotTimeline.to(glowingDotRef.current, {
                    x: x,
                    y: y,
                    onUpdate: function() {
                        const currentIcon = icons[index];
                        const nextIndex = (index + 1) % icons.length;
                        
                        // Animate current icon with smaller scale
                        gsap.to(currentIcon, {
                            scale: 1.2,
                            opacity: 1,
                            rotation: 0,
                            duration: 0.3,
                            ease: "back.out(2)"
                        });
                        
                        // Reset other icons
                        Array.from(icons).forEach((icon, idx) => {
                            if (idx !== index && idx !== nextIndex) {
                                gsap.to(icon, {
                                    scale: 0.9,
                                    opacity: 0.7,
                                    duration: 0.3
                                });
                            }
                        });
                    }
                });
            });

            // Add hover effect to icons with smaller scale
            Array.from(icons).forEach(icon => {
                icon.addEventListener('mouseenter', () => {
                    gsap.to(icon, {
                        scale: 1.3,
                        opacity: 1,
                        rotation: 0,
                        duration: 0.3,
                        ease: "back.out(2)"
                    });
                });

                icon.addEventListener('mouseleave', () => {
                    gsap.to(icon, {
                        scale: 0.9,
                        opacity: 0.7,
                        duration: 0.3
                    });
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Glowing Dot */}
            <div 
                ref={glowingDotRef}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00F050] shadow-[0_0_10px_3px_rgba(0,240,80,0.4)]"
            ></div>

            {/* Tech Stack Icons */}
            <div ref={techIconsRef} className="absolute inset-0">
                {techStack.map(({ name, Icon, color }) => (
                    <div
                        key={name}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center cursor-pointer"
                    >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#04071B]/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:shadow-[#00F050]/20">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color }} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

const Banner = () => {
    const bannerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate gradient circles
            gsap.to('.gradient-circle-1', {
                y: -50,
                x: 30,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
            gsap.to('.gradient-circle-2', {
                y: 50,
                x: -30,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }, bannerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={bannerRef} className="banner-section mt-5 sm:mt-10 py-10 sm:py-20">
            <div className="container mx-auto px-4">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10 relative overflow-hidden">
                    {/* Gradient Circles */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="gradient-circle-1 absolute top-1/4 -left-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#00F050]/20 rounded-full blur-[80px] sm:blur-[120px]" />
                        <div className="gradient-circle-2 absolute bottom-1/4 -right-20 w-48 sm:w-72 h-48 sm:h-72 bg-[#00F050]/20 rounded-full blur-[80px] sm:blur-[120px]" />
                    </div>

                    {/* Content Container */}
                    <div className="relative z-10 px-4 sm:px-6 py-10 sm:py-16">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
                            {/* Left Content */}
                            <div className="text-left">
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-[#00F050] text-sm sm:text-base font-medium mb-3 sm:mb-4 tracking-wider"
                                >
                                    WELCOME TO MY PORTFOLIO
                                </motion.p>

                                <motion.h1 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6"
                                >
                                    Hi, I'm{' '}
                                    <span className="bg-gradient-to-r from-[#00F050] to-emerald-400 text-transparent bg-clip-text">
                                        Bokul Kumar
                                    </span>
                                </motion.h1>

                                <motion.h2 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    className="text-xl sm:text-2xl md:text-3xl font-semibold text-white/90 mb-4 sm:mb-6"
                                >
                                    I'm a Web Developer
                                </motion.h2>

                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="text-base sm:text-lg text-white/70 mb-8 sm:mb-12 max-w-xl"
                                >
                                    Building intuitive, high-performance web applications
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 }}
                                    className="flex flex-col sm:flex-row gap-4 items-center sm:items-start"
                                >
                                    <a 
                                        href="#contact" 
                                        className="w-full sm:w-auto group relative px-6 sm:px-8 py-3 sm:py-4 bg-[#00F050] text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 text-center"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            Hire Me
                                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#00F050] to-emerald-400 transition-transform duration-300 group-hover:scale-[2] group-hover:rotate-12"></div>
                                    </a>
                                    <a 
                                        href="#portfolio" 
                                        className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-transparent text-white font-semibold rounded-full border-2 border-[#00F050]/50 hover:border-[#00F050] transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/20 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        View Portfolio
                                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </a>
                                </motion.div>
                            </div>

                            {/* Right Content - Image & Tech Stack */}
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative flex justify-center items-center mt-8 lg:mt-0"
                            >
                                <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[280px] md:h-[280px]">
                                    {/* Profile Image */}
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.6 }}
                                        className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-b from-[#00F050]/10 to-transparent"
                                    >
                                        <img 
                                            src="https://bokuldeveloper.com/wp-content/uploads/2024/09/profile-pic-2.png" 
                                            alt="Bokul Kumar" 
                                            className="w-full h-full object-cover rounded-full p-2"
                                        />
                                    </motion.div>
                                    
                                    {/* Tech Stack Component */}
                                    <TechStack />
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Animated Background Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,_#04071B_1px),_linear-gradient(90deg,_transparent_1px,_#04071B_1px)] bg-[size:20px_20px] sm:bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,_black_70%,_transparent_100%)] opacity-30 pointer-events-none"></div>
                </div>
            </div>
        </section>
    );
};

export default Banner;