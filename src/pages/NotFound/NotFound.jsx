import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4">
            <div className="text-center space-y-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-9xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-transparent bg-clip-text"
                >
                    404
                </motion.div>
                
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                >
                    <h2 className="text-3xl font-semibold">Page Not Found</h2>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Oops! The page you're looking for seems to have vanished into thin air. Let's get you back on track.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <Link 
                        to="/"
                        className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full font-semibold text-white transform hover:scale-105 transition-transform duration-200 hover:shadow-lg"
                    >
                        Back to Home
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                >
                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Your Portfolio. All rights reserved.
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound; 