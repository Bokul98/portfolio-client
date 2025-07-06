import { NavLink } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { toast } from 'react-hot-toast';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { user, logOut } = useContext(AuthContext);
    const profileRef = useRef(null);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logOut()
            .then(() => {
                toast.success('Logged out successfully!');
            })
            .catch(error => {
                console.error(error);
                toast.error('Error logging out');
            });
    };

    return (
        <div className="w-full fixed top-0 left-0 z-50">
            <div className="container mx-auto px-4 py-2">
                <div className="bg-gradient-to-r from-[#04071B]/95 via-[#060a24]/95 to-[#04071B]/95 backdrop-blur-xl rounded-full relative
                    before:absolute before:inset-0 before:rounded-full before:border-2 before:border-[#00F050]/30
                    after:absolute after:inset-0 after:rounded-full after:border-2 after:border-[#00F050] after:animate-[border-pulse_2s_ease-in-out_infinite]">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Logo */}
                            <NavLink to="/" className="text-2xl font-bold relative group z-10">
                                <span className="bg-gradient-to-r from-white to-white/90 text-transparent bg-clip-text transition-all duration-300 group-hover:from-[#00F050] group-hover:to-emerald-400">Bokul</span>
                                <span className="bg-gradient-to-r from-[#00F050] to-emerald-400 text-transparent bg-clip-text">DEV</span>
                            </NavLink>

                            {/* Navigation Links - Centered */}
                            <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2 z-10">
                                <NavLink 
                                    to="/about"
                                    className={({ isActive }) =>
                                        `text-white/90 hover:text-[#00F050] transition-all duration-300 ${
                                            isActive ? 'font-semibold text-[#00F050] after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-100' : 'font-medium after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                                        }`
                                    }
                                >
                                    About
                                </NavLink>
                                <NavLink 
                                    to="/portfolio"
                                    className={({ isActive }) =>
                                        `text-white/90 hover:text-[#00F050] transition-all duration-300 ${
                                            isActive ? 'font-semibold text-[#00F050] after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-100' : 'font-medium after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                                        }`
                                    }
                                >
                                    Portfolio
                                </NavLink>
                                <NavLink 
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `text-white/90 hover:text-[#00F050] transition-all duration-300 ${
                                            isActive ? 'font-semibold text-[#00F050] after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-100' : 'font-medium after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                                        }`
                                    }
                                >
                                    Contact
                                </NavLink>
                                <NavLink 
                                    to="/chatbot"
                                    className={({ isActive }) =>
                                        `text-white/90 hover:text-[#00F050] transition-all duration-300 ${
                                            isActive ? 'font-semibold text-[#00F050] after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-100' : 'font-medium after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                                        }`
                                    }
                                >
                                    ChatBot
                                </NavLink>
                                {user && (
                                    <NavLink 
                                        to="/dashboard"
                                        className={({ isActive }) =>
                                            `text-white/90 hover:text-[#00F050] transition-all duration-300 ${
                                                isActive ? 'font-semibold text-[#00F050] after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-100' : 'font-medium after:content-[""] after:block after:w-full after:h-0.5 after:bg-gradient-to-r after:from-[#00F050] after:to-emerald-400 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300'
                                            }`
                                        }
                                    >
                                        Dashboard
                                    </NavLink>
                                )}
                            </nav>

                            <div className="flex items-center gap-4 z-10">
                                {/* Resume Button */}
                                <a 
                                    href="https://drive.google.com/file/d/10YFUHHFN8zG7GDN_JKZhBpuLQjog9GB5/view" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#04071B] px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F050] to-emerald-400 font-medium text-center
                                    relative overflow-hidden group
                                    hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 transition-all duration-300"
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        window.open('https://drive.google.com/file/d/10YFUHHFN8zG7GDN_JKZhBpuLQjog9GB5/view', '_blank', 'noopener,noreferrer');
                                    }}
                                >
                                    <span className="relative z-10">Resume</span>
                                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </a>

                                {/* Profile/Login Button */}
                                {user ? (
                                    <div className="relative" ref={profileRef}>
                                        <button
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className="flex items-center gap-2 focus:outline-none"
                                        >
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="w-10 h-10 rounded-full border-2 border-[#00F050] object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00F050] to-emerald-400 flex items-center justify-center text-[#04071B] font-semibold text-lg">
                                                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                                                </div>
                                            )}
                                        </button>

                                        {/* Profile Dropdown */}
                                        {isProfileOpen && (
                                            <div className="absolute right-0 mt-2 w-48 bg-[#04071B]/95 backdrop-blur-xl rounded-2xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10 py-2">
                                                <div className="px-4 py-2 border-b border-[#00F050]/20">
                                                    <p className="text-white font-medium truncate">{user.displayName || 'User'}</p>
                                                    <p className="text-white/60 text-sm truncate">{user.email}</p>
                                                </div>
                                                <NavLink
                                                    to="/profile"
                                                    className="block px-4 py-2 text-white hover:text-[#00F050] hover:bg-white/5 transition-colors duration-300"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    Profile Settings
                                                </NavLink>
                                                <NavLink
                                                    to="/dashboard"
                                                    className="block px-4 py-2 text-white hover:text-[#00F050] hover:bg-white/5 transition-colors duration-300"
                                                    onClick={() => setIsProfileOpen(false)}
                                                >
                                                    Dashboard
                                                </NavLink>
                                                <button
                                                    onClick={() => {
                                                        handleLogout();
                                                        setIsProfileOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2 text-white hover:text-[#00F050] hover:bg-white/5 transition-colors duration-300"
                                                >
                                                    Logout
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : null}

                                {/* Mobile Menu Button */}
                                <button 
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    className="md:hidden text-white focus:outline-none hover:text-[#00F050] transition-colors duration-300"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <div className="mt-2 p-4 bg-gradient-to-b from-[#04071B]/95 to-[#060a24]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10">
                        <nav className="flex flex-col gap-4">
                            <NavLink 
                                to="/about"
                                className={({ isActive }) =>
                                    `text-white/90 hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg ${
                                        isActive ? 'bg-gradient-to-r from-[#00F050]/10 to-emerald-400/10 font-semibold text-[#00F050]' : 'font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About
                            </NavLink>
                            <NavLink 
                                to="/portfolio"
                                className={({ isActive }) =>
                                    `text-white/90 hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg ${
                                        isActive ? 'bg-gradient-to-r from-[#00F050]/10 to-emerald-400/10 font-semibold text-[#00F050]' : 'font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Portfolio
                            </NavLink>
                            <NavLink 
                                to="/contact"
                                className={({ isActive }) =>
                                    `text-white/90 hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg ${
                                        isActive ? 'bg-gradient-to-r from-[#00F050]/10 to-emerald-400/10 font-semibold text-[#00F050]' : 'font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </NavLink>
                            <NavLink 
                                to="/chatbot"
                                className={({ isActive }) =>
                                    `text-white/90 hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg ${
                                        isActive ? 'bg-gradient-to-r from-[#00F050]/10 to-emerald-400/10 font-semibold text-[#00F050]' : 'font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5'
                                    }`
                                }
                                onClick={() => setIsMenuOpen(false)}
                            >
                                ChatBot
                            </NavLink>
                            {user && (
                                <NavLink 
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `text-white/90 hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg ${
                                            isActive ? 'bg-gradient-to-r from-[#00F050]/10 to-emerald-400/10 font-semibold text-[#00F050]' : 'font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5'
                                        }`
                                    }
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Dashboard
                                </NavLink>
                            )}
                            <a 
                                href="https://drive.google.com/file/d/10YFUHHFN8zG7GDN_JKZhBpuLQjog9GB5/view" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#04071B] px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F050] to-emerald-400 font-medium text-center
                                relative overflow-hidden group
                                hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 transition-all duration-300"
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    window.open('https://drive.google.com/file/d/10YFUHHFN8zG7GDN_JKZhBpuLQjog9GB5/view', '_blank', 'noopener,noreferrer');
                                }}
                            >
                                <span className="relative z-10">Resume</span>
                                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                            </a>

                            {/* Mobile Profile/Login */}
                            {user ? (
                                <>
                                    <div className="px-4 py-2 border-t border-[#00F050]/20">
                                        <div className="flex items-center gap-3">
                                            {user.photoURL ? (
                                                <img
                                                    src={user.photoURL}
                                                    alt={user.displayName}
                                                    className="w-10 h-10 rounded-full border-2 border-[#00F050] object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00F050] to-emerald-400 flex items-center justify-center text-[#04071B] font-semibold text-lg">
                                                    {user.displayName?.charAt(0) || user.email?.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-white font-medium truncate">{user.displayName || 'User'}</p>
                                                <p className="text-white/60 text-sm truncate">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <NavLink
                                        to="/profile"
                                        className="text-white hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Profile Settings
                                    </NavLink>
                                    <NavLink
                                        to="/dashboard"
                                        className="text-white hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Dashboard
                                    </NavLink>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left text-white hover:text-[#00F050] transition-all duration-300 px-4 py-2 rounded-lg font-medium hover:bg-gradient-to-r hover:from-[#00F050]/5 hover:to-emerald-400/5"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : null}
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;