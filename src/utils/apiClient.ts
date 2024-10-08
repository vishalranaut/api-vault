import axiosInstance from "./axiosInstance";

export const apiClient = {
  get: (url: string, params?: object) => axiosInstance.get(url, { params }),
  post: (url: string, data?: object) => axiosInstance.post(url, data),
  put: (url: string, data?: object) => axiosInstance.put(url, data),
  delete: (url: string) => axiosInstance.delete(url),
};
