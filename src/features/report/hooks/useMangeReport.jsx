import { useState, useEffect } from 'react';
import { addReport, editReport, getReports, exportReport } from '../../../services/reportService';
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

    const cleanArray = (array) => array?.filter(item => item.noteId?.trim() && item.value !== "") || [];

    const normalizeNotes = (arr = []) =>
        arr.map(item => ({
            noteId: item.noteId?._id?.toString(),
            value: item.value
        }));

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

    const handleEditReport = async (rId, payLoad) => {
        try {
            setLoading(true);
            setError(null);

            const res = await editReport(rId, payLoad);
            if (res.success) {
                console.log(res.data);
                toast.success("Report Edited successfully!");
                navigate('/admin/dashboard');
            }
        } catch (err) {
            console.error("Failed to add report:", err);
            const message = err?.response?.data?.message || err?.message || "Failed to Edit report";
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    function generateFileName(headers) {
        const disposition = headers['content-disposition'];

        if (!disposition) return null;

        // Handles: attachment; filename="Report-Dec-2026.xlsx"
        const match = disposition.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);

        return match ? decodeURIComponent(match[1]) : null;
    }


    function downloadBlob(blob, fileName) {
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        a.remove();
        window.URL.revokeObjectURL(url);
    }

    const handleExportReport = async () => {
        try {
            const QueryType = getQueryParam("type", false);
            const QueryValue = getQueryParam("value", false);
            const QueryYear = getQueryParam("year", false);
            const QueryUser = getQueryParam("userId", false);
            const QueryPid = getQueryParam("pId", false);
            const { blob, header } = await exportReport(QueryUser, QueryType, QueryValue, QueryYear, QueryPid);
            const fileName = generateFileName(header) || "Report.xlsx";
            downloadBlob(blob, fileName);
        } catch (err) {
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to download Reports");
        }
    }

    return {
        handleExportReport,
        handleEditReport,
        handleAddReport,
        normalizeNotes,
        fetchReports,
        cleanArray,
        loading,
        error,
        data
    }
}