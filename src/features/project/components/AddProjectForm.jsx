import React from 'react';
import { PlusCircle } from 'lucide-react';
import { pNameValidation, fromDateValidation, toDateValidation } from '../../../utils/validations';
import { useForm } from 'react-hook-form';

function AddProjectForm({ handleAddProject }) {

    const { register, reset, handleSubmit, getValues, formState: { errors } } = useForm();
    const handleCancel = () => {
        reset();
    }

    const handleAdd = (payLoad) => {
        handleAddProject(payLoad);
        reset();
    }

    return (
        <div className="w-full lg:w-7/12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8 flex flex-col justify-center">
            <div className="max-w-xl mx-auto w-full">
                <div className="mb-8 text-center lg:text-left">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 mb-4">
                        <PlusCircle size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
                    <p className="text-gray-500 mt-2">Add a new project to your workspace to start tracking time and tasks.</p>
                </div>

                <form className="space-y-6"
                    onSubmit={handleSubmit(handleAdd)}
                >
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Project Name</label>
                        <input
                            type="text"
                            {...register("name", pNameValidation)}
                            placeholder="e.g. Q4 Marketing Campaign"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all"
                        />
                        {errors?.name && (
                            <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-gray-600"
                                    {...register("from", fromDateValidation)}
                                />
                                {errors?.from && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.from?.message}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    {...register("to", {
                                        ...toDateValidation,
                                        validate: (value) => new Date(value) >= new Date(getValues("from")) || "End date must be after start date"
                                    })}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all text-gray-600"
                                />
                                {errors?.to && (
                                    <p className="text-red-500 text-sm mt-1">{errors?.to?.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 transition-all"
                        >
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddProjectForm;
