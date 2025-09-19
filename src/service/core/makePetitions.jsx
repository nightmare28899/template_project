import api from "@/service/core/apiService";

const get = async (
    endpoint,
    params,
    options,
) => {
    const response = await api.get(endpoint, {params, headers: options?.headers, signal: options?.signal, });
    return response.data;
}

const post = async (endpoint, body, options) => {
    const response = await api.post(endpoint, body, {headers: options?.headers});
    return response.data;
}

const put = async (endpoint, body, options) => {
    const response = await api.put(endpoint, body, {headers: options?.headers});
    return response.data;
};


const del = async (endpoint, body, options) => {
    const response = await api.delete(endpoint, {data: body, headers: options?.headers});
    return response.data;
}

export const makePetitions = {
    get,
    post,
    put,
    del,
};

