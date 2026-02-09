import React from 'react';
import ReportItems from '../ReportItems';

function MilestonesTab() {

  const valueOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`
  }));

  return (
    <div className='md:min-h-[355px] flex flex-col gap-10'>
      <h1 className='text-center text-xl font-semibold'>Add Milestone</h1>
      <div className='flex flex-col gap-5'>
        <ReportItems type={"milestones"} fieldName={"milestones"} valueOptions={valueOptions} />
      </div>
    </div>
  )
}

export default MilestonesTab