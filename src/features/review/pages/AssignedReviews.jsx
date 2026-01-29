import React, { useState } from 'react';
import ReviewList from '../components/ReviewList';

function AssignedReviews() {
    const [filter, setFilter] = useState("assigned");

    const tabs = [
        { key: 'assigned', label: 'My Assigned Reviews' },
        { key: 'all', label: 'All Reviews' },
        { key: 'mySubmitted', label: 'My Submitted Reviews' },
        { key: 'allSubmitted', label: 'All Submitted Reviews' },
    ];

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Switch between assigned, submitted, and all reviews
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-4 mb-6 border-b border-gray-200">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setFilter(tab.key)}
                        className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${filter === tab.key
                                ? 'bg-indigo-600 text-white shadow'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Review List */}
            <div className="flex flex-col gap-4">
                <ReviewList filter={filter} />
            </div>
        </div>
    );
}

export default AssignedReviews;
