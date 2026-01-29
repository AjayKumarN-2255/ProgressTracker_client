import React, { useState } from 'react';
import ReviewList from '../components/ReviewList';

function AssignedReviews() {
    const [filter, setFilter] = useState("assigned");
    
    return (
        <>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Reviews</h1>
                <p className="text-gray-500 text-sm mt-1">Switch between all reviews and your assigned reviews</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 sm:gap-4 mb-6 border-b border-gray-200">
                <button
                    onClick={() => setFilter('assigned')}
                    className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${filter === 'assigned'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    My Assigned Reviews
                </button>
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${filter === 'all'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    All Reviews
                </button>
            </div>

            {/* Review List */}
            <div className="flex flex-col gap-4">
                <ReviewList filter={filter} />
            </div>
        </>
    )
}

export default AssignedReviews