import axiosInstance from "../utils/axiosInstance";

export const analysisService = {
  submitCode: async (data) => {
    const response = await axiosInstance.post("/api/analysis/submit", data);
    return response.data;
  },

  getAnalysis: async (id) => {
    const response = await axiosInstance.get(`/api/analysis/${id}`);
    return response.data;
  },
};
