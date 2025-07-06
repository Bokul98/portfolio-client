import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthContext';
import { FcGoogle } from 'react-icons/fc';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data) => {
        setError('');
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                
                // Update user profile
                updateUserProfile(data.name, '')
                    .then(() => {
                        toast.success('Registration Successful!');
                        navigate('/');
                    })
                    .catch(error => {
                        console.error(error);
                        setError(error.message);
                        toast.error(error.message);
                    });
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
                toast.error(error.message);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                toast.success('Registration Successful!');
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
                toast.error(error.message);
            });
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10">
            <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10 w-full max-w-md p-8">
                <h2 className="text-center text-3xl font-bold text-white mb-8">Create Account</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Full Name</label>
                        <input 
                            type="text" 
                            {...register("name", { 
                                required: "Name is required",
                                minLength: {
                                    value: 3,
                                    message: "Name must be at least 3 characters"
                                }
                            })} 
                            className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300"
                            placeholder="Enter your full name"
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Email</label>
                        <input 
                            type="email" 
                            {...register("email", { 
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })} 
                            className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300"
                            placeholder="Enter your email"
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"}
                                {...register("password", { 
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                                        message: "Password must contain at least one uppercase letter, one special character, and one number"
                                    }
                                })} 
                                className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300"
                                placeholder="Create a password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00F050] transition-colors duration-300"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </div>

                    <div className="space-y-2">
                        <label className="block text-white text-sm font-medium">Confirm Password</label>
                        <div className="relative">
                            <input 
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("confirmPassword", { 
                                    required: "Please confirm your password",
                                    validate: value => value === watch('password') || "Passwords do not match"
                                })} 
                                className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300"
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00F050] transition-colors duration-300"
                            >
                                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-[#00F050] to-emerald-400 text-[#04071B] font-medium py-3 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 transition-all duration-300"
                    >
                        <span className="relative z-10">Create Account</span>
                        <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#00F050]/20"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 text-white/60 bg-[#04071B]/95">Or continue with</span>
                        </div>
                    </div>

                    <button 
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-[#0A0F2B]/70 hover:border-[#00F050]/40 active:scale-95 transition-all duration-300"
                    >
                        <FcGoogle className="text-xl" />
                        <span>Continue with Google</span>
                    </button>

                    <p className="text-center text-white/60">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#00F050] hover:text-emerald-400 transition-colors duration-300">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register; 