import React from 'react';
import Select from 'react-select';
import { DATE_FILTER_OPTIONS } from '../../../../utils/dateFilterOptions';

function DateFilter({
    filterType,
    filterYear,
    filterValue,
    setFilterType,
    setFilterYear,
    setFilterValue,
    applyDateFilter,
    clearDateFilter
}) {

    // Generate year options (last 5 years)
    const yearOptions = Array.from({ length: 5 }).map((_, i) => {
        const y = new Date().getFullYear() - i;
        return { value: y, label: y.toString() };
    });

    // Value options depend on type
    const valueOptions = React.useMemo(() => {
        if (filterType === 'CURRENT') return DATE_FILTER_OPTIONS.CURRENT;
        if (filterType === 'MONTH') return DATE_FILTER_OPTIONS.MONTH;
        if (filterType === 'QUARTER') return DATE_FILTER_OPTIONS.QUARTER;
        if (filterType === 'HALF') return DATE_FILTER_OPTIONS.HALF;
        return [];
    }, [filterType]);

    // Helper to get selected option object for react-select
    const getSelectedOption = (options, value) => {
        return options.find(opt => opt.value == value) || null;
    };

    return (
        <div className="flex flex-col md:flex-row gap-3 w-full xl:max-w-3xl items-end">

            {/* --- Type Selector --- */}
            <div className="flex-1">
                <label className="block text-gray-700 font-medium mb-1">Filter Type</label>
                <Select
                    value={getSelectedOption(DATE_FILTER_OPTIONS.TYPE, filterType)}
                    onChange={(opt) => {
                        setFilterType(opt.value);
                        setFilterValue('');
                        setFilterYear('');
                    }}
                    options={DATE_FILTER_OPTIONS.TYPE}
                />
            </div>

            {/* --- Value Selector (Month / Quarter / Half) --- */}
            {valueOptions.length > 0 && filterType !== 'CURRENT' && (
                <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Value</label>
                    <Select
                        value={getSelectedOption(valueOptions, filterValue)}
                        onChange={(opt) => setFilterValue(opt.value)}
                        options={valueOptions}
                    />
                </div>
            )}

            {/* --- Year Selector --- */}
            {(filterType !== 'CURRENT') && (
                <div className="flex-1">
                    <label className="block text-gray-700 font-medium mb-1">Year</label>
                    <Select
                        value={getSelectedOption(yearOptions, filterYear)}
                        onChange={(opt) => setFilterYear(opt.value)}
                        options={yearOptions}
                    />
                </div>
            )}


            {/* --- Buttons --- */}
            <div className="flex gap-2">
                <button
                    onClick={applyDateFilter}
                    className="px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700"
                >
                    Apply
                </button>

                <button
                    onClick={clearDateFilter}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                >
                    Clear
                </button>
            </div>

        </div>
    );
}

export default DateFilter;
