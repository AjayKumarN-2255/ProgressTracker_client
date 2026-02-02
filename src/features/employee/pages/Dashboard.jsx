import React from 'react';
import ReportList from '../../report/components/ReportList';
import { useSelector } from 'react-redux';

function Dashboard() {

    const { user } = useSelector(state => state.auth);

    return (
        <div>
            <ReportList userId={user?._id} />
        </div>
    )
}

export default Dashboard