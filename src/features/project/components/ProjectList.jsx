import React from 'react';
import { Folder, Search, Calendar, Clock, Edit2, Trash2 } from 'lucide-react';
import { formatDateReadable } from '../../../utils/dateFormatter';
import Modal from '../../../components/Modal';
import { useState } from 'react';

function ProjectList({ projects, handleDeleteProject, enableEdit }) {

    const [show, setShow] = useState(null);
    const handleModal = (title, id) => {
        setShow({ success: true, title, id });
    }
    const onDelete = () => {
        handleDeleteProject(show?.id);
        setShow(null);
    }
    const onCancel = () => {
        setShow(null);
    }

    return (
        <>
            <div className="w-full lg:w-5/12 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                {/* Header & Search */}
                <div className="p-5 border-b border-gray-100 bg-white z-10">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            <Folder className="text-indigo-600" size={24} />
                            Your Projects
                        </h2>
                        <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {projects?.length} Total
                        </span>
                    </div>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Scrollable List Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    {projects?.map((project) => (
                        <div
                            key={project._id}
                            className="group p-4 rounded-xl border border-gray-100 bg-white hover:border-indigo-200 hover:shadow-md transition-all cursor-pointer relative overflow-hidden"
                        >
                            {/* Hover Effect Bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Edit/Delete Buttons */}
                            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => enableEdit(project._id)}
                                    className="p-1 rounded-full hover:bg-indigo-100 text-indigo-600"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleModal(project.name, project._id)}
                                    className="p-1 rounded-full hover:bg-red-100 text-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>

                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors">
                                    {project.name}
                                </h3>
                            </div>

                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-gray-400" />
                                    <span>
                                        <span className="font-semibold text-gray-700 me-1">Start:</span> {formatDateReadable(project.from)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Clock size={14} className="text-gray-400" />
                                    <span>
                                        <span className="font-semibold text-gray-700 me-1">End:</span> {formatDateReadable(project.to)}
                                    </span>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            {
                show?.success &&
                <Modal show={show}
                    onDelete={onDelete} onCancel={onCancel} />
            }
        </>
    );
}

export default ProjectList;
