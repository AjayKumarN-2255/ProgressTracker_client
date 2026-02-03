import React from 'react';
import ReportList from '../../report/components/ReportList';

function Dashboard() {
    return (
        <div>
            <ReportList currentUserId={""} userRole={"admin"} />
        </div>
    )
}

export default Dashboard