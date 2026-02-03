import React from 'react';
import Select from 'react-select';

function UserSelector({ users = [], selectedUserId, applyUserFilter }) {

    const options = users.map(user => ({
        value: user._id,
        label: user.name
    }));

    const selectedOption = options.find(
        opt => opt.value === selectedUserId
    ) || null;

    return (
        <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Employee
            </label>

            <Select
                options={options}
                value={selectedOption}
                onChange={(option) => applyUserFilter(option ? option.value : null)}
                isClearable
                placeholder="All / Select Employee"
                classNamePrefix="react-select"
            />
        </div>
    );
}

export default UserSelector;
