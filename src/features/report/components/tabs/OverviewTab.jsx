import React from 'react';
import { useFormContext } from "react-hook-form";

function OverviewTab() {

  const { register } = useFormContext();

  return (
    <div className='flex flex-col gap-10 min-h-[300px]'>
      <h1 className='text-center text-xl font-semibold'>Overview</h1>

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
    </div>
  )
}

export default OverviewTab;
