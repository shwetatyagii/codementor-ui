import axiosInstance from "../utils/axiosInstance";

export const authService = {
  signup: async (data) => {
    const response = await axiosInstance.post("/api/auth/signup", data);
    return response.data;
  },

  login: async (data) => {
    const response = await axiosInstance.post("/api/auth/login", data);
    return response.data;
  },
};
