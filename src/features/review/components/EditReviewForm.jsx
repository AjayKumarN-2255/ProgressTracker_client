import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import useFetch from '../../../hooks/useFetch';
import useManageReview from '../hooks/useManageReview';
import { useParams } from 'react-router-dom';

function EditReviewForm() {

    const { id } = useParams();
    const { control, register, reset, handleSubmit } = useForm(
        {
            defaultValues: {
                reviewer: null,
                employees: [],
                project: null,
                reviewMonth: new Date().toISOString().slice(0, 7)
            },
        }
    );

    const { data: reviews } = useFetch('/review', {
        params: {
            rId: id
        }
    });

    useEffect(() => {
        if (reviews?.length == 0) return;

        reset({
            reviewer: {
                value: reviews[0]?.reviewer?._id,
                label: reviews[0]?.reviewer?.name
            },
            employees: [{
                value: reviews[0]?.employee?._id,
                label: reviews[0]?.employee?.name
            }],
            project: {
                value: reviews[0]?.project?._id,
                label: reviews[0]?.project?.name
            },
            reviewMonth: reviews[0]?.reviewMonth?.slice(0, 7)
        });
    }, [reviews, reset]);


    const { data: projects } = useFetch('/project');
    const { data: admins } = useFetch('/user', { params: { role: 'admin' } });

    const { handleEditReview } = useManageReview();
    const handleFormSubmit = (formData) => {
        const payLoad = {
            reviewer: formData.reviewer.value,
            project: formData.project.value,
            employees: formData.employees.map(emp => emp.value),
            reviewMonth: formData.reviewMonth,
            status: formData.status,
        };
        handleEditReview(id, payLoad);
    }

    return (
        <div className='border-2 mx-auto border-gray-100  rounded-lg w-full max-w-xl p-6 bg-white'>
            <form className='flex flex-col gap-10'
                onSubmit={handleSubmit(handleFormSubmit)}>
                <h1 className='text-center text-xl font-semibold'>Edit Review</h1>
                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Reviewer:</label>
                    <Controller
                        name="reviewer"
                        control={control}
                        rules={{ required: "Reviewer is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div className='flex flex-col w-full'>
                                <Select
                                    {...field}
                                    options={admins?.map((admin) => ({ value: admin?._id, label: admin?.name }))}
                                    className="w-full"
                                    placeholder="Select a reviewer"
                                    onChange={(val) => field.onChange(val)}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Employees:</label>
                    <Controller
                        name="employees"
                        control={control}
                        rules={{ required: "Employees are required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div className='flex flex-col w-full'>
                                <Select
                                    {...field}
                                    isDisabled={true}
                                    className="w-full"
                                    placeholder="Select a employee"
                                />
                                {error && (
                                    <p className="text-red-500 text-sm">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="flex gap-3 md:items-center w-full max-w-lg flex-col md:flex-row">
                    <label className="text-gray-700 font-medium max-w-28 w-full">Project:</label>
                    <Controller
                        name="project"
                        control={control}
                        rules={{ required: "Project is required" }}
                        render={({ field, fieldState: { error } }) => (
                            <div className='flex flex-col w-full'>
                                <Select
                                    {...field}
                                    options={projects?.map((project) => ({ value: project?._id, label: project?.name }))}
                                    className="w-full"
                                    placeholder="Select a project"
                                    onChange={(val) => field.onChange(val)}
                                />
                                {error && (
                                    <p className="text-red-500 text-sm mt-1">{error.message}</p>
                                )}
                            </div>
                        )}
                    />
                </div>

                <div className="flex gap-3 items-center w-full max-w-lg">
                    <label className="text-gray-700 font-medium w-28 flex-shrink-0">
                        Review Month:
                    </label>
                    <input
                        type="month"
                        {...register("reviewMonth", {
                            required: "Review month is required",
                        })}
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full"
                    />
                </div>

                <div className='flex justify-start'>
                    <button
                        type="submit"
                        className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
                    >
                        Re-assign
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditReviewForm