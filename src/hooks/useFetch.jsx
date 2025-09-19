import {useEffect, useState, useCallback, useRef} from "react";
import {useLocation} from "react-router-dom";
import api from "@/service/core/apiService";

export default function useFetch(url, options, publicPetiton = false) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const didFetchRef = useRef(false);
    const location = useLocation();

    const fetchData = useCallback(async (currentPage = null, pageSize = null) => {
        setIsLoading(true);
        setError(null);

        if (!localStorage.getItem("token") || location.pathname === "/home" && !publicPetiton) return;

        const controller = new AbortController();
        try {
            let urlAux = url;
            if (currentPage != null && pageSize != null) {
                urlAux = `${url}?page=${currentPage}&per_page=${pageSize}`;
            }
            const response = await api.get(urlAux, {
                ...options,
                signal: controller.signal,
            });
            setData(response.data);
        } catch (err) {
            if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
                setError(err || new Error("Unknown error occurred"));
            }
        } finally {
            setIsLoading(false);
        }
        return () => controller.abort();
    }, [publicPetiton, url, options]);

    useEffect(() => {
        if (didFetchRef.current) return;
        didFetchRef.current = true;
        fetchData().then();
    }, [fetchData]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
    };
}
