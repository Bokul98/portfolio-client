import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    horizontalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableImageItem = ({ image, index, onRemove, isExisting = false }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: `image-${index}` });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    const handleDeleteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowDeleteConfirm(true);
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                className="relative group cursor-move"
            >
                <div 
                    className="w-24 h-24 rounded-xl overflow-hidden border-2 border-[#00F050]/20 group-hover:border-[#00F050]/50 transition-all"
                    {...attributes}
                    {...listeners}
                >
                    <img
                        src={isExisting ? image : URL.createObjectURL(image)}
                        alt={`${isExisting ? 'Existing' : 'New'} preview ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        {!isExisting && (
                            <span className="text-white text-sm">
                                {(image.size / 1024 / 1024).toFixed(2)}MB
                            </span>
                        )}
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleDeleteClick}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors shadow-lg z-10"
                >
                    ×
                </button>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#00F050] text-black px-2 py-0.5 rounded text-xs font-medium">
                    {index === 0 ? 'Main' : `#${index + 1}`}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="bg-[#0A0F2B] border border-[#00F050]/20 rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Delete Image</h3>
                            <p className="text-gray-400 mb-4">Are you sure you want to delete this image?</p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDeleteConfirm(false);
                                    }}
                                    className="px-4 py-2 rounded-lg border border-[#00F050]/20 text-white hover:bg-[#00F050]/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemove(image, isExisting);
                                        setShowDeleteConfirm(false);
                                    }}
                                    className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

