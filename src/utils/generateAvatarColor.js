export const getAvatarColor = (name = "") => {
    const colors = [
        "bg-blue-600",
        "bg-green-600",
        "bg-purple-600",
        "bg-pink-600",
        "bg-indigo-600",
    ];
    return colors[name.charCodeAt(0) % colors.length];
};

