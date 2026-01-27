
export const emailValidation = {
    required: "Email is required",
    pattern: {
        value: /^\S+@\S+\.\S+$/,
        message: "Invalid email address",
    },
};

export const passwordValidation = {
    required: "Password is required",
    minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
    }
};

export const pNameValidation = {
    required: "Project name is required",
    minLength: {
        value: 3,
        message: "Project name must be at least 3 characters",
    },
    maxLength: {
        value: 50,
        message: "Project name cannot exceed 50 characters",
    },
};


export const fromDateValidation = {
    required: "Start date is required"
};

export const toDateValidation = {
    required: "End date is required"
};
