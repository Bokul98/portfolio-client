import { FaReact, FaHtml5, FaCss3Alt, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiFirebase, SiExpress } from 'react-icons/si';

const About = () => {
    return (
        <div className="min-h-screen bg-white mt-28 pb-10">
            <div className="container mx-auto px-4">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">About Me</h1>
                        
                        {/* Personal Info Section */}
                        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-semibold mb-4 text-white">Hi, I'm Bokul</h2>
                                <p className="text-gray-300">
                                    I am a passionate MERN Stack Developer with a strong foundation in web development and a 
                                    business background. My BBA degree combined with technical skills gives me a unique 
                                    perspective in creating business-oriented web solutions.
                                </p>
                                <p className="text-gray-300">
                                    I specialize in building responsive and user-friendly web applications using modern
                                    technologies like React, Node.js, Express, and MongoDB. I'm always eager to learn
                                    new technologies and improve my skills.
                                </p>
                            </div>
                            <div className="flex justify-center">
                                <img 
                                    src="https://bokuldeveloper.com/wp-content/uploads/2024/09/profile-pic-2.png" 
                                    alt="Profile" 
                                    className="rounded-2xl shadow-xl w-80 h-80 object-cover"
                                />
                            </div>
                        </div>

                        {/* Education Section */}
                        <div className="mb-24">
                            <h2 className="text-3xl font-semibold mb-12 text-center text-white">Education</h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="bg-[#04071B]/80 backdrop-blur-sm border border-[#00F050]/10 p-8 rounded-xl shadow-md hover:shadow-lg hover:shadow-[#00F050]/10 transition-all duration-300">
                                    <h3 className="text-xl font-semibold mb-3 text-white">Web Development</h3>
                                    <p className="text-gray-300">Programming Hero</p>
                                    <p className="text-gray-400">2022</p>
                                    <p className="text-gray-300 mt-3">
                                        Complete Web Development Course with MERN Stack
                                    </p>
                                </div>
                                <div className="bg-[#04071B]/80 backdrop-blur-sm border border-[#00F050]/10 p-8 rounded-xl shadow-md hover:shadow-lg hover:shadow-[#00F050]/10 transition-all duration-300">
                                    <h3 className="text-xl font-semibold mb-3 text-white">Bachelor of Business Administration (BBA)</h3>
                                    <p className="text-gray-300">Bangladesh National University</p>
                                    <p className="text-gray-400">2022</p>
                                    <p className="text-gray-300 mt-3">
                                        Business Management and Administration
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Skills Section */}
                        <div className="mb-24">
                            <h2 className="text-3xl font-semibold mb-16 text-center text-white">Technical Skills</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
                                {/* Frontend Skills */}
                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[#61DAFB]/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-[#61DAFB]/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <FaReact className="w-10 h-10 text-[#61DAFB] group-hover:rotate-180 transition-all duration-1000" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">React</span>
                                </div>

                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[#E34F26]/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-[#E34F26]/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <FaHtml5 className="w-10 h-10 text-[#E34F26]" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">HTML5</span>
                                </div>

                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[#1572B6]/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-[#1572B6]/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <FaCss3Alt className="w-10 h-10 text-[#1572B6]" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">CSS3</span>
                                </div>

                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[#38B2AC]/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-[#38B2AC]/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <SiTailwindcss className="w-10 h-10 text-[#38B2AC]" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">Tailwind CSS</span>
                                </div>
                                
                                {/* Backend Skills */}
                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[#339933]/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-[#339933]/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <FaNodeJs className="w-10 h-10 text-[#339933]" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">Node.js</span>
                                </div>

                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[#47A248]/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-[#47A248]/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <SiMongodb className="w-10 h-10 text-[#47A248]" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">MongoDB</span>
                                </div>

                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-[#FFCA28]/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-[#FFCA28]/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <SiFirebase className="w-10 h-10 text-[#FFCA28]" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">Firebase</span>
                                </div>

                                <div className="group flex flex-col items-center">
                                    <div className="w-20 h-20 mb-6 flex items-center justify-center relative">
                                        <div className="absolute inset-0 bg-black/10 rounded-xl transform rotate-6 transition-transform group-hover:rotate-12"></div>
                                        <div className="absolute inset-0 bg-black/10 rounded-xl transform -rotate-6 transition-transform group-hover:-rotate-12"></div>
                                        <div className="relative w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg transform transition-transform group-hover:scale-110">
                                            <SiExpress className="w-10 h-10 text-black dark:text-white" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-lg text-gray-800 dark:text-white">Express.js</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact CTA */}
                        <div className="text-center pb-8">
                            <h2 className="text-3xl font-semibold mb-4 text-white">Let's Work Together</h2>
                            <p className="text-gray-300 mb-8">
                                I'm always open to discussing new projects and opportunities.
                            </p>
                            <a 
                                href="/contact" 
                                className="inline-block bg-gradient-to-r from-[#00F050] to-emerald-400 text-[#04071B] px-8 py-4 rounded-xl font-medium 
                                relative overflow-hidden transition-all duration-500 group hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95"
                            >
                                <span className="relative z-10">Contact Me</span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About; 