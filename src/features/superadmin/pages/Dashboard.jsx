import React from 'react';
import ReportList from '../../report/components/ReportList';

function Dashboard() {
    return (
        <div className='flex w-full h-full overflow-y-scroll'>
            <ReportList currentUserId={""} userRole={"superadmin"} />
        </div>
    )
}

export default Dashboard