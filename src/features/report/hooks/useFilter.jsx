import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { validateFilter } from "../../../utils/dateFilterOptions";


export default function useFilter() {

    const now = new Date();

    const [filterType, setFilterType] = useState('');
    const [filterYear, setFilterYear] = useState(now.getFullYear());
    const [filterValue, setFilterValue] = useState(now.getMonth());


    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!filterType) {
            navigate('/employee/dashboard?type=CURRENT')
        }
    }, [filterType, navigate])

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

    useEffect(() => {
        const selectedFilterType = getQueryParam("type", false);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setFilterType(selectedFilterType);
        const selectedfilterValue = getQueryParam("value", false);
        setFilterValue(selectedfilterValue);
        const selectedfilterYear = getQueryParam("year", false);
        setFilterYear(selectedfilterYear);
    }, [location])

    const applyDateFilter = () => {

        const seletedType = getQueryParam("type");
        if (seletedType == filterType && seletedType == "CURRENT") {
            toast.error("please change filter");
        }

        let payload = {};

        switch (filterType) {
            case "CURRENT":
                payload = {
                    type: "CURRENT",
                    year: new Date().getFullYear(),
                    value: new Date().getMonth(),
                };
                break;

            case "MONTH":
                payload = {
                    type: "MONTH",
                    year: filterYear,
                    value: filterValue,
                };
                break;

            case "QUARTER":
                payload = {
                    type: "QUARTER",
                    year: filterYear,
                    value: filterValue,
                };
                break;

            case "HALF":
                payload = {
                    type: "HALF",
                    year: filterYear,
                    value: filterValue,
                };
                break;

            case "YEAR":
                payload = {
                    type: "YEAR",
                    year: filterYear,
                    value: null,
                };
                break;

            default:
                toast.error("Invalid filter type");
                return;
        }

        const validation = validateFilter({ ...payload });
        if (!validation.success) {
            toast.error(validation.message);
            return;
        }

        const params = new URLSearchParams(location.search);

        Object.entries(payload).forEach(([key, val]) => {
            if (val === null || val === '') {
                params.delete(key);
            } else {
                params.set(key, val);
            }
        });
        navigate(`${location.pathname}?${params.toString()}`);
    }

    const clearDateFilter = () => {
        console.log("filter type", filterType)
    }

    return {
        filterType,
        filterYear,
        filterValue,
        setFilterType,
        setFilterYear,
        setFilterValue,
        applyDateFilter,
        clearDateFilter
    }
}