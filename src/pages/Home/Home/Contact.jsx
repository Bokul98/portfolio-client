import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await emailjs.send(
                'service_190u46m', // Your EmailJS service ID
                'template_k1tvm1d', // Your EmailJS template ID
                {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    title: "New Contact Message"
                },
                'tO7k9AKkbjWDtBEAz' // Your EmailJS public key
            );

            toast.success('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            toast.error('Failed to send message. Please try again.');
            console.error('Email error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="bg-[#04071B]/95 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        {/* Section Title */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative inline-block">
                                Get In Touch
                                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#00F050] to-emerald-400 rounded-full"></div>
                            </h2>
                            <p className="text-white/60 text-lg mt-8 max-w-2xl mx-auto">
                                Have a question or want to work together? Drop me a message!
                            </p>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="max-w-2xl mx-auto"
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F050]" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Name"
                                        className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#00F050]" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Email"
                                        className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300"
                                    />
                                </div>

                                {/* Message Input */}
                                <div className="relative">
                                    <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-[#00F050]" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your Message"
                                        rows="6"
                                        className="w-full bg-[#0A0F2B]/50 border border-[#00F050]/20 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-white/50 focus:outline-none focus:border-[#00F050] transition-colors duration-300 resize-none"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-gradient-to-r from-[#00F050] to-emerald-400 text-[#04071B] font-medium py-4 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden group hover:shadow-lg hover:shadow-[#00F050]/30 active:scale-95 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact; 