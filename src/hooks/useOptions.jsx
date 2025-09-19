import { useEffect, useMemo } from "react";

export function useOptions(fetchResult, error, key, setState, mapper) {

    const sourceData = useMemo(() => {
        if (Array.isArray(fetchResult)) return fetchResult;
        if (fetchResult && Array.isArray(fetchResult.data)) return fetchResult.data;
        return [];
    }, [fetchResult]);

    const defaultMapper = (item) => ({
        value: item.id,
        label: item.nombre,
    });

    useEffect(() => {
        if (error) {
            console.error(`Error fetching ${key} data:`, error);
            return;
        }

        setState((prev) => ({
            ...prev,
            [key]: sourceData.map(mapper || defaultMapper),
        }));
    }, [error, key, mapper, setState, sourceData]);
}
