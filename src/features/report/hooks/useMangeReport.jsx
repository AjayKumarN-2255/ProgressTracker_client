import { useState } from 'react';
import { addReport } from '../../../services/reportService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useManageReport() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const cleanArray = (array) => array?.filter(item => item.content?.trim() && item.value !== "") || [];

    const handleAddReport = async (payLoad) => {
        try {
            setLoading(true);
            setError(null);

            const res = await addReport(payLoad);
            if (res.success) {
                console.log(res.data);
                toast.success("Report added successfully!");
                navigate('/admin/assigned-reviews');
            }
        } catch (err) {
            console.error("Failed to add report:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to add report";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
        
    }

    return {
        handleAddReport,
        cleanArray,
        loading,
        error
    }
}