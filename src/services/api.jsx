import Axios from "axios";

export const token = () => {
  return window.localStorage.getItem("token");
};

export const getConfig = (
  formData = false,
  progressFuncion = () => {},
  progressFuncionDown = () => {}
) => {
  let token = window.localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": formData ? "multipart/form-data" : "application/json",
    },
    onUploadProgress: (progressEvent) => {
      progressFuncion(progressEvent);
    },
    onDownloadProgress: (progressEvent) => {
      progressFuncionDown(progressEvent);
    },
  };
};

const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (error.response.data.error === "Token inválido") {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

const methodHandlers = {
  GET: (service, _, config) => axiosInstance.get(service, config),
  POST: (service, body, config) => axiosInstance.post(service, body, config),
  PUT: (service, body, config) => axiosInstance.put(service, body, config),
  DELETE: (service, _, config) => axiosInstance.delete(service, config),
};

export const services = ({
  method,
  service,
  body,
  formData = false,
  progressFuncion = () => {},
  progressFuncionDown = () => {},
}) => {
  const handler = methodHandlers[method.toUpperCase()];
  
  if (!handler) {
    return Promise.reject(new Error(`Método HTTP no soportado: ${method}`));
  }

  const requestConfig = getConfig(formData, progressFuncion, progressFuncionDown);
  
  return handler(service, body, requestConfig)
    .then((r) => response(r))
    .catch((err) => response(err.response || err));
};

const arrayResponses = [
  200, 201, 202, 400, 403, 404, 405, 406, 409, 422, 423, 500,
];

const response = (r) => {
  if (r === undefined) {
    return false;
  }

  if (arrayResponses.includes(r.status)) {
    return { status: r.status, data: r.data };
  }

  if (r.status === 500) {
    return { status: r.status };
  }

  return { status: r.status, errors: r };
};