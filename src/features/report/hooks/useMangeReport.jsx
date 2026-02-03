import { useState, useEffect } from 'react';
import { addReport, getReports } from '../../../services/reportService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function useManageReport(options) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);

    const navigate = useNavigate();
    const autoFetch = options?.autoFetch ?? true;

    const getQueryParam = (paramName, isArray = true) => {
        const params = new URLSearchParams(location.search);
        const value = params.get(paramName);

        if (!value) return isArray ? [] : "";

        if (isArray) {
            return value.split(",").map((v) => v.trim()).filter(Boolean);
        } else {
            return value;
        }
    };

    const cleanArray = (array) => array?.filter(item => item.content?.trim() && item.value !== "") || [];
    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const fetchReports = async () => {
        try {
            setLoading(true);
            const QueryType = getQueryParam("type", false);
            const QueryValue = getQueryParam("value", false);
            const QueryYear = getQueryParam("year", false);
            const QueryUser = getQueryParam("userId", false);
            const QueryPid = getQueryParam("pId", false);
            const res = await getReports(QueryUser, QueryType, QueryValue, QueryYear, QueryPid);
            if (res?.success) {
                setData(res?.data);
            }
            await delay(400);
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch Reports");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (autoFetch) {
            fetchReports();
        }
    }, [autoFetch, location.pathname, location.search]);

    const handleAddReport = async (rId, payLoad) => {
        try {
            setLoading(true);
            setError(null);

            const res = await addReport(rId, payLoad);
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
        fetchReports,
        cleanArray,
        loading,
        error,
        data
    }
}