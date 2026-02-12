import React from 'react';

function MonthGraph({ graphData }) {
  return (
    <div className='w-full h-full'>
      this is graph data
      {JSON.stringify(graphData)}
    </div>
  )
}

export default MonthGraph