import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useForm, FormProvider } from 'react-hook-form';
import { tabs } from '../components/tabs/tabConfig';
import useManageReport from '../hooks/useMangeReport';

function AddReportForm() {

  const [activeTab, setActiveTab] = useState(0);
  const ActiveTabComponent = tabs[activeTab].component;

  const { handleAddReport, cleanArray } = useManageReport();

  const { id } = useParams();
  const { data: review } = useFetch('/review', {
    params: {
      rId: id
    }
  });

  const methods = useForm({
    defaultValues: {
      reviewer: '',
      employee: '',
      project: '',
      reviewMonth: '',
      milestones: [{ content: "", value: "" }],
      patternsToAddress: [{ content: "", value: "" }],
      memos: [{ content: "", value: "" }]
    }
  });

  useEffect(() => {
    if (review?.length > 0) {
      const r = review[0];
      methods.reset({
        reviewer: r.reviewer?.name || '',
        employee: r.employee?.name || '',
        project: r.project?.name || '',
        reviewMonth: r.reviewMonth?.slice(0, 7) || '',
        milestones: [{ content: "", value: "" }],
        patternsToAddress: [{ content: "", value: "" }],
        memos: [{ content: "", value: "" }]
      });
    }
  }, [review, methods.reset]);

  const handleNextClick = () => {
    setActiveTab(prev => prev + 1);
  }

  const handlePrevClick = () => {
    setActiveTab(prev => prev - 1);
  }

  const onSubmit = (formData) => {
    const payLoad = {}
    payLoad.employeeId = review[0]?.employee?._id;
    payLoad.reviewerId = review[0]?.reviewer?._id;
    payLoad.projectId = review[0]?.project?._id;
    payLoad.reviewMonth = formData?.reviewMonth
    payLoad.milestones = cleanArray(formData.milestones);
    payLoad.patternsToAddress = cleanArray(formData.patternsToAddress);
    payLoad.memos = cleanArray(formData.memos);
    handleAddReport(payLoad);
  }

  return (
    <div className='border-2 border-gray-100 rounded-lg w-full max-w-xl p-6 bg-white'>
      <FormProvider {...methods}>

        <form onSubmit={methods.handleSubmit(onSubmit)}>

          <ActiveTabComponent />
          <div className="flex justify-between items-center gap-3 py-2 mt-10">

            <div className="flex gap-2">
              {activeTab > 0 && (
                <button
                  type='button'
                  onClick={handlePrevClick}
                  className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 active:scale-95 transition-transform text-sm font-medium"
                >
                  Prev
                </button>
              )}

              {activeTab >= 0 && activeTab < tabs.length - 1 && (
                <button
                  type='button'
                  onClick={handleNextClick}
                  className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-300 active:scale-95 transition-transform text-sm font-medium"
                >
                  Next
                </button>
              )}
            </div>

            {activeTab === tabs.length - 1 && (
              <button
                type='submit'
                className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 active:scale-95 transition-transform text-sm font-medium"
              >
                Add Report
              </button>
            )}
          </div>

        </form>
      </FormProvider>
    </div>
  );
}

export default AddReportForm;
