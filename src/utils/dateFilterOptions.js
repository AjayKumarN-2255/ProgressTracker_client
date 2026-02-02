export const DATE_FILTER_OPTIONS = {
    TYPE: [
        { value: 'CURRENT', label: 'Current Month' },
        { value: 'MONTH', label: 'Month' },
        { value: 'QUARTER', label: 'Quarter' },
        { value: 'HALF', label: 'Half Year' },
        { value: 'YEAR', label: 'Year' },
    ],

    CURRENT: [],

    MONTH: [
        { value: 0, label: 'January' },
        { value: 1, label: 'February' },
        { value: 2, label: 'March' },
        { value: 3, label: 'April' },
        { value: 4, label: 'May' },
        { value: 5, label: 'June' },
        { value: 6, label: 'July' },
        { value: 7, label: 'August' },
        { value: 8, label: 'September' },
        { value: 9, label: 'October' },
        { value: 10, label: 'November' },
        { value: 11, label: 'December' },
    ],

    QUARTER: [
        { value: 'Q1', label: 'Q1 (Jan – Mar)' },
        { value: 'Q2', label: 'Q2 (Apr – Jun)' },
        { value: 'Q3', label: 'Q3 (Jul – Sep)' },
        { value: 'Q4', label: 'Q4 (Oct – Dec)' },
    ],

    HALF: [
        { value: 'H1', label: 'First Half (Jan – Jun)' },
        { value: 'H2', label: 'Second Half (Jul – Dec)' },
    ],
};


export const validateFilter = ({ type, year, value }) => {

    if (!type) {
        return { success: false, message: "Filter type is required" };
    }

    if (type === "YEAR" && !year) {
        return { success: false, message: "Please select a year" };
    }

    if (type === "CURRENT" || (type === "YEAR" && year)) {
        return { success: true, message: "" };
    }

    if (year == null || year === '' || value == null || value === '') {
        return { success: false, message: "Please select both year and value for this filter" };
    }

    return { success: true, message: "" };
};

