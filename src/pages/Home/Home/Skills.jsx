import { useState } from 'react';
import { FaCode, FaLayerGroup, FaDatabase, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiFirebase, SiGit, SiGithub, SiVercel, SiNetlify, SiFigma } from 'react-icons/si';

const categories = [
    {
        id: 'frontend',
        name: 'Frontend',
        icon: FaCode,
        skills: [
            { name: 'HTML5', icon: FaHtml5, color: '#E34F26', level: 95 },
            { name: 'CSS3', icon: FaCss3Alt, color: '#1572B6', level: 92 },
            { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E', level: 90 },
            { name: 'TypeScript', icon: SiTypescript, color: '#3178C6', level: 85 },
            { name: 'React.js', icon: SiReact, color: '#61DAFB', level: 95 },
            { name: 'Next.js', icon: SiNextdotjs, color: '#000000', level: 88 },
            { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#38B2AC', level: 92 }
        ]
    },
    {
        id: 'backend',
        name: 'Backend',
        icon: FaLayerGroup,
        skills: [
            { name: 'Node.js', icon: SiNodedotjs, color: '#339933', level: 88 },
            { name: 'Express.js', icon: SiExpress, color: '#000000', level: 85 },
            { name: 'MongoDB', icon: SiMongodb, color: '#47A248', level: 90 },
            { name: 'Firebase', icon: SiFirebase, color: '#FFCA28', level: 92 }
        ]
    },
    {
        id: 'tools',
        name: 'Tools & Others',
        icon: FaDatabase,
        skills: [
            { name: 'Git', icon: SiGit, color: '#F05032', level: 88 },
            { name: 'GitHub', icon: SiGithub, color: '#181717', level: 90 },
            { name: 'Vercel', icon: SiVercel, color: '#000000', level: 85 },
            { name: 'Netlify', icon: SiNetlify, color: '#00C7B7', level: 85 },
            { name: 'Figma', icon: SiFigma, color: '#F24E1E', level: 82 }
        ]
    }
];

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('frontend');
    const [hoveredSkill, setHoveredSkill] = useState(null);

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        {/* Section Title */}
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative inline-block">
                                Technical Skills
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#00F050] to-emerald-400 rounded-full"></div>
                            </h2>
                            <p className="text-white/60 text-lg mt-8">
                                My expertise across various technologies and tools
                            </p>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex flex-wrap justify-center gap-4 mb-16">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                                        activeCategory === category.id
                                            ? 'bg-[#00F050] text-[#04071B] shadow-lg shadow-[#00F050]/20'
                                            : 'bg-[#0A0F2B]/70 text-white/70 border border-white/5 hover:border-[#00F050]/30 hover:bg-[#0A0F2B]'
                                    }`}
                                >
                                    <category.icon className="w-4 h-4" />
                                    {category.name}
                                </button>
                            ))}
                        </div>

                        {/* Skills Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.find(c => c.id === activeCategory)?.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="group relative"
                                    onMouseEnter={() => setHoveredSkill(skill.name)}
                                    onMouseLeave={() => setHoveredSkill(null)}
                                >
                                    <div className="relative bg-[#0A0F2B]/50 backdrop-blur-sm rounded-2xl border border-white/5 p-6 transition-all duration-300 group-hover:border-[#00F050]/30 group-hover:shadow-lg group-hover:shadow-[#00F050]/5">
                                        {/* Skill Header */}
                                        <div className="flex items-center gap-4 mb-4">
                                            <div className="p-3 rounded-xl bg-[#04071B]/50 border border-white/5 group-hover:border-[#00F050]/20 transition-colors duration-300">
                                                <skill.icon 
                                                    className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
                                                    style={{ color: skill.color }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-semibold group-hover:text-[#00F050] transition-colors duration-300">
                                                    {skill.name}
                                                </h3>
                                                <div className="text-white/40 text-sm">Proficiency: {skill.level}%</div>
                                            </div>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="h-1.5 bg-[#04071B]/50 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-[#00F050] to-emerald-400 transition-all duration-500 ease-out"
                                                style={{ 
                                                    width: hoveredSkill === skill.name ? `${skill.level}%` : '0%',
                                                }}
                                            />
                                        </div>

                                        {/* Glow Effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#00F050]/0 via-[#00F050]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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

export default Skills; 