import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-[#04071B] relative">
            {/* Back to Home Button */}
            <Link 
                to="/" 
                className="absolute top-8 left-8 text-white/60 hover:text-[#00F050] transition-colors duration-300 flex items-center gap-2"
            >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
            </Link>

            <div className="container mx-auto px-4">
                <div className="min-h-screen flex items-center justify-center">
                    {/* Auth Form Container */}
                    <div className="w-full max-w-md">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-[url('/images/auth-bg.jpg')] bg-cover bg-center opacity-5 pointer-events-none" />
        </div>
    );
};

export default AuthLayout;