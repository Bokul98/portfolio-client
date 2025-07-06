import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaTrophy, FaMedal, FaAward } from 'react-icons/fa';
import Typewriter from 'typewriter-effect';

gsap.registerPlugin(ScrollTrigger);

const Awards = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean); // Filter out any null values
        if (!cards.length) return; // Guard clause

        const ctx = gsap.context(() => {
            // Initial load animation
            gsap.from(cards, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.2)"
            });

            // Card hover animations
            cards.forEach((card, index) => {
                const trophyElement = card.querySelector('.trophy');
                const cardContent = card.querySelector('.card-content');

                if (trophyElement && cardContent) {
                    // Floating trophy animation
                    gsap.to(trophyElement, {
                        y: -8,
                        duration: 1.5,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                        delay: index * 0.1
                    });

                    // Create hover animation
                    const tl = gsap.timeline({ paused: true });
                    
                    tl.to(cardContent, {
                        scale: 1.02,
                        boxShadow: '0 8px 32px rgba(0, 240, 80, 0.2)',
                        border: '2px solid rgba(0, 240, 80, 0.5)',
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    // Add hover listeners
                    card.addEventListener('mouseenter', () => tl.play());
                    card.addEventListener('mouseleave', () => tl.reverse());
                }
            });
        });

        // Cleanup
        return () => {
            ctx.revert(); // This will clean up all GSAP animations
        };
    }, []);

    const awards = [
        {
            icon: FaTrophy,
            title: "Best MERN Stack Project",
            description: "Awarded for exceptional implementation of MongoDB, Express.js, React, and Node.js",
            year: "2023",
            color: "from-amber-500 to-yellow-500"
        },
        {
            icon: FaMedal,
            title: "Innovation Excellence",
            description: "Recognized for innovative approach in web development solutions",
            year: "2023",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: FaAward,
            title: "Top Performance",
            description: "Achieved highest performance metrics in web application development",
            year: "2022",
            color: "from-purple-500 to-pink-500"
        }
    ];

    return (
        <section ref={sectionRef} className="py-10">
            <div className="container mx-auto px-4">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <div className="text-center mb-16">
                            <h2 className="title inline-block text-4xl md:text-5xl font-bold relative">
                                <span className="absolute -top-8 left-0 right-0 text-base text-[#00F050] tracking-[8px] uppercase mb-2 opacity-80">Portfolio</span>
                                <Typewriter
                                    options={{
                                        strings: [
                                            'Awards & <span class="text-[#00F050]">Recognition</span> 🏆',
                                            'Professional <span class="text-[#00F050]">Achievements</span> 🎯',
                                            'Notable <span class="text-[#00F050]">Milestones</span> ⭐'
                                        ],
                                        autoStart: true,
                                        loop: true,
                                        delay: 50,
                                        deleteSpeed: 30,
                                        cursor: '|',
                                        cursorClassName: 'text-[#00F050] animate-pulse',
                                        wrapperClassName: 'text-white inline-block',
                                        html: true,
                                        pauseFor: 2500
                                    }}
                                />
                                <span className="block h-1.5 w-32 bg-gradient-to-r from-[#00F050]/80 to-transparent mx-auto mt-4"></span>
                            </h2>
                        </div>
                        
                        <div className="cards-container grid md:grid-cols-3 gap-8">
                            {awards.map((award, index) => (
                                <div
                                    key={index}
                                    ref={el => cardsRef.current[index] = el}
                                    className="relative group"
                                >
                                    <div className="card-content bg-[#060a24]/80 backdrop-blur-sm p-8 rounded-2xl 
                                        border-2 border-[#00F050]/20 transition-colors duration-300">
                                        
                                        <div className={`trophy w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${award.color} p-4 
                                            shadow-lg`}>
                                            <award.icon className="w-full h-full text-white" />
                                        </div>
                                        
                                        <h3 className="text-xl font-semibold text-white text-center mb-4">
                                            {award.title}
                                        </h3>
                                        <p className="text-gray-300 text-center mb-4">{award.description}</p>
                                        <p className="text-[#00F050] text-center font-medium">{award.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Awards; 