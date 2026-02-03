import React from 'react';
import ReportList from '../../report/components/ReportList';
import { useSelector } from 'react-redux';

function Dashboard() {

    const { user } = useSelector(state => state.auth);

    return (
        <div>
            <ReportList currentUserId={user?._id} userRole={"employee"} />
        </div>
    )
}

export default Dashboard