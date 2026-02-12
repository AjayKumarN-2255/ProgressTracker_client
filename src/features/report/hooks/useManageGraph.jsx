import { useState, useEffect } from "react";
import { getUserAnalytics } from '../../../services/analyticsService';
import toast from "react-hot-toast";

export default function useManageGraph(userId) {
    const currentYear = new Date().getFullYear();

    const [view, setView] = useState("monthly");
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [cuId, setcuId] = useState(userId);
    const [graphData, setgraphData] = useState(null);

    const years = Array.from({ length: 5 }, (_, i) => currentYear - i);


    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const res = await getUserAnalytics(
                    cuId,
                    view === "monthly" ? selectedMonth : undefined,
                    selectedYear
                );

                if (res.success) {
                    setgraphData(res.data);
                }
            } catch (err) {
                const message =
                    err?.response?.data?.message ||
                    err?.message ||
                    "Failed to fetch graph data";
                toast.error(message);
            }
        };
        if (!cuId) return;
        fetchGraphData();
    }, [cuId, view, selectedMonth, selectedYear]);

    return {
        view,
        setView,
        years,
        selectedMonth,
        setSelectedMonth,
        selectedYear,
        setSelectedYear,
        cuId,
        setcuId,
        graphData,        
    };
}
