import toast from "react-hot-toast";
import { addUser } from '../../../services/userService';
import { useState } from "react";

export default function useManageUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAddUser = async (payLoad) => {
        try {
            setLoading(true);
            setError(null);

            const res = await addUser(payLoad);
            if (res.success) {
                console.log(res.data);
                toast.success("User added successfully!");
            }
        } catch (err) {
            console.error("Failed to add user:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to add user";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleAddUser,
        loading,
        error,
    };
}
