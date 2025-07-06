import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
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

const SortableImage = ({ image, index, onRemove }) => {
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
                        src={image.preview}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-sm">
                            {(image.file.size / 1024 / 1024).toFixed(2)}MB
                        </span>
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
                                        onRemove(index);
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

const AddPortfolio = () => {
    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        defaultValues: {
            technologies: []
        }
    });
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const technologies = [
        "React", "Node.js", "MongoDB", "Express.js", "Firebase",
        "Tailwind CSS", "JavaScript", "TypeScript", "Next.js",
        "HTML5", "CSS3", "Material UI", "Bootstrap", "Redux"
    ];

    const platforms = [
        "Web Application",
        "Mobile Application",
        "Desktop Application",
        "Chrome Extension",
        "WordPress Theme/Plugin",
        "Other"
    ];

    const selectedTechnologies = watch('technologies') || [];

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Validate total file count (existing + new)
        if (images.length + files.length > 5) {
            toast.error('Maximum 5 images allowed');
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

        // Add preview URLs to the images
        const imagesWithPreviews = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        // Append new images to existing ones
        setImages(prevImages => [...prevImages, ...imagesWithPreviews]);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        
        if (active.id !== over.id) {
            setImages((items) => {
                const oldIndex = parseInt(active.id.split('-')[1]);
                const newIndex = parseInt(over.id.split('-')[1]);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
        toast.success('Image removed from selection', {
            icon: '🗑️',
            style: {
                background: '#010714',
                color: '#fff',
                border: '1px solid rgba(0, 240, 80, 0.2)'
            }
        });
    };

    const handleTechnologyChange = (e) => {
        const selectedTech = e.target.value;
        if (selectedTech && !selectedTechnologies.includes(selectedTech)) {
            setValue('technologies', [...selectedTechnologies, selectedTech]);
            e.target.value = '';
        }
    };

    const handleRemoveTechnology = (techToRemove) => {
        setValue('technologies', selectedTechnologies.filter(tech => tech !== techToRemove));
    };

    const onSubmit = async (data) => {
        if (images.length === 0) {
            toast.error('Please upload at least one image');
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading('Adding project...');

        try {
            // Create FormData and append all form fields
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('platform', data.platform);
            formData.append('description', data.description);
            formData.append('githubLink', data.githubLink);
            formData.append('livePreview', data.livePreview);
            
            // Append technologies as JSON string
            formData.append('technologies', JSON.stringify(data.technologies));
            
            // Append each image in the order they appear in the UI
            images.forEach((image) => {
                formData.append('images', image.file);
            });

            // Send the formData to the server
            const response = await fetch('https://server-three-brown.vercel.app/api/portfolio', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                let errorDetail = 'Failed to add project';
                try {
                    const errorData = await response.json();
                    errorDetail = errorData.message || errorData.error || errorDetail;
                } catch {
                    errorDetail = `${response.status}: ${response.statusText || errorDetail}`;
                }
                throw new Error(errorDetail);
            }

            const result = await response.json();
            toast.dismiss(loadingToast);
            toast.success('Project added successfully!', {
                icon: '🚀',
                style: {
                    background: '#010714',
                    color: '#fff',
                    border: '1px solid rgba(0, 240, 80, 0.2)'
                }
            });
            navigate('/dashboard');

        } catch (error) {
            console.error('Error details:', error);
            toast.dismiss(loadingToast);
            toast.error(error.message || 'Failed to add project');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#04071B]">
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-[#0A0F2B]/80 backdrop-blur-xl rounded-3xl border border-[#00F050]/20 shadow-lg shadow-[#00F050]/10 px-6 py-10 mb-20">
                        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">Add New Project</h1>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                                <DndContext
                                    sensors={sensors}
                                    collisionDetection={closestCenter}
                                    onDragEnd={handleDragEnd}
                                >
                                    <SortableContext
                                        items={images.map((_, index) => `image-${index}`)}
                                        strategy={horizontalListSortingStrategy}
                                    >
                                        <div className="flex gap-3 mt-4 flex-wrap">
                                            {images.map((image, index) => (
                                                <SortableImage
                                                    key={`image-${index}`}
                                                    image={image}
                                                    index={index}
                                                    onRemove={handleRemoveImage}
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </DndContext>
                            </div>

                            {/* Project Details Section */}
                            <div className="bg-[#04071B]/50 p-6 rounded-2xl border border-[#00F050]/10 space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-white text-lg mb-3 font-medium">Project Title</label>
                                    <input
                                        type="text"
                                        {...register("title", { required: "Title is required" })}
                                        className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                        placeholder="Enter project title"
                                    />
                                    {errors.title && <p className="text-red-500 mt-2">{errors.title.message}</p>}
                                </div>

                                {/* Platform */}
                                <div>
                                    <label className="block text-white text-lg mb-3 font-medium">Platform</label>
                                    <select
                                        {...register("platform", { required: "Platform is required" })}
                                        className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                    >
                                        <option value="">Select Platform</option>
                                        {platforms.map((platform, index) => (
                                            <option key={index} value={platform}>{platform}</option>
                                        ))}
                                    </select>
                                    {errors.platform && <p className="text-red-500 mt-2">{errors.platform.message}</p>}
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-white text-lg mb-3 font-medium">Description</label>
                                    <textarea
                                        {...register("description", { required: "Description is required" })}
                                        className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30 min-h-[150px] resize-y"
                                        placeholder="Enter project description"
                                    />
                                    {errors.description && <p className="text-red-500 mt-2">{errors.description.message}</p>}
                                </div>
                            </div>

                            {/* Technologies Section */}
                            <div className="bg-[#04071B]/50 p-6 rounded-2xl border border-[#00F050]/10">
                                <label className="block text-white text-lg mb-3 font-medium">Technologies Used</label>
                                <select
                                    onChange={handleTechnologyChange}
                                    className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                >
                                    <option value="">Select Technology</option>
                                    {technologies
                                        .filter(tech => !selectedTechnologies.includes(tech))
                                        .map((tech, index) => (
                                            <option key={index} value={tech}>{tech}</option>
                                        ))
                                    }
                                </select>
                                <div className="flex flex-wrap gap-2 min-h-[50px] p-4 mt-4 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20">
                                    {selectedTechnologies.map((tech, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00F050]/10 text-[#00F050] rounded-full border border-[#00F050]/20 hover:border-[#00F050]/40 transition-colors"
                                        >
                                            {tech}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTechnology(tech)}
                                                className="text-[#00F050] hover:text-white transition-colors w-5 h-5 flex items-center justify-center rounded-full hover:bg-[#00F050]/20"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                {errors.technologies && <p className="text-red-500 mt-2">{errors.technologies.message}</p>}
                            </div>

                            {/* Links Section */}
                            <div className="bg-[#04071B]/50 p-6 rounded-2xl border border-[#00F050]/10 space-y-6">
                                {/* GitHub Link */}
                                <div>
                                    <label className="block text-white text-lg mb-3 font-medium">GitHub Link</label>
                                    <input
                                        type="url"
                                        {...register("githubLink", { required: "GitHub link is required" })}
                                        className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                        placeholder="Enter GitHub repository link"
                                    />
                                    {errors.githubLink && <p className="text-red-500 mt-2">{errors.githubLink.message}</p>}
                                </div>

                                {/* Live Preview Link */}
                                <div>
                                    <label className="block text-white text-lg mb-3 font-medium">Live Preview Link</label>
                                    <input
                                        type="url"
                                        {...register("livePreview", { required: "Live preview link is required" })}
                                        className="w-full px-4 py-3 rounded-lg bg-[#0A0F2B] border border-[#00F050]/20 text-white focus:outline-none focus:border-[#00F050] focus:ring-1 focus:ring-[#00F050]/30"
                                        placeholder="Enter live preview link"
                                    />
                                    {errors.livePreview && <p className="text-red-500 mt-2">{errors.livePreview.message}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#00F050] text-black font-semibold py-4 px-6 rounded-xl hover:bg-[#00D040] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg shadow-[#00F050]/20 mt-6 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                        Adding Project...
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Project
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPortfolio; 