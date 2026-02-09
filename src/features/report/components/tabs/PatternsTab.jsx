import React from 'react';
import ReportItems from '../ReportItems';

function PatternsTab() {

  const valueOptions = Array.from({ length: 5 }, (_, i) => ({
    value: -(i + 1),
    label: `${-(i + 1)}`
  }));

  return (
    <div className='md:min-h-[355px] flex flex-col gap-10'>
      <h1 className='text-center text-xl font-semibold'>Add Pattern To Address</h1>
      <div className='flex flex-col gap-5'>
        <ReportItems type={"patternsToAddress"} fieldName={"patternsToAddress"} valueOptions={valueOptions} />
      </div>
    </div>
  )
}

export default PatternsTab