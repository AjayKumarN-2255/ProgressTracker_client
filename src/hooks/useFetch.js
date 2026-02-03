import { useState, useEffect } from "react";
import api from "../services/api";

export default function useFetch(url, options = {}) {
    const { enabled = true, ...requestOptions } = options;

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!enabled || !url) return;

        let isMounted = true;

        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const res = await api.get(url, requestOptions);
                
                if (isMounted) {
                    setData(res.data?.data ?? []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(
                        err?.response?.data?.message ||
                        err?.message ||
                        "Something went wrong"
                    );
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [url, JSON.stringify(requestOptions), enabled]);

    return { data, loading, error, setData };
}
