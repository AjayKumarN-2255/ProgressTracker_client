import React from 'react';
import Select from 'react-select';

function ProjectSelector({ projects = [], selectedProjectId, applyProjectFilter }) {

    const options = [
        { value: null, label: "All" },
        ...projects.map(project => ({
            value: project._id,
            label: project.name
        }))
    ];

    const selectedOption = options.find(
        opt => opt.value === selectedProjectId
    ) || null;

    return (
        <div className="w-full max-w-xs">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Project
            </label>

            <Select
                options={options}
                value={selectedOption}
                onChange={(option) => applyProjectFilter(option ? option.value : null)}
                isClearable
                placeholder="All / Select Employee"
                classNamePrefix="react-select"
            />
        </div>
    );
}

export default ProjectSelector;