const EditProjectModal = ({ show, onClose, project }) => {
    const [formData, setFormData] = useState({
        title: '',
        platform: '',
        description: '',
        technologies: [],
        githubLink: '',
        livePreview: '',
    });
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);

    const platforms = [
        "Web Application",
        "Mobile Application",
        "Desktop Application",
        "Chrome Extension",
        "WordPress Theme/Plugin",
        "Other"
    ];

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                platform: project.platform || '',
                description: project.description || '',
                technologies: project.technologies || [],
                githubLink: project.githubLink || '',
                livePreview: project.livePreview || '',
            });
            setExistingImages(project.images || []);
            setImages([]);
        }
    }, [project]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate file count
        const totalImages = existingImages.length + images.length + files.length;
        if (totalImages > 5) {
            toast.error('Maximum 5 images allowed in total');
            return;
        }

        // Validate file size and type
        const validFiles = files.filter(file => {
            const isValidType = ['image/jpeg', 'image/png', 'image/webp'].includes(file.type);
            const isValidSize = file.size <= 2 * 1024 * 1024; // 2MB limit
            
            if (!isValidType) {
                toast.error(`${file.name} is not a valid image type`);
            }
            if (!isValidSize) {
                toast.error(`${file.name} is too large (max 2MB)`);
            }
            
            return isValidType && isValidSize;
        });

        // Add new images to the existing ones
        setImages(prev => [...prev, ...validFiles]);
        
        // Show success message
        if (validFiles.length > 0) {
            toast.success(`${validFiles.length} image${validFiles.length > 1 ? 's' : ''} added successfully`, {
                icon: '📸',
                style: {
                    background: '#010714',
                    color: '#fff',
                    border: '1px solid rgba(0, 240, 80, 0.2)'
                }
            });
        }
    };

    const removeExistingImage = async (imagePath) => {
        try {
            const response = await fetch(`https://server-three-brown.vercel.app/api/portfolio/${project._id}/images`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ imageUrl: imagePath })
            });

            if (!response.ok) {
                throw new Error('Failed to delete image');
            }

            const updatedProject = await response.json();
            setExistingImages(updatedProject.images);
            toast.success('Image deleted successfully!', {
                icon: '🗑️',
                style: {
                    background: '#010714',
                    color: '#fff',
                    border: '1px solid rgba(0, 240, 80, 0.2)'
                }
            });
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete image');
        }
    };

    const removeNewImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        toast.success('Image removed from selection', {
            icon: '🗑️',
            style: {
                background: '#010714',
                color: '#fff',
                border: '1px solid rgba(0, 240, 80, 0.2)'
            }
        });
    };

    const handleAddTech = (e) => {
        const tech = e.target.value;
        if (tech && !formData.technologies.includes(tech)) {
            setFormData(prev => ({
                ...prev,
                technologies: [...prev.technologies, tech]
            }));
        }
        // Reset select element to default option
        e.target.value = '';
    };

    const handleRemoveTech = (techToRemove) => {
        setFormData(prev => ({
            ...prev,
            technologies: prev.technologies.filter(tech => tech !== techToRemove)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const loadingToast = toast.loading('Updating project...');

        try {
            const formDataToSend = new FormData();
            
            // Append text data
            Object.keys(formData).forEach(key => {
                if (key === 'technologies') {
                    formDataToSend.append(key, JSON.stringify(formData[key]));
                } else {
                    formDataToSend.append(key, formData[key]);
                }
            });

            // Send only the remaining existing images
            formDataToSend.append('existingImages', JSON.stringify(existingImages));
            
            // Append new images only if there are any
            if (images.length > 0) {
                images.forEach(image => {
                    formDataToSend.append('images', image);
                });
            }

            const response = await fetch(`https://server-three-brown.vercel.app/api/portfolio/${project._id}`, {
                method: 'PUT',
                body: formDataToSend
            });

            if (!response.ok) {
                let errorDetail = 'Failed to update project';
                try {
                    const errorData = await response.json();
                    errorDetail = errorData.message || errorData.error || errorDetail;
                } catch {
                    errorDetail = `${response.status}: ${response.statusText || errorDetail}`;
                }
                throw new Error(errorDetail);
            }

            // Get the updated project data from response
            const updatedProject = await response.json();

            toast.dismiss(loadingToast);
            toast.success('Project updated successfully!', {
                icon: '🚀',
                style: {
                    background: '#010714',
                    color: '#fff',
                    border: '1px solid rgba(0, 240, 80, 0.2)'
                }
            });
            onClose(true, updatedProject);
        } catch (error) {
            console.error('Error updating project:', error);
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to update project');
        } finally {
            setLoading(false);
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            const oldIndex = parseInt(active.id.split('-')[1]);
            const newIndex = parseInt(over.id.split('-')[1]);
            
            // Combine existing and new images for reordering
            const allImages = [...existingImages, ...images];
            const reorderedImages = arrayMove(allImages, oldIndex, newIndex);
            
            // Split back into existing and new images
            const newExistingImages = reorderedImages.filter(img => typeof img === 'string');
            const newNewImages = reorderedImages.filter(img => typeof img !== 'string');
            
            setExistingImages(newExistingImages);
            setImages(newNewImages);
        }
    };

    const handleRemoveImage = (image, isExisting) => {
        if (isExisting) {
            removeExistingImage(image);
        } else {
            removeNewImage(images.indexOf(image));
        }
    };

    if (!show) return null;

    const technologies = [
        "React", "Node.js", "MongoDB", "Express.js", "Firebase",
        "Tailwind CSS", "JavaScript", "TypeScript", "Next.js",
        "HTML5", "CSS3", "Material UI", "Bootstrap", "Redux"
    ].filter(tech => !formData.technologies.includes(tech));

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#04071B]/95 rounded-2xl border border-[#00F050]/20 w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-xl">
                {/* Header */}
                <div className="p-6 border-b border-[#00F050]/10 flex items-center justify-between">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00F050] to-[#00D040] text-transparent bg-clip-text">
                        Edit Project
                    </h2>
                    <button 
                        onClick={() => onClose(false)}
                        className="text-white/60 hover:text-white/90 transition-colors"
                    >
                        <IoClose className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Thumbnail Upload */}
                        <div className="bg-[#04071B]/50 p-6 rounded-2xl border border-[#00F050]/10">
                            <label className="block text-white text-lg mb-3 font-medium">Project Images</label>
                            <div className="relative">
                                <input
                                    type="file"
                                    multiple
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00F050] file:text-black hover:file:bg-[#00D040]"
                                />
                                <div className="absolute right-3 top-3 text-gray-400 text-sm">
                                    Max 5 images, 2MB each
                                </div>
                            </div>

                            {/* Image Previews */}
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <SortableContext
                                    items={[...existingImages, ...images].map((_, index) => `image-${index}`)}
                                    strategy={horizontalListSortingStrategy}
                                >
                                    <div className="flex gap-3 mt-4 flex-wrap">
                                        {/* Existing Images */}
                                        {existingImages.map((imagePath, index) => (
                                            <SortableImageItem
                                                key={`existing-${index}`}
                                                image={imagePath}
                                                index={index}
                                                onRemove={handleRemoveImage}
                                                isExisting={true}
                                            />
                                        ))}

                                        {/* New Images */}
                                        {images.map((image, index) => (
                                            <SortableImageItem
                                                key={`new-${index}`}
                                                image={image}
                                                index={existingImages.length + index}
                                                onRemove={handleRemoveImage}
                                                isExisting={false}
                                            />
                                        ))}
                                    </div>
                                </SortableContext>
                            </DndContext>
                        </div>

                        {/* Project Details */}
                        <div className="bg-[#04071B]/50 p-6 rounded-2xl border border-[#00F050]/10 space-y-6">
                            {/* Title */}
                            <div>
                                <label className="block text-white text-lg mb-3 font-medium">Project Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                    placeholder="Enter project title"
                                    required
                                />
                            </div>

                            {/* Platform */}
                            <div>
                                <label className="block text-white text-lg mb-3 font-medium">Platform</label>
                                <select
                                    name="platform"
                                    value={formData.platform}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                    required
                                >
                                    <option value="">Select Platform</option>
                                    {platforms.map((platform, index) => (
                                        <option key={index} value={platform}>{platform}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-white text-lg mb-3 font-medium">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30 min-h-[150px] resize-y"
                                    placeholder="Enter project description"
                                    required
                                />
                            </div>
                        </div>

                        {/* Technologies */}
                        <div className="bg-[#04071B]/50 p-6 rounded-2xl border border-[#00F050]/10">
                            <label className="block text-white text-lg mb-3 font-medium">Technologies Used</label>
                            <select
                                onChange={handleAddTech}
                                className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                            >
                                <option value="">Select Technology</option>
                                {technologies.map((tech, index) => (
                                    <option key={index} value={tech}>{tech}</option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-2 min-h-[50px] p-4 mt-4 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20">
                                {formData.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F050]/10 text-[#00F050] rounded-full border border-[#00F050]/20 hover:border-[#00F050]/40 transition-colors"
                                    >
                                        {tech}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveTech(tech)}
                                            className="text-[#00F050] hover:text-white transition-colors w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#00F050]/20"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Links */}
                        <div className="bg-[#04071B]/50 p-6 rounded-2xl border border-[#00F050]/10 space-y-6">
                            {/* GitHub Link */}
                            <div>
                                <label className="block text-white text-lg mb-3 font-medium">GitHub Link</label>
                                <input
                                    type="url"
                                    name="githubLink"
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                    placeholder="Enter GitHub repository link"
                                    required
                                />
                            </div>

                            {/* Live Preview Link */}
                            <div>
                                <label className="block text-white text-lg mb-3 font-medium">Live Preview Link</label>
                                <input
                                    type="url"
                                    name="livePreview"
                                    value={formData.livePreview}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                    placeholder="Enter live preview link"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => onClose(false)}
                                className="px-6 py-3 border border-[#00F050]/20 text-white/90 rounded-xl hover:bg-[#00F050]/10 transition-colors"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[#00F050] text-black font-semibold py-3 px-6 rounded-xl hover:bg-[#00D040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00F050]/20 flex items-center justify-center gap-2 min-w-[150px]"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        Updating...
                                    </>
                                ) : (
                                    'Update Project'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProjectModal; 