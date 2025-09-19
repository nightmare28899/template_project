import services from "@/service/core/apiService";
import {useNotificationService} from "@/service/NotificationService";

export const useChangePage = () => {
    const {showErrorMessage} = useNotificationService();

    return async ({currentPage, state, setState, limit = 10, paginationUrl}) => {
        try {
            const baseUrl = state.path;
            const url = `${baseUrl}${paginationUrl}?page=${currentPage}&per_page=${limit}`;

            const {data} = await services.get(url);
            const {current_page, last_page, path, total} = data.data;

            setState((prev) => ({
                ...prev,
                ...(current_page && {currentPage: current_page}),
                ...(last_page && {lastPage: last_page}),
                ...(total && {totalPage: total}),
                ...(path && {path}),
            }));

            setState((prev) => ({
                ...prev,
                data: data.data,
                originalData: data.data,
                currentPage,
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            showErrorMessage("Error inesperado. Intenta más tarde.");
        }
    };
};

