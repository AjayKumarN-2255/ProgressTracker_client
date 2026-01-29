import { useState } from 'react';
import toast from 'react-hot-toast';
import { addReview, deleteReview } from '../../../services/reviewService';

export default function useManageReview(reset) {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleDeleteReview = async (rId) => {
        try {
            setLoading(true);
            setError(null);
            console.log(rId)
            const res = await deleteReview(rId);
            if (res.success) {
                return rId;
            }
        } catch (err) {
            console.error("Failed to delete review:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to delete review";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    const handleAddReview = async (formData) => {
        const payLoad = {
            reviewer: formData.reviewer.value,
            project: formData.project.value,
            employees: formData.employees.map(emp => emp.value),
            reviewMonth: formData.reviewMonth,
            status: formData.status,
        };

        try {
            setLoading(true);
            setError(null);

            const res = await addReview(payLoad);
            if (res.success) {
                console.log(res.data);
                toast.success("Review added successfully!");
                reset({
                    reviewer: null,
                    project: null,
                    employees: [],
                    status: 'assigned',
                });
            }
        } catch (err) {
            console.error("Failed to add user:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to add review";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return {
        handleAddReview,
        handleDeleteReview,
        error,
        loading
    }
}