import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import toast from 'react-hot-toast';
import { addReview } from '../../../services/reviewService';


export default function useManageReview(reset) {

    const { data: projects } = useFetch('/project');
    const { data: admins } = useFetch('/user', { params: { role: 'admin' } });
    const { data: employees } = useFetch('/user', { params: { role: 'employee' } });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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
        error,
        loading,
        admins,
        projects,
        employees
    }
}