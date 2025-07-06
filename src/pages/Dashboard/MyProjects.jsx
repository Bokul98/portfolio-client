import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import EditProjectModal from './EditProjectModal';

const ImageGallery = ({ images, title }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!images || images.length === 0) {
        return (
            <div className="relative h-[200px] overflow-hidden rounded-t-2xl bg-[#010714]">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-[#00F050]/20 text-lg font-medium">No Images Available</div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative h-[200px] overflow-hidden rounded-t-2xl group">
            <img 
                src={images[currentImageIndex]}
                alt={`${title} Preview`}
                className="w-full h-full object-cover transition-transform duration-500"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://placehold.co/600x400/010714/00F050?text=No+Image&font=roboto';
                }}
            />
            
            {images.length > 1 && (
                <>
                    {/* Navigation Buttons */}
                    <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button 
                            onClick={prevImage}
                            className="ml-2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/90 hover:bg-black/70 transition-colors"
                        >
                            <BsChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={nextImage}
                            className="mr-2 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/90 hover:bg-black/70 transition-colors"
                        >
                            <BsChevronRight className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white/80">
                        {currentImageIndex + 1} / {images.length}
                    </div>
                </>
            )}
        </div>
    );
};

const MyProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ show: false, projectId: null });
    const [editModal, setEditModal] = useState({ show: false, project: null });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('https://server-three-brown.vercel.app/api/portfolio');
            if (!response.ok) throw new Error('Failed to fetch projects');
            const data = await response.json();
            setProjects(data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            toast.error('Failed to load projects');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://server-three-brown.vercel.app/api/portfolio/${id}`, {
                method: 'DELETE'
            });
            
            if (!response.ok) throw new Error('Failed to delete project');
            
            setDeleteModal({ show: false, projectId: null });
            toast.success('Project deleted successfully', {
                icon: '🗑️',
                style: {
                    background: '#010714',
                    color: '#fff',
                    border: '1px solid rgba(0, 240, 80, 0.2)'
                }
            });
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            toast.error('Failed to delete project');
        }
    };

    const handleEditModalClose = (updated = false, updatedProject = null) => {
        setEditModal({ show: false, project: null });
        if (updated && updatedProject) {
            // Update the project in the local state instead of refetching
            setProjects(prevProjects => 
                prevProjects.map(project => 
                    project._id === updatedProject._id ? updatedProject : project
                )
            );
        }
    };

    // Delete Confirmation Modal
    const DeleteModal = ({ show, onClose, onConfirm }) => {
        if (!show) return null;

        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-[#010714] border border-[#00F050]/20 rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Delete Project</h3>
                        <p className="text-gray-400 mb-6">Are you sure you want to delete this project? This action cannot be undone.</p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={onClose}
                                className="px-6 py-2 rounded-lg border border-[#00F050]/20 text-white hover:bg-[#00F050]/10 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={onConfirm}
                                className="px-6 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-[#010714]/90 p-8 rounded-lg border border-[#00F050]/10">
            <div className="flex items-center gap-3 mb-8">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#00F050]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-[#00F050] to-[#00D040] text-transparent bg-clip-text">My Projects</h2>
            </div>

            {loading ? (
                <div className="text-center py-8">
                    <div className="w-12 h-12 border-4 border-[#00F050] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-400 mt-4">Loading projects...</p>
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12">
                    <div className="w-20 h-20 bg-[#00F050]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#00F050]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                    </div>
                    <p className="text-gray-400 text-lg mb-4">No projects found</p>
                    <Link 
                        to="/dashboard/add-portfolio"
                        className="inline-flex items-center gap-2 text-[#00F050] hover:text-[#00D040] transition-colors"
                    >
                        Add your first project
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <div 
                            key={project._id}
                            className="bg-[#04071B]/50 backdrop-blur-sm rounded-2xl border border-[#00F050]/10 overflow-hidden hover:border-[#00F050]/30 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/5"
                        >
                            <ImageGallery images={project.images} title={project.title} />

                            <div className="p-6 space-y-5">
                                {/* Header */}
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-bold text-white/90 line-clamp-1 hover:line-clamp-none transition-all duration-300">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1.5 bg-[#00F050]/10 text-[#00F050] text-xs font-medium rounded-full">
                                            {project.platform}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-white/60 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
                                    {project.description}
                                </p>

                                {/* Technologies */}
                                <div className="space-y-3">
                                    <h4 className="text-white/80 font-medium text-sm">Technologies Used</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span 
                                                key={i}
                                                className="px-2.5 py-1 bg-[#00F050]/5 text-[#00F050]/90 text-xs font-medium rounded-full border border-[#00F050]/20 hover:bg-[#00F050]/10 transition-colors duration-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Project Links */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <a 
                                        href={project.githubLink} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-[#00F050]/10 hover:bg-[#00F050]/20 text-[#00F050] rounded-full border border-[#00F050]/20 transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/10 text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                        GitHub
                                    </a>
                                    <a 
                                        href={project.livePreview} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-[#00F050] text-[#04071B] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#00F050]/30 group text-sm font-medium"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Live Preview
                                    </a>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between gap-4 pt-5 mt-5 border-t border-[#00F050]/10">
                                    <button
                                        onClick={() => setEditModal({ show: true, project })}
                                        className="flex items-center gap-2 text-[#00F050] hover:text-[#00D040] transition-colors group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                        <span className="font-medium">Edit Project</span>
                                    </button>
                                    <button
                                        onClick={() => setDeleteModal({ show: true, projectId: project._id })}
                                        className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors group"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        <span className="font-medium">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteModal 
                show={deleteModal.show}
                onClose={() => setDeleteModal({ show: false, projectId: null })}
                onConfirm={() => handleDelete(deleteModal.projectId)}
            />

            {/* Edit Modal */}
            <EditProjectModal
                show={editModal.show}
                onClose={handleEditModalClose}
                project={editModal.project}
            />
        </div>
    );
};

export default MyProjects; 