import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useForm } from 'react-hook-form';

function AddReportForm() {

  const { id } = useParams();
  const { data: review } = useFetch('/review', {
    params: {
      rId: id
    }
  });

  const { register, reset, handleSubmit } = useForm({
    defaultValues: {
      reviewer: '',
      employee: '',
      project: '',
      reviewMonth: ''
    }
  });

  useEffect(() => {
    if (review?.length > 0) {
      const r = review[0];
      reset({
        reviewer: r.reviewer?.name || '',
        employee: r.employee?.name || '',
        project: r.project?.name || '',
        reviewMonth: r.reviewMonth?.slice(0, 7) || ''
      });
    }
  }, [review, reset]);

  const onSubmit = (data) => {
    console.log("Report submitted:", data);
    // Call your API here
  }

  return (
    <div className='border-2 border-gray-100 rounded-lg w-full max-w-xl p-6 bg-white'>
      <form className='flex flex-col gap-10' onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-center text-xl font-semibold'>Add Report</h1>

        <div className="flex gap-3 items-center w-full max-w-lg">
          <label className="text-gray-700 font-medium w-28 flex-shrink-0">Reviewer:</label>
          <input
            type="text"
            disabled
            {...register("reviewer")}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex gap-3 items-center w-full max-w-lg">
          <label className="text-gray-700 font-medium w-28 flex-shrink-0">Employee:</label>
          <input
            type="text"
            disabled
            {...register("employee")}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex gap-3 items-center w-full max-w-lg">
          <label className="text-gray-700 font-medium w-28 flex-shrink-0">Project:</label>
          <input
            type="text"
            disabled
            {...register("project")}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className="flex gap-3 items-center w-full max-w-lg">
          <label className="text-gray-700 font-medium w-28 flex-shrink-0">Review Month:</label>
          <input
            type="month"
            disabled
            {...register("reviewMonth")}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 w-full"
          />
        </div>

        <div className='flex justify-start'>
          <button
            type="submit"
            className="bg-blue-600 max-w-lg w-full text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-colors"
          >
            Add Report
          </button>
        </div>

      </form>
    </div>
  );
}

export default AddReportForm;
