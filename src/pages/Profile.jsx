import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../providers/AuthContext';
import { toast } from 'react-hot-toast';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.displayName || '',
            photoURL: user?.photoURL || ''
        }
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await updateUserProfile(data.name, data.photoURL);
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error('Error updating profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-24">
            <div className="max-w-2xl mx-auto">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10 p-8">
                    <h2 className="text-3xl font-bold text-white mb-8">Profile Settings</h2>

                    <div className="flex items-center gap-6 mb-8">
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                alt={user.displayName}
                                className="w-24 h-24 rounded-full border-4 border-[#00F050] object-cover"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#00F050] to-emerald-400 flex items-center justify-center text-[#04071B] font-bold text-4xl">
                                {user?.displayName?.charAt(0) || user?.email?.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h3 className="text-xl font-semibold text-white">{user?.displayName || 'User'}</h3>
                            <p className="text-white/60">{user?.email}</p>
                        </div>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-white text-sm font-medium">Display Name</label>
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
                                    placeholder="Enter your display name"
                                />
                                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-white text-sm font-medium">Profile Photo URL</label>
                                <input 
                                    type="url" 
                                    {...register("photoURL")} 
                                    className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-3 px-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300"
                                    placeholder="Enter photo URL (optional)"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-[#00F050] to-emerald-400 text-[#04071B] font-medium py-3 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10">Save Changes</span>
                                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </button>
                                <button 
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="flex-1 text-[#00F050] border-2 border-[#00F050] font-medium py-3 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group hover:text-[#04071B] hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 transition-all duration-300"
                                >
                                    <span className="relative z-10">Cancel</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#00F050] to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </button>
                            </div>
                        </form>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="w-full text-[#00F050] border-2 border-[#00F050] font-medium py-3 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group hover:text-[#04071B] hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 transition-all duration-300"
                        >
                            <span className="relative z-10">Edit Profile</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00F050] to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile; 