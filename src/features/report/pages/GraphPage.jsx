import React from 'react';
import GraphContainer from '../components/graph/GraphContainer';
import { useSelector } from 'react-redux';

function GraphPage() {
    const { user } = useSelector(state => state.auth);

    const userId =
        user?.role === 'employee'
            ? user?._id
            : null;

    return (
        <div className="w-full h-full items-start flex justify-center">
            <GraphContainer userId={userId} />
        </div>
    );
}

export default GraphPage;
