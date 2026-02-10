import React from 'react'

function MonthGraph({ selectedMonth, selectedYear }) {
  return (
    <div className='w-full h-full'>
      selectedmonth-{selectedMonth}
      selectedYear-{selectedYear}
    </div>
  )
}

export default MonthGraph