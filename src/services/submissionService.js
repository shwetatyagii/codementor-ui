import axiosInstance from "../utils/axiosInstance";

export const submissionService = {
  getAll: async () => {
    const response = await axiosInstance.get("/api/submissions");
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/api/submissions/${id}`);
    return response.data;
  },

  deleteById: async (id) => {
    const response = await axiosInstance.delete(`/api/submissions/${id}`);
    return response.data;
  },

  search: async (keyword) => {
    const response = await axiosInstance.get(
      `/api/submissions/search?q=${keyword}`,
    );
    return response.data;
  },

  getDashboard: async () => {
    const response = await axiosInstance.get("/api/users/dashboard");
    return response.data;
  },

  getProfile: async () => {
    const response = await axiosInstance.get("/api/users/profile");
    return response.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put("/api/users/profile", data);
    return response.data;
  },
};
