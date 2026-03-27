import {useEffect, useState, useCallback} from "react";
import api from "@/service/core/apiService";

export default function useFetch(url, options = {}, publicPetiton = false) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (currentPage = null, pageSize = null) => {
        setIsLoading(true);
        setError(null);

        if (!publicPetiton && !localStorage.getItem("token")) {
            setData(null);
            setIsLoading(false);
            return null;
        }

        try {
            let urlAux = url;
            if (currentPage != null && pageSize != null) {
                urlAux = `${url}?page=${currentPage}&per_page=${pageSize}`;
            }
            const response = await api.get(urlAux, {
                ...options,
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
                setError(err || new Error("Unknown error occurred"));
            }
        } finally {
            setIsLoading(false);
        }
        return null;
    }, [options, publicPetiton, url]);

    useEffect(() => {
        fetchData().then();
    }, [fetchData]);

    return {
        data,
        isLoading,
        error,
        refetch: fetchData,
    };
}
