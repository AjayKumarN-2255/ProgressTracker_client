import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReviewCard({ review, handleShowModal }) {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    const handleAddReport = (e) => {
        e.stopPropagation();
        navigate(`/admin/add-report/${review._id}`);
    };

    const toggleMenu = (e) => {
        e.stopPropagation();
        setMenuOpen(!menuOpen);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        setMenuOpen(false);
        navigate(`/admin/edit-review/${review._id}`);
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setMenuOpen(false);
        handleShowModal(review?.employee?.name, review?.project?.name, review?._id);
    };

    // Close menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Status styles
    const statusColors = {
        assigned: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500', border: 'border-blue-100' },
        completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', border: 'border-emerald-100' },
    };
    const { bg, text, dot, border } = statusColors[review.status] || statusColors.completed;

    // Format month
    const formattedMonth = (() => {
        if (!review.reviewMonth) return '';
        const date = new Date(review.reviewMonth);
        if (isNaN(date)) return review.reviewMonth;
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    })();

    const isCompleted = review.status === 'completed';

    return (
        <div className="relative group bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden w-full">

            {/* Three-dot menu */}
            <div ref={menuRef} className="absolute top-2 left-2 z-50 flex flex-col items-center gap-1">
                <button
                    onClick={toggleMenu}
                    className="p-1 rounded-full hover:bg-gray-100 transition"
                >
                    <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6 10a2 2 0 114 0 2 2 0 01-4 0zm4 0a2 2 0 114 0 2 2 0 01-4 0zm-8 0a2 2 0 114 0 2 2 0 01-4 0z" />
                    </svg>
                </button>

                {menuOpen && (
                    <div className="absolute top-6 left-0 w-32 bg-white border border-gray-200 rounded-md shadow-lg">
                        {/* Only show Edit if not completed */}
                        {!isCompleted && (
                            <button
                                onClick={handleEdit}
                                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                            >
                                Edit
                            </button>
                        )}
                        {/* Always show Delete */}
                        <button
                            onClick={handleDelete}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {/* Accent bar */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${dot}`} />

            <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 sm:p-5 gap-4 sm:gap-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 font-bold flex items-center justify-center text-lg border border-indigo-100">
                        {review.employee.name.charAt(0).toUpperCase()}
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 w-full">
                    {/* Employee */}
                    <div className="lg:col-span-3">
                        <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Employee</span>
                        <p className="text-sm md:text-base font-medium text-gray-900 mt-0.5">{review.employee.name}</p>
                    </div>

                    {/* Project */}
                    <div className="lg:col-span-4">
                        <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Project</span>
                        <p className="text-sm md:text-base font-medium text-gray-900 mt-0.5">{review.project.name}</p>
                    </div>

                    {/* Reviewer */}
                    <div className="lg:col-span-3">
                        <span className="text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wide">Reviewer</span>
                        <p className="text-sm md:text-base text-gray-700 mt-0.5">{review.reviewer.name}</p>
                    </div>

                    {/* Review Month / Period */}
                    <div className="lg:col-span-2 flex justify-start lg:justify-end mt-1 md:mt-0">
                        <div className="flex items-center gap-1 bg-gray-50 border border-gray-100 rounded px-2 py-1 text-xs md:text-sm font-medium text-gray-600">
                            <svg className="w-3 h-3 md:w-4 md:h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formattedMonth}
                        </div>
                    </div>
                </div>

                {/* Actions & Status */}
                <div className="flex flex-col md:items-end justify-between w-full md:w-auto mt-3 md:mt-0 gap-2">
                    {/* Status badge */}
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs md:text-sm font-medium border ${bg} ${text} ${border}`}>
                        <span className={`w-2 h-2 rounded-full ${dot}`}></span>
                        <span className="capitalize">{review.status}</span>
                    </div>

                    {/* Add Report button (hidden if completed) */}
                    {!isCompleted && (
                        <button
                            onClick={handleAddReport}
                            className="flex items-center gap-2 bg-indigo-600 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-indigo-700 hover:shadow active:scale-95 transition-transform"
                        >
                            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add Report
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
