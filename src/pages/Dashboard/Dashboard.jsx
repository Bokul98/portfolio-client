import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthContext';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="min-h-screen mt-28">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-gradient-to-b from-[#040D1C] to-[#02071A] backdrop-blur-xl rounded-lg border border-[#00F050]/20 shadow-xl shadow-[#00F050]/10 px-6 py-10 mb-20">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-[#00F050] to-[#00D040] text-transparent bg-clip-text">Dashboard</h1>
                        
                        {/* User Info Section */}
                        <div className="mb-12">
                            <div className="flex flex-col md:flex-row items-center gap-6 p-8 bg-[#010714]/90 rounded-lg border border-[#00F050]/10 hover:border-[#00F050]/30 transition-all duration-300">
                                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#00F050] shadow-lg shadow-[#00F050]/20">
                                    {user?.photoURL ? (
                                        <img 
                                            src={user.photoURL} 
                                            alt={user.displayName} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#00F050]/20 to-[#00D040]/20 flex items-center justify-center text-[#00F050] text-3xl font-bold">
                                            {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                                        </div>
                                    )}
                                </div>
                                <div className="text-center md:text-left">
                                    <h2 className="text-3xl font-bold text-white mb-3">
                                        {user?.displayName || 'User'}
                                    </h2>
                                    <p className="text-gray-400 text-lg">{user?.email}</p>
                                </div>
                            </div>
                        </div>

                        {/* Dashboard Navigation */}
                        <div className="mb-12">
                            <div className="flex flex-wrap gap-4 p-8 bg-[#010714]/90 rounded-lg border border-[#00F050]/10 hover:border-[#00F050]/30 transition-all duration-300">
                                <Link 
                                    to="/dashboard/add-portfolio"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#00F050] to-[#00D040] text-black font-semibold py-4 px-8 rounded-lg hover:scale-105 transition-all duration-300 shadow-lg shadow-[#00F050]/20 text-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Project
                                </Link>
                                <Link 
                                    to="/dashboard/my-projects"
                                    className="inline-flex items-center gap-2 bg-[#010714] border border-[#00F050]/20 text-[#00F050] font-semibold py-4 px-8 rounded-lg hover:bg-[#00F050]/10 transition-all duration-300 shadow-lg shadow-[#00F050]/20 text-lg"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                    My Projects
                                </Link>
                            </div>
                        </div>

                        {/* Dashboard Content */}
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 